import React, {useState} from "react";

function Question({quizData, getQuizData}) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [trueAnswers, setTrueAnswers] = useState(0)
  let correctAnswersArray = [];

  function decodeHtml(text) {
    let element = document.createElement("textarea");
    element.innerHTML = text;
    return element.value;
  }

  function handleChange(event) {
    const {name, value} = event.target;
    setUserAnswers(prevUserAnswers => {
      return {
          ...prevUserAnswers,
          [name]: value
        }
      })
  }

  function checkAnswers() {
    let correctAnswersObj = Object.assign({}, correctAnswersArray);
    setShowAnswers(true);

    for(let i = 0; i < 5; i++) {
      if(userAnswers[i] === correctAnswersObj[i][i]) {
        setTrueAnswers(prevTrueAnswers => prevTrueAnswers + 1);
      } 
    }
  }

  function newGame() {
    setUserAnswers([]);
    setShowAnswers(false);
    setTrueAnswers(0);
    correctAnswersArray = [];
    getQuizData();
  }

  const questionElement = quizData.map((quiz, index) => {
    correctAnswersArray.push({[index]: quiz.correct_answer})

    const optionElement = quiz.options.map(option => {
      const styles = {
        backgroundColor: showAnswers && quiz.correct_answer === option ? "#94d7a2" : "tranparent"
      }

      return (
        <label 
          className="answer"
          key={(Math.random() + 1) * (Math.random() + 1)}
          style= {styles}
        >
          {decodeHtml(option)}
          <input 
            type="radio"
            id={decodeHtml(option)}
            name={index}
            value={decodeHtml(option)}
            checked={userAnswers[index] === decodeHtml(option)}
            onChange={handleChange}
            data-is-correct={quiz.correct_answer === option ? true : false}
          />
        </label>
      )
    })

    return (
      <div className="question-container" key={(Math.random() + 1) * (Math.random() + 1)}>
        <h2 className="question">{decodeHtml(quiz.question)}</h2>
        <div className="answer-container">
          {optionElement}
        </div>
      </div>
  )})

  return (
    <div className="height-100">
      {questionElement}
      {!showAnswers && <button className="btn-small" onClick={checkAnswers}>Check answers</button>}

      {showAnswers && 
        <div className="score-container height-100">
          <p className="score-text">You scored {trueAnswers}/5 correct answers</p>
          <button className="btn-small" onClick={newGame}>Play Again</button>
        </div>
      }
    </div>
  )
}

export default Question;