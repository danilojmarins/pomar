import styled from "styled-components";

export const ModalContainer = styled.div`
    
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;
    border-radius: 5px;
    background-color: ${props => props.theme.colors.white};
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 10;

    &.error {
        border: 1px solid ${props => props.theme.colors.danger};
        color: ${props => props.theme.colors.danger};
    }

    &.success {
        border: 1px solid ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary_shade};
    }

    span {
        font-size: 2rem;
        margin-top: 5px;
    }

`;