import React, { useState } from "react";
import { Button, Container, LinearProgress, Rating } from "@mui/material";

//css
import "./App.css";

//constants
import { questionArray } from "./utils/constant";
import FinishExam from "./component/FinishExam/FinishExam";
import QuestionContainer from "./component/QuestionContainer/QuestionContainer";
import ResultBar from "./component/ResultBar/ResultBar";
import { shuffleArray } from "./utils/helperFunction";

function App() {
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [answerHistory, setAnswerHistory] = useState({
    correct: 0,
    incorrect: 0,
  });
  const [activeQuestion, setActiveQuestion] = useState({
    ...questionArray[0],
    activeIndex: 0,
    incorrect_answers: shuffleArray([
      ...questionArray[0].incorrect_answers,
      questionArray[0].correct_answer,
    ]),
  });

  // Quiz progress
  const progress =
    (100 * activeQuestion.activeIndex) / questionArray.length - 1;

  //Scores
  const lowestScore = (answerHistory.correct / questionArray.length) * 100;
  const currentScore =
    (answerHistory.correct / activeQuestion.activeIndex) * 100 || 0;
  const remainingHighest = questionArray.length - activeQuestion.activeIndex;
  const remainingHighestPercentage =
    (remainingHighest * 100) / questionArray.length;
  const possibleHighest = remainingHighestPercentage + lowestScore;

  return (
    <Container className="App">
      <div style={{ position: "relative" }}>
        {!isExamFinished && (
          <div className="appContainer">
            <div>
              <LinearProgress
                variant="determinate"
                className="progressBar"
                value={progress}
              />
              <QuestionContainer
                activeQuestion={activeQuestion}
                setIsExamFinished={setIsExamFinished}
                answerHistory={answerHistory}
                setAnswerHistory={setAnswerHistory}
                setActiveQuestion={setActiveQuestion}
              />
            </div>
            <ResultBar
              currentScore={currentScore}
              possibleHighest={possibleHighest}
              lowestScore={lowestScore}
            />
          </div>
        )}
        {isExamFinished && <FinishExam />}
      </div>
    </Container>
  );
}

export default App;
