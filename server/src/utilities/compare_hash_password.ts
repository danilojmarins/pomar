import bcrypt from 'bcryptjs';

export default function compareHashPassword(password: string, hash_password: string): boolean {
    return bcrypt.compareSync(password, hash_password);
}