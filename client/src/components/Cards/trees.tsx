import { Tree } from "../../types/tree";
import { CardContainer, CardContent, CardHeader, CardOptions } from "./styles";
import { PiTreeDuotone } from "react-icons/pi";
import { api } from "../../services/api";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

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

    const { setShow, setType, setMessage } = useContext(ModalContext);

    const deleteTree = async (id: string) => {
        if (window.confirm('Colheitas talvez sejam excluídas.\nDeseja prosseguir?')) {
            api.delete('/trees/delete/deleteTree', {
                params: {
                    id: id
                }
            })
            .then(() => {
                getDeleted(id);
                setShow(true);
                setType('success');
                setMessage('Árvore excluída.');
            })
            .catch((err) => {
                console.error(err);
                setShow(true);
                setType('error');
                setMessage(err.response.data);
            });
        }
    }

    const formatAge = (age: number) => {
        const years = Math.floor(age / 12);
        const months = age % 12;
        if (years > 0 && months > 0) {  // mês e ano
            return (
                `${years === 1 ? years + ' ano e ' : years + ' anos e '}` // singular e plural
                +
                `${months === 1 ? months + ' mês' : months + ' meses'}`   // singular e plural
            );
        }
        if (years > 0) {    // apenas ano
            return `${years === 1 ? years + ' ano' : years + ' anos'}`;
        }
        if (months > 0) {   // apenas mês
            return `${months === 1 ? months + ' mês' : months + ' meses'}`;
        }
        return '0'; 
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
                <p>{formatAge(age)}</p>
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