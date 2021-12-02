import React from "react"
import styled from "styled-components"
import colors from "../utils/style/colors"
import illustration from "../assets/404.svg"

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
    padding: 60px 90px;
    background-color: ${colors.backgroundLight};

    & > *:not(:last-child) {
        margin-bottom: 30px;
    }
`

const Illustration = styled.img`
    max-width: 800px;
    margin-bottom: 90px;
`

const ErrorTitle = styled.h1`
    font-weight: 300;
    color: ${colors.tertiary};
`

function Error() {
    return (
        <Main>
            <ErrorTitle>Oups...</ErrorTitle>
            <Illustration src={illustration} alt="404" />
            <ErrorTitle as='h2'>Il semblerait qu’il y ait un problème</ErrorTitle>
        </Main>
    )
}
 
export default Error