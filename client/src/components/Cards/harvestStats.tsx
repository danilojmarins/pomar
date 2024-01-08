import { filteredHarvest } from "../../types/filteredHarvest";
import { CardContainer, CardContent, CardHeader } from "./styles";
import { GiFarmer } from "react-icons/gi";

interface HarvestCardProps {
    filteredHarvest: filteredHarvest;
}

const HarvestStatsCard = (props: HarvestCardProps) => {

    const {
        filteredHarvest
    } = props;

    const {
        id,
        information,
        date,
        weight,
        tree_description,
        tree_age,
        species_description,
        group_name,
    } = filteredHarvest;

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
                <p>{tree_description}</p>
            </CardContent>

            <CardContent>
                <p>Idade:</p>
                <p>{tree_age}</p>
            </CardContent>

            <CardContent>
                <p>Grupo:</p>
                <p>{group_name}</p>
            </CardContent>

            <CardContent>
                <p>Espécie:</p>
                <p>{species_description}</p>
            </CardContent>

        </CardContainer>
    )
}

export default HarvestStatsCard;