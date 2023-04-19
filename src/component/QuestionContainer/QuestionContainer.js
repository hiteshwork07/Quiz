import React, { useState } from "react";
import { Button, Rating } from "@mui/material";
import { Col, Row } from "react-bootstrap";

//constants and helper
import { questionArray } from "../../utils/constant";
import { getRating, shuffleArray } from "../../utils/helperFunction";

//css
import "./styles.css";

const QuestionContainer = ({
  activeQuestion,
  setAnswerHistory,
  answerHistory,
  setActiveQuestion,
  setIsExamFinished,
}) => {
  const [activeAnswer, setActiveAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // Navigation for next question
  const onNextQuestion = () => {
    if (questionArray.length === activeQuestion.activeIndex + 1) {
      setIsExamFinished(true);
      return;
    }
    if (activeAnswer === "pass") {
      setAnswerHistory({
        ...answerHistory,
        correct: answerHistory.correct + 1,
      });
    } else if (activeAnswer === "fail") {
      setAnswerHistory({
        ...answerHistory,
        incorrect: answerHistory.incorrect + 1,
      });
    }
    const newIndex = activeQuestion.activeIndex + 1;
    const newArray = shuffleArray([
      questionArray[newIndex].correct_answer,
      ...questionArray[newIndex].incorrect_answers,
    ]);
    setActiveQuestion({
      ...questionArray[newIndex],
      activeIndex: newIndex,
      incorrect_answers: newArray,
    });
    setActiveAnswer("");
    setSelectedAnswer("");
  };

  // Quiz question render
  return (
    <div className="boxWrapper">
      <div className="questionHeader">
        <h1 style={{ margin: 0 }}>
          {`Question ${activeQuestion.activeIndex + 1} of ${
            questionArray.length
          }`}
        </h1>
      </div>
      <div className="categoryLabel">
        {decodeURIComponent(activeQuestion.category)}
      </div>
      <Rating
        name="text-feedback"
        value={getRating(activeQuestion.difficulty)}
        readOnly
        precision={0.5}
        color="red"
        className="ratingStar"
      />
      <div className="mt-5">{decodeURIComponent(activeQuestion.question)}</div>
      <div className="mt-4">
        <Row>
          {activeQuestion.incorrect_answers.map((i) => (
            <Col xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                className={`button w-100 mt-4 mb-4 text-uppercase optionsButton ${
                  i === selectedAnswer && "selectedOptionActive"
                }`}
                onClick={() => {
                  setSelectedAnswer(i);
                  if (activeQuestion.correct_answer === i)
                    return setActiveAnswer("pass");
                  else setActiveAnswer("fail");
                }}
              >
                {decodeURIComponent(i)}
              </Button>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ marginTop: 20 }} className="nextBtnWrapper">
        <div className="correctLabel">
          {activeAnswer && (activeAnswer === "pass" ? "Correct!" : "Sorry!")}
        </div>
        <Button
          variant="contained"
          component="label"
          className="nextButton"
          onClick={onNextQuestion}
        >
          Next Question
        </Button>
      </div>
    </div>
  );
};

export default QuestionContainer;
