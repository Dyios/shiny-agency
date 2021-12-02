import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../utils/style/colors'
import { Loader } from '../utils/style/atoms'
import { SurveyContext } from '../utils/context'
import { useFetch, useTheme } from '../utils/hooks'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ theme }) => theme === 'light' ? 'black' : colors.backgroundLight};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => theme === 'light' ? 'black' : colors.backgroundLight};
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => theme === 'dark' ? colors.backgroundLight : colors.backgroundDark};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ theme }) => theme === 'light' ? 'black' : colors.backgroundLight};
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber, 10)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`)
  const { surveyData } = data
  const { answers, saveAnswers } = useContext(SurveyContext)
  const { theme } = useTheme()

  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
  }

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <SurveyContainer>
      <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle>
      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContent theme={theme}>{surveyData[questionNumber]}</QuestionContent>
      )}
      <ReplyWrapper >
        <ReplyBox
          theme={theme}
          onClick={() => saveReply(true)}
          isSelected={answers[questionNumber] === true}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          theme={theme}
          onClick={() => saveReply(false)}
          isSelected={answers[questionNumber] === false}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>
      <LinkWrapper theme={theme}>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData && surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

export default Survey
