import styled from "styled-components";

export const CardContainer = styled.div`

    border-radius: 4px;
    border: 1px solid ${props => props.theme.colors.grey};
    margin: auto;
    width: 350px;

`;

export const CardHeader = styled.div`

    padding: 0.5rem;
    background-color: ${props => props.theme.colors.primary_tint};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        display: flex;
        align-items: center;
        column-gap: 8px;
    }

`;

export const CardContent = styled.div`

    padding: 0.375rem;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

export const CardOptions = styled.div`

    padding: 0.375rem;
    padding-top: 1rem;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: right;
    column-gap: 1rem;

    p {
        padding: 3px 5px;
        border-radius: 3px;
        color: ${props => props.theme.colors.text_light};
        font-weight: 500;
        cursor: pointer;
    }

    .edit {
        background-color: ${props => props.theme.colors.information}DD;
    }

    .delete {
        background-color: ${props => props.theme.colors.danger}DD;
    }

`;