import Description from "./description";

describe('description unit tests', () => {
    
    it('should fail when description length < 3', () => {
        expect(() => {
            new Description('aa');
        }).toThrow('description must have at least 3 characters');
    });

    it('should fail when description length > 255', () => {
        expect(() => {
            new Description(`
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            `);
        }).toThrow('description must have at most 255 characters');
    });

    it('should have a valid description', () => {
        const description = new Description('Valid Description');
        expect(description.description).toBe('Valid Description');
    });

});