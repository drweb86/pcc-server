import { MemoryDbContext } from './memory-db-context';
import { RegisteredHost } from '../models/regisrered-host';
var generator = require('generate-password');

export class TokenService {
    static generate(): RegisteredHost {
        const id = MemoryDbContext.hosts.length + 1;
        const password = generator.generate({
            length: 5,
            numbers: true
        });
        const newRegisteredHost: RegisteredHost = {
            token: TokenService.getToken(id, password), // to be done.
            id: `${id}`,
            password,
        }
        MemoryDbContext.hosts.push(newRegisteredHost);
        return newRegisteredHost;
    }

    static getToken(id: number, password: string): string {
        return `${id}-${password}`;
    }
}