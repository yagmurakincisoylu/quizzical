import React, {useState} from "react";
import Opening from "./components/Opening";
import Loading from "./components/Loading";
import Question from "./components/Question";

function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState([]);

  function getQuizData() {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => setQuizData(data.results.map(result => (
        {
          question: result.question,
          correct_answer: result.correct_answer,
          options: [result.correct_answer, ...result.incorrect_answers].sort(() => Math.random() - 0.5)
        }
      ))))

      setShowQuiz(false);
      setShowLoading(true);
      setShowOpening(false);

      setTimeout(() => {
        setShowQuiz(true);
        setShowLoading(false);
      }, 1500)
  }

  return (
    <div className="container">
      <div className="top-blob"></div>
      <div className="bottom-blob"></div>

      {showOpening && <Opening getQuizData= {getQuizData} />}
      
      {showLoading && <Loading />}

      {showQuiz && <Question quizData={quizData} getQuizData={getQuizData} />}
      
    </div>
  );
}

export default App;