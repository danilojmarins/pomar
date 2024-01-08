import { Harvest } from "../../types/harvest";
import { CardContainer, CardContent, CardHeader, CardOptions } from "./styles";
import { GiFarmer } from "react-icons/gi";
import { api } from "../../services/api";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

interface HarvestCardProps {
    getDeleted: (deleted: string) => void;
    getToEdit: (toEdit: Harvest) => void;
    harvest: Harvest;
}

const HarvestCard = (props: HarvestCardProps) => {

    const {
        getDeleted,
        getToEdit,
        harvest
    } = props;

    const {
        id,
        information,
        date,
        weight,
        tree
    } = harvest;

    const { setShow, setType, setMessage } = useContext(ModalContext);

    const deleteHarvest = async (id: string) => {
        if (window.confirm('Deseja excluir a colheita?')) {
            api.delete('/harvests/delete/deleteHarvest', {
                params: {
                    id: id
                }
            })
            .then(() => {
                getDeleted(id);
                setShow(true);
                setType('success');
                setMessage('Colheita excluída.');
            })
            .catch((err) => {
                console.error(err);
                setShow(true);
                setType('error');
                setMessage(err.response.data);
            });
        }
    }

    const formatDate = (date: string) => {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);
        return day + '/' + month + '/' + year;
    }

    return (
        <CardContainer>
            <CardHeader>
                <p>Colheita <GiFarmer /></p>
                <p>#{id.slice(0, 8)}</p>
            </CardHeader>

            <CardContent>
                <p>Informações:</p>
                <p>{information}</p>
            </CardContent>

            <CardContent>
                <p>Data:</p>
                <p>{formatDate(date)}</p>
            </CardContent>

            <CardContent>
                <p>Peso Bruto:</p>
                <p>{weight.toString().replace('.', ',')} KG</p>
            </CardContent>

            <CardContent>
                <p>Árvore:</p>
                <p>{tree.description}</p>
            </CardContent>

            <CardOptions>
                <p className="edit" onClick={() => getToEdit(harvest)}>Editar</p>
                <p className="delete" onClick={() => deleteHarvest(id)}>Excluir</p>
            </CardOptions>
        </CardContainer>
    )
}

export default HarvestCard;