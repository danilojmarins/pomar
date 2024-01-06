import { randomUUID } from 'crypto'

export default function generateId(): string {
    return randomUUID();
}