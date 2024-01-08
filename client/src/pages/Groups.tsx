import { useEffect, useState } from "react";
import GroupCard from "../components/Cards/groups";
import { Group } from "../types/group";
import { api } from "../services/api";
import { CardsContainer, PageTitle } from "./styles";
import GroupForm from "../components/Forms/groups";
import { AxiosResponse } from "axios";

const GroupPage = () => {

    const [deleted, setDeleted] = useState<string>('');
    const [saved, setSaved] = useState<AxiosResponse>();
    const [toEdit, setToEdit] = useState<Group | undefined>(undefined);
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        api.get('/groups/get/getGroups')
        .then((response) => {
            console.log(response)
            setGroups(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [deleted, saved]);

    const getDeleted = (deleted: string) => {
        setDeleted(deleted);
    }

    const getToEdit = (toEdit: Group) => {
        setToEdit(toEdit);
    }

    const getSaved = (saved: AxiosResponse) => {
        setSaved(saved);
    }

    return (
        <>
            <PageTitle>
                <h2>Grupos</h2>
                <h3>Total: {groups.length}</h3>
            </PageTitle>

            <GroupForm
                getSaved={getSaved}
                toEdit={toEdit}
            />

            <CardsContainer>
                {groups && groups[0] && groups.map((group) => {
                    return (
                        <GroupCard
                            getDeleted={getDeleted}
                            getToEdit={getToEdit}
                            group={group}
                        />
                    )
                })}
            </CardsContainer>
        </>
    )
}

export default GroupPage;