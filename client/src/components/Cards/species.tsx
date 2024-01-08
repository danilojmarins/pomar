import { Species } from "../../types/species";
import { CardContainer, CardContent, CardHeader, CardOptions } from "./styles";
import { PiPlant } from "react-icons/pi";
import { api } from "../../services/api";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

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

    const { setShow, setType, setMessage } = useContext(ModalContext);

    const deleteSpecies = async (id: string) => {
        if (window.confirm('Árvores, grupos e colheitas talvez sejam excluídos.\nDeseja prosseguir?')) {
            api.delete('/species/delete/deleteSpecies', {
                params: {
                    id: id
                }
            })
            .then(() => {
                getDeleted(id);
                setShow(true);
                setType('success');
                setMessage('Espécie excluída.');
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