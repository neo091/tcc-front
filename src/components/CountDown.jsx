import { useState, useEffect, Fragment } from "react";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Función para calcular el tiempo restante
  function calculateTimeLeft() {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // La fecha ya pasó
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  // Actualizar el temporizador cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Limpieza del temporizador
  }, [targetDate]);

  // Lógica de renderizado condicional
  const renderCountdown = () => {
    if (timeLeft.days > 1) {
      // Mostrar solo días si falta más de 1 día
      return <>Faltan {timeLeft.days} días.</>;
    } else if (timeLeft.days === 1) {
      // Mostrar días y horas si queda exactamente 1 día
      return <>Faltan 1 día y {timeLeft.hours} horas.</>
    } else if (timeLeft.hours === 1) {
      // Mostrar días y horas si queda exactamente 1 día
      return (
        <>
          Faltan {timeLeft.hours} horas. {timeLeft.minutes} minutos y {timeLeft.seconds} segundos.
        </>
      );
    } else if (timeLeft.minutes > 0) {
      // Mostrar días y horas si queda exactamente 1 día
      return (
        <>
          Faltan {timeLeft.minutes} minutos y {timeLeft.seconds} segundos.
        </>
      );
    } else if (timeLeft.seconds > 1) {
      // Mostrar días y horas si queda exactamente 1 día
      return (
        <>
          Faltan {timeLeft.seconds} segundos.
        </>
      );
    } else {
      // Mostrar solo horas, minutos y segundos si queda menos de un día
      return (
        <span className="text-red-500">
          Se acabó
        </span>
      );
    }
  };


  return (
    <Fragment>
      {renderCountdown()}
    </Fragment>
  );
};

export default Countdown;