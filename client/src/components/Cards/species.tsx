import { useState } from "react";
import { Species } from "../../types/species";
import { CardContainer, CardContent, CardHeader, CardOptions } from "./styles";
import { PiPlant } from "react-icons/pi";
import { api } from "../../services/api";

interface SpeciesCardProps {
    getDeleted: (deleted: string) => void;
    getToEdit: (toEdit: Species) => void;
    species: Species;
}

const SpeciesCard = (props: SpeciesCardProps) => {

    const {
        getDeleted,
        getToEdit,
        species
    } = props;

    const {
        id,
        description
    } = species;

    const [deleted, setDeleted] = useState<string>('');

    const deleteSpecies = async (id: string) => {
        api.delete('/species/delete/deleteSpecies', {
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
                <p>Espécie <PiPlant /></p>
                <p>#{id.slice(0, 8)}</p>
            </CardHeader>
            <CardContent>
                <p>Descrição:</p>
                <p>{description}</p>
            </CardContent>
            <CardOptions>
                <p className="edit" onClick={() => getToEdit(species)}>Editar</p>
                <p className="delete" onClick={() => deleteSpecies(id)}>Excluir</p>
            </CardOptions>
        </CardContainer>
    )
}

export default SpeciesCard;