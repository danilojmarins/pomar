import Weight from "./weight";

describe('weight unit tests', () => {
    
    it('should fail when weight <= 0', () => {
        expect(() => {
            new Weight(0);
        }).toThrow('weight must be greater than 0');
    });

    it('should have a valid weight', () => {
        const weight = new Weight(10.5);
        expect(weight.weight).toBe(10.5);
    });

});