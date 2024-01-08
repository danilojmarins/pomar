import { useContext, useEffect, useState } from "react";
import { NumberInput, SelectOneInput, Submit, TextInput } from "../Inputs/styles";
import { FormContainer, FormInputs, FormOptions } from "./styles";
import { Tree } from "../../types/tree";
import { api } from "../../services/api";
import { ModalContext } from "../../contexts/ModalContext";
import { AxiosResponse } from "axios";
import { Species } from "../../types/species";

interface TreeFormProps {
    toEdit: Tree | undefined;
    getSaved: (saved: AxiosResponse) => void;
}

const TreeForm = (props: TreeFormProps) => {

    const { toEdit, getSaved } = props;

    const [id, setId] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [speciesId, setSpeciesId] = useState<string>('');
    const [species, setSpecies] = useState<Species[]>([]);

    const { setShow, setType, setMessage } = useContext(ModalContext);

    useEffect(() => {
        api.get('/species/get/getSpecies')
        .then((response) => {
            console.log(response)
            setSpecies(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        if (toEdit) {
            setId(toEdit.id);
            setDescription(toEdit.description);
            setAge(toEdit.age.toString());
            setSpeciesId(toEdit.species.id);
        }
    }, [toEdit]);

    const createOrUpdateTree = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(speciesId)

        const options = id ? {
            url: '/trees/put/updateTree',
            method: 'PUT',
            data: {
                id: id,
                description: description,
                age: parseInt(age),
                species_id: speciesId
            }
        }
        :
        {
            url: '/trees/post/createTree',
            method: 'POST',
            data: {
                id: id,
                description: description,
                age: parseInt(age),
                species_id: speciesId
            }
        };
        const message = id ? 'Árvore editada.' : 'Árvore criada.';

        api.request(options)
        .then((res) => {
            setShow(true);
            setType('success');
            setMessage(message);
            getSaved(res);
        })
        .catch((err) => {
            setShow(true);
            setType('error');
            setMessage(err.response.data);
        })
        .finally(() => {
            setId('');
            setDescription('');
            setAge('');
            setSpeciesId('');
        });
    }

    return (
        <FormContainer onSubmit={(e) => createOrUpdateTree(e)}>
            <FormInputs>
                <TextInput
                    type="text"
                    value={description}
                    placeholder="Descrição"
                    onChange={(e) => setDescription(e.target.value)}
                    required minLength={3} maxLength={255}
                />

                <NumberInput
                    type="number"
                    value={age}
                    placeholder="Idade (meses)"
                    onChange={(e) => setAge(e.target.value)}
                    required min={0} max={1200} step={1}
                />

                <SelectOneInput required onChange={(e) => setSpeciesId(e.target.value)}>
                    <option value={''} selected={speciesId === ''}>Espécie</option>
                    {species && species[0] && species.map((specie) => {
                        return <option value={specie.id} selected={speciesId === specie.id}>{specie.description}</option>
                    })}
                </SelectOneInput>
            </FormInputs>

            <FormOptions>
                <Submit type="submit">Salvar</Submit>
            </FormOptions>
        </FormContainer>
    )
}

export default TreeForm;