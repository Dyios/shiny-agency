import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { StyledLink } from '../utils/style/atoms'
import darkLogo from '../assets/dark-logo.png'
import lightLogo from '../assets/light-logo.png'
import { useTheme } from '../utils/hooks'

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`

const Logo = styled.img`
  height: 70px;
`

function Header() {
  const { theme } = useTheme()

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={theme === 'dark' ? lightLogo : darkLogo} />
      </Link>
      <nav>
        <StyledLink $theme={theme} to="/">Accueil</StyledLink>
        <StyledLink $theme={theme} to="/freelances">Profils</StyledLink>
        <StyledLink to="/survey/1" $isFullLink>Faire le test</StyledLink>
      </nav>
    </HeaderContainer>
  )
}

export default Header
