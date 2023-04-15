import React from "react";
import checkIcon from "../../asset/images/check-mark.jpg";

//css
import "./styles.css";

// A component to display on exam finished
const FinishExam = () => {
  return (
    <div className='Finish-exam-banner text-center'>
      <img style={{ height: 300, marginTop: 200 }} src={checkIcon} />
      <div>Your Quiz is completed</div>
    </div>
  );
};

export default FinishExam;
