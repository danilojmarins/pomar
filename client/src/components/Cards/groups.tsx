import { useState } from "react";
import { Group } from "../../types/group";
import { CardContainer, CardContent, CardHeader, CardOptions } from "./styles";
import { TbTrees } from "react-icons/tb";
import { api } from "../../services/api";

interface GroupCardProps {
    getDeleted: (deleted: string) => void;
    getToEdit: (toEdit: Group) => void;
    group: Group;
}

const GroupCard = (props: GroupCardProps) => {

    const {
        getDeleted,
        getToEdit,
        group
    } = props;

    const {
        id,
        name,
        description,
        trees
    } = group;

    const [deleted, setDeleted] = useState<string>('');

    const deleteGroup = async (id: string) => {
        api.delete('/groups/delete/deleteGroup', {
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
                <p>Grupo <TbTrees /></p>
                <p>#{id.slice(0, 8)}</p>
            </CardHeader>

            <CardContent>
                <p>Nome:</p>
                <p>{name}</p>
            </CardContent>

            <CardContent>
                <p>Descrição:</p>
                <p>{description}</p>
            </CardContent>

            <CardContent>
                <p>Árvores:</p>
                <p>{trees.length}</p>
            </CardContent>

            <CardOptions>
                <p className="edit" onClick={() => getToEdit(group)}>Editar</p>
                <p className="delete" onClick={() => deleteGroup(id)}>Excluir</p>
            </CardOptions>
        </CardContainer>
    )
}

export default GroupCard;