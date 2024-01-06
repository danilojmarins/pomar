import Name from "./name";

describe('name unit tests', () => {
    
    it('should fail when name length < 3', () => {
        expect(() => {
            new Name('aa');
        }).toThrow('name must have at least 3 characters');
    });

    it('should fail when name length > 64', () => {
        expect(() => {
            new Name(`
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            `);
        }).toThrow('name must have at most 64 characters');
    });

    it('should have a valid name', () => {
        const name = new Name('Valid Name');
        expect(name.name).toBe('Valid Name');
    });

});