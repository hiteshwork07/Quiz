import React, { useState } from "react";
import "./App.css";
import { questionArray } from "./constant";
import { Button, Container, LinearProgress, Rating } from "@mui/material";
import { getRating } from "./helperFunction";

function App() {
  const [answerList, setAnswerList] = useState({});
  const [activeAnswer, setActiveAnswer] = useState("");
  const [activeQuestion, setActiveQuestion] = useState({
    ...questionArray[0],
    activeIndex: 1,
    incorrect_answers: [
      questionArray[0].correct_answer,
      ...questionArray[0].incorrect_answers,
    ],
  });
  const progress =
    (100 * activeQuestion.activeIndex) / questionArray.length - 1;
  const onNextQuestion = () => {
    const newIndex = activeQuestion.activeIndex + 1;
    setActiveQuestion({
      ...questionArray[newIndex],
      activeIndex: newIndex,
      incorrect_answers: [
        questionArray[newIndex].correct_answer,
        ...questionArray[newIndex].incorrect_answers,
      ],
    });
  };
  return (
    <Container className="App">
      <div className="appContainer">
        <LinearProgress
          variant="determinate"
          className="progressBar"
          value={progress}
        />
        <div className="boxWrapper">
          <div className="questionHeader">
            <h1 style={{ margin: 0 }}>
              {`Question ${activeQuestion.activeIndex} of ${questionArray.length}`}
            </h1>
          </div>
          <div className="categoryLabel">{decodeURIComponent(activeQuestion.category)}</div>
          <Rating
            name="text-feedback"
            value={getRating(activeQuestion.difficulty)}
            readOnly
            precision={0.5}
            color="red"
            className="ratingStar"
          />
          <div className="questionText">{decodeURIComponent(activeQuestion.question)}</div>
          <div>
            <div className="buttonCombo">
              {activeQuestion.incorrect_answers.map((i) => (
                <Button
                  variant="contained"
                  component="label"
                  className="button optionsButton"
                  onClick={() => {
                    if (activeQuestion.correct_answer === i)
                      return setActiveAnswer("pass");
                    else setActiveAnswer("fail");
                  }}
                >
                  {decodeURIComponent(i)}
                </Button>
              ))}
            </div>
          </div>
          {activeAnswer && (
            <div>{activeAnswer === "pass" ? "Correct!" : "Sorry!"}</div>
          )}
          <div className="nextBtnWrapper">
            <Button
              disabled={questionArray.length === activeQuestion.activeIndex + 1}
              variant="contained"
              component="label"
              className="nextButton"
              onClick={onNextQuestion}
            >
              Next Question
            </Button>
          </div>
        </div>
      </div>
      
    </Container>
  );
}

export default App;
