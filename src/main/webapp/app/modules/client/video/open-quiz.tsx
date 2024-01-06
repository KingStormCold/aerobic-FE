import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Loading from 'app/components/loading';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ITestAnswerClient } from 'app/shared/model/test';
import { submitQuiz, updateStateQuiz } from 'app/shared/reducers/test';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const OpenQuiz = () => {
  const dispatch = useAppDispatch();
  const openQuiz = useAppSelector(state => state.test.openQuiz)
  const quizs = useAppSelector(state => state.test.quizs)
  const loadingTest = useAppSelector(state => state.test.loading)
  const resultQuizSuccess = useAppSelector(state => state.test.resultQuizSuccess)
  const resultQuiz = useAppSelector(state => state.test.resultQuiz)
  const [testAnswer, setTestAnswer] = useState([] as ITestAnswerClient[])
  const handleCloseQuiz = () => {
    dispatch(updateStateQuiz(false))
  }

  useEffect(() => {
    if (quizs && quizs.length > 0) {
      const answerList = [] as ITestAnswerClient[]
      quizs.map((item) => {
        const data = {
          test_id: item.test_id,
          serial_answer: 0
        } as ITestAnswerClient
        answerList.push(data)
      })
      setTestAnswer(answerList)
    }
  }, [quizs])

  const handleRadioChange = (event, testId) => {
    testAnswer.filter(item => {
      if (item.test_id === testId) {
        item.serial_answer = Number(event.target.value)
      }
    })
  };

  const [errorQuiz, setErrorQuiz] = useState('')
  const handleSubmitQuiz = () => {
    let error = false
    setErrorQuiz('')
    testAnswer.filter(item => {
      if (item.serial_answer === 0) {
        setErrorQuiz('Please complete the questions')
        error = true
      }
    })
    console.log('testAnswer', testAnswer)
    if (error) {
      return
    }
    dispatch(submitQuiz({ quizs: testAnswer }))
  }

  return (
    <>
      {loadingTest && <Loading />}
      {resultQuizSuccess && resultQuiz && resultQuiz.tests && resultQuiz.tests.length > 0 ?
        (<Dialog
          aria-labelledby="customized-dialog-title"
          open={true}
          disableEscapeKeyDown={false}
          fullWidth
          sx={{
            '.MuiDialog-container': {
              '.MuiPaper-root': {
                height: '70%',
                maxWidth: 'none',
                width: '65%'
              }
            }
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Test results
          </DialogTitle>
          <DialogContent dividers>
            {resultQuiz.tests.map((item, index) => (
              <Box component="div" key={index} sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                marginTop: '16px',
                backgroundColor: `${item.isCorrect ? 'rgb(20 223 52 / 20%)' : 'rgb(255 0 0 / 20%)'}`,
                padding: '15px'
              }}>
                <Typography level="title-lg" >
                  Câu {index + 1}: {item.test_content}
                  {item.isCorrect ? <DoneIcon sx={{ color: 'rgb(20 223 52)' }} /> : <CloseIcon sx={{ color: 'rgb(255 0 0)' }} />}
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  aria-disabled={true}
                >
                  {item.answers && item.answers.length > 0 && item.answers.map((answer, j) => (
                    <FormControlLabel key={index + j} disabled sx={{ backgroundColor: '#fffff' }} checked={answer.checked} control={<Radio />} label={answer.answer_test} />
                  ))}
                </RadioGroup>

              </Box>
            ))}
            <Card.Text as="div" className="success-text">
            Number of correct answers {resultQuiz?.total_correct}/10
            </Card.Text>
          </DialogContent>
          <DialogActions>
            <Button variant="soft" autoFocus onClick={handleCloseQuiz}>
            Close
            </Button>
          </DialogActions>
        </Dialog>
        )
        :
        (<Dialog
          aria-labelledby="customized-dialog-title"
          open={openQuiz}
          disableEscapeKeyDown={false}
          fullWidth
          sx={{
            '.MuiDialog-container': {
              '.MuiPaper-root': {
                height: '70%',
                maxWidth: 'none',
                width: '65%'
              }
            }
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Tests
          </DialogTitle>
          <DialogContent dividers>
            {quizs && quizs.length > 0 && quizs.map((quiz, index) => (
              <Box component="div" key={quiz?.test_id + index} sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                marginTop: '16px',
                backgroundColor: '#ededed',
                padding: '15px'
              }}>
                <Typography level="title-lg" >
                Sentence {index + 1}: {quiz.test_content}
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onChange={(e) => { handleRadioChange(e, quiz.test_id) }}
                >
                  {quiz.answers && quiz.answers.length > 0 && quiz.answers.map((answer, j) => (
                    <FormControlLabel key={answer.id + j} value={answer.serial_answer} control={<Radio />} label={answer.answer_test} />
                  ))}
                </RadioGroup>
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            {errorQuiz && (
              <Card.Text as="div" className="error-text">
                {errorQuiz}
              </Card.Text>
            )}
            <Button variant="soft" autoFocus onClick={handleCloseQuiz}>
            Close
            </Button>
            <Button variant="solid" size="sm" onClick={handleSubmitQuiz}>
            Submission
            </Button>
          </DialogActions>
        </Dialog>)
      }
    </>
  )
}

export default OpenQuiz;
