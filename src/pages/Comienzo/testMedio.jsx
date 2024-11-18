import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TestMedio = () => {
  const navigate = useNavigate();
  // Estado para las respuestas del usuario
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  // Las preguntas y opciones
  const questions = [
    {
      question: "Complete the sentence - 'I have been ___ here for two hours.'",
      options: ["since", "for", "during", "by"],
      correctAnswer: "for",
    },
    {
      question: "What is the past form of 'go'?",
      options: ["goes", "went", "gone", "going"],
      correctAnswer: "went",
    },
    {
      question: "Choose the correct sentence:",
      options: ["She can speaks English.", "She can speaking English.", "She can speak English.", "She speaks can English."],
      correctAnswer: "She can speak English.",
    },
    {
      question: "Which one is the correct negative form of the sentence 'He likes apples'?",
      options: ["He doesn't likes apples.", "He doesn't like apples.", "He don't like apples.", "He doesn't apple likes."],
      correctAnswer: "He doesn't like apples.",
    },
    {
      question: "What is the opposite of 'happy'?",
      options: ["sad", "angry", "tired", "hungry"],
      correctAnswer: "sad",
    },
    {
      question: "Complete the sentence: 'I ___ to the store yesterday.'",
      options: ["went", "go", "will go", "going"],
      correctAnswer: "went",
    },
    {
      question: "Which is the correct sentence?",
      options: ["She is better than me", "She better than I", "She is better than I am", "She is than me better"],
      correctAnswer: "She is better than I am",
    },
    {
      question: "Choose the correct question form: '___ you like to travel?'",
      options: ["Do", "Does", "Did", "Are"],
      correctAnswer: "Do",
    },
    {
      question: "Complete the sentence: 'If I ___ a car, I would drive to work.'",
      options: ["have", "will have", "had", "having"],
      correctAnswer: "had",
    },
    {
      question: "What is the past form of 'begin'?",
      options: ["began", "begin", "begun", "begins"],
      correctAnswer: "began",
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

    }else if (percentage >=30) {
        message = 'Necesitas mas practica aun!!';
        
    } else {
      message = 'Falta mejorar bastante, pero con la practica lo lograras!!';
    }
    setResult({ score, percentage, message });
  };
  
  return (
    <div className="min-h-screen bg-dark-blue flex items-center justify-center p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Prueba de Nivel Medio</h2>
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

export default TestMedio;
