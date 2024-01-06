import Tree from "../entities/tree";

export default interface TreeGateway {
    create(tree: Tree): Promise<void>;
    findMany(): Promise<Tree[] | undefined>;
    update(tree: Tree): Promise<void>;
    findById(id: string): Promise<Tree | undefined>;
    delete(id: string): Promise<void>;
}