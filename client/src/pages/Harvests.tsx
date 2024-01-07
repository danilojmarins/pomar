import { useContext, useEffect, useState } from "react";
import HarvestCard from "../components/Cards/harvests";
import { Harvest } from "../types/harvest";
import { api } from "../services/api";
import { CardsContainer, PageTitle } from "./styles";
import { ModalContext } from "../contexts/ModalContext";

const HarvestPage = () => {

    const [deleted, setDeleted] = useState<string>('');
    const [toEdit, setToEdit] = useState<Harvest | undefined>(undefined);
    const [harvests, setHarvests] = useState<Harvest[]>([]);

    const { setShow, setType, setMessage } = useContext(ModalContext);

    useEffect(() => {
        api.get('/harvests/get/getHarvests')
        .then((response) => {
            console.log(response.data)
            setHarvests(response.data);
        })
        .catch((err) => {
            console.error(err.response.data);
        });
    }, [deleted, setShow, setType, setMessage]);

    const getDeleted = (deleted: string) => {
        setDeleted(deleted);
    }

    const getToEdit = (toEdit: Harvest) => {
        setToEdit(toEdit);
    }

    return (
        <>
            <PageTitle>
                <h2>Colheitas</h2>
                <h3>Total: {harvests.length}</h3>
            </PageTitle>
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