import { useEffect, useState } from "react";
import SpeciesCard from "../components/Cards/species";
import { Species } from "../types/species";
import { api } from "../services/api";
import { CardsContainer, PageTitle } from "./styles";

const SpeciesPage = () => {

    const [deleted, setDeleted] = useState<string>('');
    const [toEdit, setToEdit] = useState<Species | undefined>(undefined);
    const [species, setSpecies] = useState<Species[]>([]);

    useEffect(() => {
        api.get('/species/get/getSpecies')
        .then((response) => {
            console.log(response)
            setSpecies(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [deleted]);

    const getDeleted = (deleted: string) => {
        setDeleted(deleted);
    }

    const getToEdit = (toEdit: Species) => {
        setToEdit(toEdit);
    }

    return (
        <>
            <PageTitle>
                <h2>Espécies</h2>
                <h3>Total: {species.length}</h3>
            </PageTitle>
            <CardsContainer>
                {species && species[0] && species.map((specie) => {
                    return (
                        <SpeciesCard
                            getDeleted={getDeleted}
                            getToEdit={getToEdit}
                            species={specie}
                        />
                    )
                })}
            </CardsContainer>
        </>
    )
}

export default SpeciesPage;