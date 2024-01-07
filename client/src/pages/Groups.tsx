import { useEffect, useState } from "react";
import GroupCard from "../components/Cards/groups";
import { Group } from "../types/group";
import { api } from "../services/api";
import { CardsContainer, PageTitle } from "./styles";

const GroupPage = () => {

    const [deleted, setDeleted] = useState<string>('');
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
    }, [deleted]);

    const getDeleted = (deleted: string) => {
        setDeleted(deleted);
    }

    const getToEdit = (toEdit: Group) => {
        setToEdit(toEdit);
    }

    return (
        <>
            <PageTitle>
                <h2>Grupos</h2>
                <h3>Total: {groups.length}</h3>
            </PageTitle>
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