import styled from "styled-components";

export const FormContainer = styled.form`

    margin: 0 8rem;
    padding: 1rem 2rem;
    background-color: ${props => props.theme.colors.white};
    border-radius: 5px;
    border: 1px solid ${props => props.theme.colors.primary};

`;

export const FormInputs = styled.div`

    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: left;
    column-gap: 2rem;
    row-gap: 1rem;

`;

export const FormOptions = styled.div`

    display: flex;
    justify-content: right;
    margin-top: 1rem;

`;