import { Group } from "../../types/group";
import { CardContainer, CardContent, CardHeader, CardOptions } from "./styles";
import { TbTrees } from "react-icons/tb";
import { api } from "../../services/api";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

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

    const { setShow, setType, setMessage } = useContext(ModalContext);

    const deleteGroup = async (id: string) => {
        if (window.confirm('Deseja excluir o grupo?')) {
            api.delete('/groups/delete/deleteGroup', {
                params: {
                    id: id
                }
            })
            .then(() => {
                getDeleted(id);
                setShow(true);
                setType('success');
                setMessage('Grupo excluído.');
            })
            .catch((err) => {
                console.error(err);
                setShow(true);
                setType('error');
                setMessage(err.response.data);
            });
        }
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