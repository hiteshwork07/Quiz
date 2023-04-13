import React, { useState } from "react";
import "./App.css";
import { questionArray } from "./constant";
import { Button, Container, LinearProgress, Rating } from "@mui/material";
import { getRating } from "./helperFunction";

function App() {
  const [answerList, setAnswerList] = useState({
    
  });
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
      <LinearProgress
        variant="determinate"
        className="progressBar"
        color="success"
        value={progress}
      />
      <div>{`Question ${activeQuestion.activeIndex} of ${questionArray.length}`}</div>
      <div>{activeQuestion.category}</div>
      <Rating
        name="text-feedback"
        value={getRating(activeQuestion.difficulty)}
        readOnly
        precision={0.5}
        color="red"
      />
      <div>{activeQuestion.question}</div>
      <div>
        <div className="buttonCombo">
          {activeQuestion.incorrect_answers.map((i) => (
            <Button
              variant="contained"
              component="label"
              className="button"
              onClick={() => {
                if (activeQuestion.correct_answer === i)
                  return setActiveAnswer("pass");
                else setActiveAnswer("fail");
              }}
            >
              {i}
            </Button>
          ))}
        </div>
      </div>
      {activeAnswer && (
        <div>{activeAnswer === "pass" ? "Correct!" : "Sorry!"}</div>
      )}
      <Button
        disabled={questionArray.length === activeQuestion.activeIndex + 1}
        variant="contained"
        component="label"
        className="nextButton"
        onClick={onNextQuestion}
      >
        Next Question
      </Button>
    </Container>
  );
}

export default App;
