import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TestDificil = () => { 
  const navigate = useNavigate();
  // Estado para las respuestas del usuario
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  // Las preguntas y opciones de nivel C1 y C2
  const questions = [
    {
      question: "Choose the correct sentence: 'By the time I arrived, they ___ the meeting.'",
      options: ["had started", "have started", "will have started", "start"],
      correctAnswer: "had started",
    },
    {
      question: "Which of the following words is closest in meaning to 'ephemeral'?",
      options: ["Permanent", "Short-lived", "Eternal", "Timeless"],
      correctAnswer: "Short-lived",
    },
    {
      question: "Complete the sentence: 'If I ___ you, I would have taken the job offer.'",
      options: ["was", "were", "am", "had been"],
      correctAnswer: "had been",
    },
    {
      question: "Which sentence is grammatically correct?",
      options: ["He suggested to go to the museum.", "He suggested going to the museum.", "He suggested that go to the museum.", "He suggested that we to go to the museum."],
      correctAnswer: "He suggested going to the museum.",
    },
    {
      question: "Choose the correct word to complete the sentence: 'She is very ___, she always gets what she wants.'",
      options: ["persuasive", "persuaded", "persuading", "persuasively"],
      correctAnswer: "persuasive",
    },
    {
      question: "What is the correct passive form of 'They will finish the report by tomorrow.'?",
      options: ["The report will be finished by tomorrow.", "The report will have finished by tomorrow.", "The report is finished by tomorrow.", "The report has been finished by tomorrow."],
      correctAnswer: "The report will be finished by tomorrow.",
    },
    {
      question: "Choose the correct sentence: 'Not only ___ the report, but she also presented it.'",
      options: ["she wrote", "did she write", "she has written", "wrote she"],
      correctAnswer: "did she write",
    },
    {
      question: "Which of the following is an example of a mixed conditional?",
      options: ["If I had studied harder, I would have passed the exam.", "If I study harder, I will pass the exam.", "If I had studied harder, I would pass the exam.", "If I study harder, I would have passed the exam."],
      correctAnswer: "If I had studied harder, I would pass the exam.",
    },
    {
      question: "Complete the sentence: 'She wouldn’t have gone to the party if she ___ about the exam.'",
      options: ["knew", "knows", "had known", "knowing"],
      correctAnswer: "had known",
    },
    {
      question: "Choose the correct phrase: '___ I ever told you the truth about that situation?'",
      options: ["Have", "Had", "Will", "Do"],
      correctAnswer: "Had",
    }
  ];

  // Función para manejar las respuestas seleccionadas
  const handleChange = (questionIndex, selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedAnswer;
    setAnswers(newAnswers);
  };

  // Función para calcular el resultado
  const calculateResult = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });
    const percentage = (score / questions.length) * 100;
    let message = '';
    if (percentage >= 100) {
      message = 'Excelente, pero ya sabes que hay que seguir mejorando!!';
    } else if (percentage >= 70) {
      message = 'Vas por buen camino, pero sigue practicando!!';
    } else if (percentage >= 30) {
      message = 'Necesitas más práctica aún!!';
    } else {
      message = 'Falta mejorar bastante, pero con la práctica lo lograrás!!';
    }
    setResult({ score, percentage, message });
  };
  
  return (
    <div className="min-h-screen bg-dark-blue flex items-center justify-center p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Prueba de Nivel Avanzado</h2>
        <p className="text-lg text-center mb-4 text-gray-800">Responde a las siguientes preguntas de inglés:</p>

        <form>
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
                <p className="font-semibold text-xl mb-3 text-gray-800">{question.question}</p>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`question-${index}-option-${optionIndex}`}
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleChange(index, option)}
                      className="mr-2"
                    />
                    <label htmlFor={`question-${index}-option-${optionIndex}`} className="text-lg text-gray-700">{option}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button 
              type="button" 
              onClick={calculateResult} 
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Ver Resultado
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-green-100 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">Resultado:</h3>
            <p className="text-lg text-gray-800">Tu puntuación es: <strong>{result.score} de {questions.length}</strong></p>
            <p className="text-lg text-gray-800">Porcentaje: <strong>{result.percentage}%</strong></p>
            <p className="text-xl font-bold text-gray-800">{result.message}</p>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800">Respuestas Correctas:</h4>
              <ul className="space-y-2 text-gray-800">
                {questions.map((question, index) => (
                  <li key={index} className="text-md">
                        <strong >{question.question}</strong>: <span className="font-bold">{question.correctAnswer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate('/comienzo')} 
            className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
          >
            Volver a Pruebas
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestDificil;
