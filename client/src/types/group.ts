import { Tree } from "./tree";

export interface Group {
    id: string;
    name: string;
    description: string;
    trees: Tree[];
}