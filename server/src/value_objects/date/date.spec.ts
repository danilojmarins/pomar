import ValidStringDate from "./date";

describe('date unit tests', () => {
    
    it('should fail when date string is invalid', () => {
        expect(() => {
            new ValidStringDate('2024-13-31');
        }).toThrow('date string invalid format');
    });

    it('should have a valid weight', () => {
        const date = new ValidStringDate('2024-01-05');
        expect(date.date).toBe('2024-01-05');
    });

});