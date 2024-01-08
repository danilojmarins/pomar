import { useEffect, useState } from "react";
import { SelectOneInput, Submit } from "../Inputs/styles";
import { FormContainer, FormInputs, FormOptions } from "./styles";
import { api } from "../../services/api";
import { Tree } from "../../types/tree";
import { Group } from "../../types/group";
import { Species } from "../../types/species";
import { useNavigate } from "react-router-dom";

const FilterHarvestForm = () => {

    const [treeId, setTreeId] = useState<string>('');
    const [groupId, setGroupId] = useState<string>('');
    const [speciesId, setSpeciesId] = useState<string>('');

    const [trees, setTrees] = useState<Tree[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [species, setSpecies] = useState<Species[]>([]);

    useEffect(() => {
        Promise.all([
            api.get('/trees/get/getTrees'),
            api.get('/groups/get/getGroups'),
            api.get('/species/get/getSpecies')
        ])
        .then((responses) => {
            setTrees(responses[0].data);
            setGroups(responses[1].data);
            setSpecies(responses[2].data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    const navigate = useNavigate();

    const createOrUpdateHarvest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        navigate(`/filter?tree_id=${treeId}&group_id=${groupId}&species_id=${speciesId}`);
    }

    return (
        <FormContainer onSubmit={(e) => createOrUpdateHarvest(e)}>
            <FormInputs>
                <SelectOneInput onChange={(e) => setTreeId(e.target.value)}>
                    <option value={''} selected={treeId === ''}>Árvore</option>
                    {trees && trees[0] && trees.map((tree) => {
                        return <option value={tree.id} selected={treeId === tree.id}>{tree.description}</option>
                    })}
                </SelectOneInput>

                <SelectOneInput onChange={(e) => setGroupId(e.target.value)}>
                    <option value={''} selected={groupId === ''}>Grupo</option>
                    {groups && groups[0] && groups.map((group) => {
                        return <option value={group.id} selected={groupId === group.id}>{group.name}</option>
                    })}
                </SelectOneInput>

                <SelectOneInput onChange={(e) => setSpeciesId(e.target.value)}>
                    <option value={''} selected={speciesId === ''}>Espécie</option>
                    {species && species[0] && species.map((specie) => {
                        return <option value={specie.id} selected={speciesId === specie.id}>{specie.description}</option>
                    })}
                </SelectOneInput>
            </FormInputs>

            <FormOptions>
                <Submit type="submit">Filtrar</Submit>
            </FormOptions>
        </FormContainer>
    )
}

export default FilterHarvestForm;