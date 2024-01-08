import { useEffect, useState } from "react";
import HarvestCard from "../components/Cards/harvests";
import { Harvest } from "../types/harvest";
import { api } from "../services/api";
import { CardsContainer, PageTitle } from "./styles";
import HarvestForm from "../components/Forms/harvests";
import { AxiosResponse } from "axios";

const HarvestPage = () => {

    const [deleted, setDeleted] = useState<string>('');
    const [saved, setSaved] = useState<AxiosResponse>();
    const [toEdit, setToEdit] = useState<Harvest | undefined>(undefined);
    const [harvests, setHarvests] = useState<Harvest[]>([]);

    useEffect(() => {
        api.get('/harvests/get/getHarvests')
        .then((response) => {
            console.log(response.data)
            setHarvests(response.data);
        })
        .catch((err) => {
            console.error(err.response.data);
        });
    }, [deleted, saved]);

    const getDeleted = (deleted: string) => {
        setDeleted(deleted);
    }

    const getToEdit = (toEdit: Harvest) => {
        setToEdit(toEdit);
    }

    const getSaved = (saved: AxiosResponse) => {
        setSaved(saved);
    }

    return (
        <>
            <PageTitle>
                <h2>Colheitas</h2>
                <h3>Total: {harvests.length}</h3>
            </PageTitle>

            <HarvestForm
                getSaved={getSaved}
                toEdit={toEdit}
            />

            <CardsContainer>
                {harvests && harvests[0] && harvests.map((harvest) => {
                    return (
                        <HarvestCard
                            getDeleted={getDeleted}
                            getToEdit={getToEdit}
                            harvest={harvest}
                        />
                    )
                })}
            </CardsContainer>
        </>
    )
}

export default HarvestPage;