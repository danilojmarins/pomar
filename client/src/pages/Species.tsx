import { useEffect, useState } from "react";
import SpeciesCard from "../components/Cards/species";
import { Species } from "../types/species";
import { api } from "../services/api";
import { CardsContainer, PageTitle } from "./styles";
import SpeciesForm from "../components/Forms/species";
import { AxiosResponse } from "axios";

const SpeciesPage = () => {

    const [deleted, setDeleted] = useState<string>('');
    const [saved, setSaved] = useState<AxiosResponse>();
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
    }, [deleted, saved]);

    const getDeleted = (deleted: string) => {
        setDeleted(deleted);
    }

    const getToEdit = (toEdit: Species) => {
        setToEdit(toEdit);
    }

    const getSaved = (saved: AxiosResponse) => {
        setSaved(saved);
    }

    return (
        <>
            <PageTitle>
                <h2>Espécies</h2>
                <h3>Total: {species.length}</h3>
            </PageTitle>

            <SpeciesForm
                toEdit={toEdit}
                getSaved={getSaved}
            />

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