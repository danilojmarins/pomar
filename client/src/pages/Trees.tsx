import { useEffect, useState } from "react";
import TreeCard from "../components/Cards/trees";
import { Tree } from "../types/tree";
import { api } from "../services/api";
import { CardsContainer, PageTitle } from "./styles";

const TreePage = () => {

    const [deleted, setDeleted] = useState<string>('');
    const [toEdit, setToEdit] = useState<Tree | undefined>(undefined);
    const [trees, setTrees] = useState<Tree[]>([]);

    useEffect(() => {
        api.get('/trees/get/getTrees')
        .then((response) => {
            console.log(response)
            setTrees(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [deleted]);

    const getDeleted = (deleted: string) => {
        setDeleted(deleted);
    }

    const getToEdit = (toEdit: Tree) => {
        setToEdit(toEdit);
    }

    return (
        <>
            <PageTitle>
                <h2>Árvores</h2>
                <h3>Total: {trees.length}</h3>
            </PageTitle>
            <CardsContainer>
                {trees && trees[0] && trees.map((tree) => {
                    return (
                        <TreeCard
                            getDeleted={getDeleted}
                            getToEdit={getToEdit}
                            tree={tree}
                        />
                    )
                })}
            </CardsContainer>
        </>
    )
}

export default TreePage;