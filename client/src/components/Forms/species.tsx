import { useContext, useEffect, useState } from "react";
import { Submit, TextInput } from "../Inputs/styles";
import { FormContainer, FormInputs, FormOptions } from "./styles";
import { Species } from "../../types/species";
import { api } from "../../services/api";
import { ModalContext } from "../../contexts/ModalContext";
import { AxiosResponse } from "axios";

interface SpeciesFormProps {
    toEdit: Species | undefined;
    getSaved: (saved: AxiosResponse) => void;
}

const SpeciesForm = (props: SpeciesFormProps) => {

    const { toEdit, getSaved } = props;

    const [id, setId] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const { setShow, setType, setMessage } = useContext(ModalContext);

    useEffect(() => {
        if (toEdit) {
            setId(toEdit.id);
            setDescription(toEdit.description);
        }
    }, [toEdit]);

    const createOrUpdateSpecies = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const options = id ? {
            url: '/species/put/updateSpecies',
            method: 'PUT',
            data: {
                id: id,
                description: description
            }
        }
        :
        {
            url: '/species/post/createSpecies',
            method: 'POST',
            data: {
                id: id,
                description: description
            }
        };
        const message = id ? 'Espécie editada.' : 'Espécie criada.';

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
        });
    }

    return (
        <FormContainer onSubmit={(e) => createOrUpdateSpecies(e)}>
            <FormInputs>
                <TextInput
                    type="text"
                    value={description}
                    placeholder="Descrição"
                    onChange={(e) => setDescription(e.target.value)}
                    required minLength={3} maxLength={255}
                />
            </FormInputs>

            <FormOptions>
                <Submit type="submit">Salvar</Submit>
            </FormOptions>
        </FormContainer>
    )
}

export default SpeciesForm;