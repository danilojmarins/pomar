import { useState } from "react";
import { Harvest } from "../../types/harvest";
import { CardContainer, CardContent, CardHeader, CardOptions } from "./styles";
import { GiFarmer } from "react-icons/gi";
import { api } from "../../services/api";

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

    const [deleted, setDeleted] = useState<string>('');

    const deleteHarvest = async (id: string) => {
        api.delete('/harvests/delete/deleteHarvest', {
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
                <p>Árvore <GiFarmer /></p>
                <p>#{id.slice(0, 8)}</p>
            </CardHeader>

            <CardContent>
                <p>Informações:</p>
                <p>{information}</p>
            </CardContent>

            <CardContent>
                <p>Data:</p>
                <p>{date}</p>
            </CardContent>

            <CardContent>
                <p>Peso Bruto:</p>
                <p>{weight}</p>
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