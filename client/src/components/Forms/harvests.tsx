import { useContext, useEffect, useState } from "react";
import { NumberInput, SelectOneInput, Submit, TextInput } from "../Inputs/styles";
import { FormContainer, FormInputs, FormOptions } from "./styles";
import { Harvest } from "../../types/harvest";
import { api } from "../../services/api";
import { ModalContext } from "../../contexts/ModalContext";
import { AxiosResponse } from "axios";
import { Tree } from "../../types/tree";

interface HarvestFormProps {
    toEdit: Harvest | undefined;
    getSaved: (saved: AxiosResponse) => void;
}

const HarvestForm = (props: HarvestFormProps) => {

    const { toEdit, getSaved } = props;

    const [id, setId] = useState<string>('');
    const [information, setInformation] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [treeId, setTreeId] = useState<string>('');
    const [trees, setTrees] = useState<Tree[]>([]);

    const { setShow, setType, setMessage } = useContext(ModalContext);

    useEffect(() => {
        api.get('/trees/get/getTrees')
        .then((response) => {
            setTrees(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        if (toEdit) {
            setId(toEdit.id);
            setInformation(toEdit.information);
            setDate(toEdit.date);
            setWeight(toEdit.weight.toString());
            setTreeId(toEdit.tree.id);
        }
    }, [toEdit]);

    const createOrUpdateHarvest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const options = id ? {
            url: '/harvests/put/updateHarvest',
            method: 'PUT',
            data: {
                id: id,
                information: information,
                date: date,
                weight: parseFloat(weight.replace(',', '.')),
                tree_id: treeId
            }
        }
        :
        {
            url: '/harvests/post/createHarvest',
            method: 'POST',
            data: {
                id: id,
                information: information,
                date: date,
                weight: parseFloat(weight.replace(',', '.')),
                tree_id: treeId
            }
        };
        const message = id ? 'Colheita editada.' : 'Colheita criada.';

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
            setInformation('');
            setDate('');
            setWeight('');
            setTreeId('');
        });
    }

    return (
        <FormContainer onSubmit={(e) => createOrUpdateHarvest(e)}>
            <FormInputs>
                <TextInput
                    type="text"
                    value={information}
                    placeholder="Informações"
                    onChange={(e) => setInformation(e.target.value)}
                    required minLength={3} maxLength={255}
                />

                <NumberInput
                    type="date"
                    value={date}
                    placeholder="Data"
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <NumberInput
                    type=""
                    value={weight}
                    placeholder="Peso (KG)"
                    onChange={(e) => setWeight(e.target.value)}
                    required min={1}
                />

                <SelectOneInput required onChange={(e) => setTreeId(e.target.value)}>
                    <option value={''} selected={treeId === ''}>Árvore</option>
                    {trees && trees[0] && trees.map((tree) => {
                        return <option value={tree.id} selected={treeId === tree.id}>{tree.description}</option>
                    })}
                </SelectOneInput>
            </FormInputs>

            <FormOptions>
                <Submit type="submit">Salvar</Submit>
            </FormOptions>
        </FormContainer>
    )
}

export default HarvestForm;