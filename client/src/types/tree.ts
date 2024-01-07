import { Species } from "./species";

export interface Tree {
    id: string;
    description: string;
    age: number;
    species: Species;
}