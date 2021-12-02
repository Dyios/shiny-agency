import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../utils/style/colors'
import { useTheme } from '../utils/hooks'

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 15px;
    background-color: ${({ theme }) => theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
    border-radius: 30px;
    width: 300px;
    height: 300px;
    transition: 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`

const CardLabel = styled.span`
  color: ${({ theme }) => theme === 'light' ? colors.primary : colors.backgroundLight};
  font-size: 22px;
  font-weight: normal;
  align-self: flex-start;
  padding-left: 15px;
  height: 25px;
`

const CardImage = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
`

const CardTitle = styled.span`
  color: ${({ theme }) => theme === 'light' ? 'black' : colors.backgroundLight};
  font-size: 22px; 
`

function Card({ label, title, picture }) {
  const { theme } = useTheme()

  return (
    <CardWrapper theme={theme} >
      <CardLabel theme={theme}>{label}</CardLabel>
      <CardImage src={picture} alt="freelance" />
      <CardTitle theme={theme}> {title} </CardTitle>
    </CardWrapper>
  )
}

Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
}

Card.defaultProps = {
  label: '',
  title: '',
  picture: '../../assets/progile.png'
}

export default Card
