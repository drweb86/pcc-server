import { Message } from '../models/message';
import { MemoryDbContext } from './memory-db-context';

export class MessageService {
    static enqueue(message: Message): void {
        console.log(message);
        MemoryDbContext.messages.push(message);
    }

    static dequeue(token: string): Message[] {

        const messages = MemoryDbContext.messages.filter(message => message.toToken === token);
        MemoryDbContext.messages = MemoryDbContext.messages.filter(message => message.toToken !== token);
        return messages;
    }
}