import { useEffect, useState } from "react";
import TreeCard from "../components/Cards/trees";
import { Tree } from "../types/tree";
import { api } from "../services/api";
import { CardsContainer, PageTitle } from "./styles";
import TreeForm from "../components/Forms/trees";
import { AxiosResponse } from "axios";

const TreePage = () => {

    const [deleted, setDeleted] = useState<string>('');
    const [saved, setSaved] = useState<AxiosResponse>();
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
    }, [deleted, saved]);

    const getDeleted = (deleted: string) => {
        setDeleted(deleted);
    }

    const getToEdit = (toEdit: Tree) => {
        setToEdit(toEdit);
    }

    const getSaved = (saved: AxiosResponse) => {
        setSaved(saved);
    }

    return (
        <>
            <PageTitle>
                <h2>Árvores</h2>
                <h3>Total: {trees.length}</h3>
            </PageTitle>

            <TreeForm
                getSaved={getSaved}
                toEdit={toEdit}
            />

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