import { useState } from "react";
import { Tree } from "../../types/tree";
import { CardContainer, CardContent, CardHeader, CardOptions } from "./styles";
import { PiTreeDuotone } from "react-icons/pi";
import { api } from "../../services/api";

interface TreeCardProps {
    getDeleted: (deleted: string) => void;
    getToEdit: (toEdit: Tree) => void;
    tree: Tree;
}

const TreeCard = (props: TreeCardProps) => {

    const {
        getDeleted,
        getToEdit,
        tree
    } = props;

    const {
        id,
        description,
        age,
        species
    } = tree;

    const [deleted, setDeleted] = useState<string>('');

    const deleteTree = async (id: string) => {
        api.delete('/trees/delete/deleteTree', {
            params: {
                id: id
            }
        })
        .then(() => {
            setDeleted(id);
            getDeleted(deleted);
        })
        .catch((err) => {
            console.error(err);
        });
    }

    return (
        <CardContainer>
            <CardHeader>
                <p>Árvore <PiTreeDuotone /></p>
                <p>#{id.slice(0, 8)}</p>
            </CardHeader>
            <CardContent>
                <p>Descrição:</p>
                <p>{description}</p>
            </CardContent>
            <CardContent>
                <p>Idade:</p>
                <p>{age}</p>
            </CardContent>
            <CardContent>
                <p>Espécie:</p>
                <p>{species.description}</p>
            </CardContent>
            <CardOptions>
                <p className="edit" onClick={() => getToEdit(tree)}>Editar</p>
                <p className="delete" onClick={() => deleteTree(id)}>Excluir</p>
            </CardOptions>
        </CardContainer>
    )
}

export default TreeCard;