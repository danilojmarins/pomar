import generateId from "../../utilities/id_generator";
import Id from "./id";

describe('id unit tests', () => {
    
    it('should fail when id is invalid', () => {
        expect(() => {
            new Id('invalid_uuid');
        }).toThrow('invalid uuid');
    });

    it('should have a valid id', () => {
        const valid_uuid = generateId();
        const id = new Id(valid_uuid);
        expect(id.id).toBe(valid_uuid);
    });

});