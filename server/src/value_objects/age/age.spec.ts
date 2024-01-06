import Age from "./age";

describe('age unit tests', () => {
    
    it('should fail when age <= 0', () => {
        expect(() => {
            new Age(-3);
        }).toThrow('age must be greater than 0');
    });

    it('should fail when age > 1200', () => {
        expect(() => {
            new Age(1201);
        }).toThrow('age must be less than 1200');
    });

    it('should fail when age is not an integer', () => {
        expect(() => {
            new Age(1.5);
        }).toThrow('age must be an integer');
    });

    it('should have a valid age', () => {
        const age = new Age(12);
        expect(age.age).toBe(12);
    });

});