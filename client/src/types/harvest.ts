import { Tree } from "./tree";

export interface Harvest {
    id: string;
    information: string;
    date: string;
    weight: number;
    tree: Tree;
}