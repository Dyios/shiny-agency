import React from 'react'
import styled from 'styled-components';
import { StyledLink } from '../utils/style/atoms'
import colors from '../utils/style/colors';
import illustration from '../assets/home-illustration.svg'
import { useTheme } from '../utils/hooks';

const Container = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 30px;
  padding: 60px 90px;
  background-color: ${({ theme }) => theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${StyledLink} {
    max-width: 250px;
  }
`

const H1 = styled.h1`
  font-size: 45px;
  padding-bottom: 30px;
  line-height: 70px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : colors.backgroundLight)};
`

const RightSide = styled.img`
  height: 506px;
`

function App() {
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
      <LeftSide>
        <H1 theme={theme}>
          Repérez vos besoins,
          on s’occupe du reste, avec les meilleurs talents
        </H1>
        <StyledLink to="/survey/1" $isFullLink>Faire le test</StyledLink>
      </LeftSide>
      <RightSide src={illustration} />
    </Container>
  );
}

export default App;
