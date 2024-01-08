import styled from "styled-components";

export const TextInput = styled.input`

    border: 1px solid ${props => props.theme.colors.grey};
    border-radius: 3px;
    outline: none;
    padding: 0.2rem 0.5rem;
    color: ${props => props.theme.colors.text_shade};
    font: inherit;
    font-size: 0.8rem;

`;

export const NumberInput = styled(TextInput)`

    width: 130px;

`;

export const SelectOneInput = styled.select`

    border: 1px solid ${props => props.theme.colors.grey};
    border-radius: 3px;
    outline: none;
    padding: 0.2rem 0.5rem;
    color: ${props => props.theme.colors.text_shade};
    font: inherit;
    font-size: 0.8rem;

`;

export const SelectedOptions = styled.div`

    display: flex;
    align-items: center;
    column-gap: 10px;

    p {
        font-size: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        column-gap: 4px;
        padding: 2px 4px;
        border: 1px solid ${props => props.theme.colors.grey};
        border-radius: 2px;
    }

    span {
        cursor: pointer;
        font-size: 0.8rem;
        margin-top: 2px;
    }

`;

export const Submit = styled.button`

    border: 1px solid ${props => props.theme.colors.grey};
    padding: 3px 5px;
    border-radius: 3px;
    font: inherit;
    background-color: ${props => props.theme.colors.primary_tint};
    cursor: pointer;

`;