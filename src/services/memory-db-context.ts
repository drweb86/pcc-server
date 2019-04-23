import { RegisteredHost } from "../models/regisrered-host";
import { Message } from "../models/message";

export class MemoryDbContext { // because hosting without db costs less. 
    static hosts: RegisteredHost[] = [];
    static messages: Message[] = [];
}