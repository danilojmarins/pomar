import Email from "./email";

describe('email unit tests', () => {
    
    it('should fail when email is invalid', () => {
        expect(() => {
            new Email('invalid_email');
        }).toThrow('invalid email address');
    });

    it('should have a valid email', () => {
        const email = new Email('valid.email@gmail.com');
        expect(email.email).toBe('valid.email@gmail.com');
    });

});