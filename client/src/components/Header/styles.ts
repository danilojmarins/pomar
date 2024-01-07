import styled from "styled-components";

export const HeaderContainer = styled.div`

    width: 100%;
    padding: 0.5rem 2rem;
    border-bottom: 1px solid ${props => props.theme.colors.grey};
    background-color: ${props => props.theme.colors.text_light};
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: static;

`;

export const Title = styled.h1`

    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    width: fit-content;
    cursor: pointer;

    &::selection {
        background-color: transparent;
    }

`;

export const Links = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;

`;

export const Link = styled.div`

    padding: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all ease 0.2s;

    &:hover {
        color: ${props => props.theme.colors.primary};
    }

`;