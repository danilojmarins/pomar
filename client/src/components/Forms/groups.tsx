import { useContext, useEffect, useState } from "react";
import { SelectOneInput, SelectedOptions, Submit, TextInput } from "../Inputs/styles";
import { FormContainer, FormInputs, FormOptions } from "./styles";
import { Group } from "../../types/group";
import { api } from "../../services/api";
import { ModalContext } from "../../contexts/ModalContext";
import { AxiosResponse } from "axios";
import { Tree } from "../../types/tree";
import { IoMdClose } from "react-icons/io";

interface GroupFormProps {
    toEdit: Group | undefined;
    getSaved: (saved: AxiosResponse) => void;
}

const GroupForm = (props: GroupFormProps) => {

    const { toEdit, getSaved } = props;

    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [treeId, setTreeId] = useState<string[]>([]);
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
            setName(toEdit.name);
            setDescription(toEdit.description);

            const trees: string[] = [];

            toEdit.trees.forEach(tree => {
                trees.push(tree.id);
            });

            setTreeId(trees);
        }
    }, [toEdit]);

    const createOrUpdateGroup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const options = id ? {
            url: '/groups/put/updateGroup',
            method: 'PUT',
            data: {
                id: id,
                name: name,
                description: description,
                trees_id: treeId
            }
        }
        :
        {
            url: '/groups/post/createGroup',
            method: 'POST',
            data: {
                id: id,
                name: name,
                description: description,
                trees_id: treeId
            }
        };
        const message = id ? 'Grupo editado.' : 'Grupo criado.';

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
            setName('');
            setDescription('');
            setTreeId([]);
        });
    }

    return (
        <FormContainer onSubmit={(e) => createOrUpdateGroup(e)}>
            <FormInputs>
                <TextInput
                    type="text"
                    value={name}
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    required minLength={3} maxLength={64}
                />

                <TextInput
                    type="text"
                    value={description}
                    placeholder="Descrição"
                    onChange={(e) => setDescription(e.target.value)}
                    required minLength={3} maxLength={255}
                />

                <SelectOneInput onChange={(e) => setTreeId([...treeId, e.target.value])}>
                    <option value={''}>Árvore</option>
                    {trees && trees[0] && trees.map((tree) => {
                        if (!treeId.includes(tree.id)) {
                            return <option value={tree.id}>{tree.description}</option>
                        }
                    })}
                </SelectOneInput>

                {treeId[0] &&
                    <SelectedOptions>
                        {treeId.map(id => {
                            const tree = trees.find(tree => tree.id === id);
                            return (
                                <p>
                                    <span onClick={() => {
                                        setTreeId(ids => {
                                            return ids.filter(value => value !== id);
                                        });
                                    }}>
                                        <IoMdClose />
                                    </span>
                                    {tree?.description}
                                </p>
                            )
                        })}
                    </SelectedOptions>
                }
            </FormInputs>

            <FormOptions>
                <Submit type="submit">Salvar</Submit>
            </FormOptions>
        </FormContainer>
    )
}

export default GroupForm;