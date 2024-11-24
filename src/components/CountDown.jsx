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

  const renderCountdown = () => {
    if (timeLeft.days > 1) {
      return <Fragment>Faltan {timeLeft.days} días.</Fragment>;
    }

    if (timeLeft.days === 1 && timeLeft.hours > 1) {
      return <Fragment>Faltan {timeLeft.days} días. {timeLeft.hours} horas.</Fragment>;
    }

    if (timeLeft.days <= 0 && timeLeft.hours >= 1) {
      return <Fragment>Faltan  {timeLeft.hours} horas. {timeLeft.minutes} minutos y {timeLeft.seconds} segundos.</Fragment>;
    }

    if (timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes >= 1) {
      return <Fragment>Faltan {timeLeft.minutes} minutos y {timeLeft.seconds} segundos.</Fragment>;
    }

    if (timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.seconds >= 1) {
      return <Fragment>Faltan {timeLeft.seconds} segundos.</Fragment>;
    }

    if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.seconds === 0) {
      return (
        <span className="text-red-500">
          Expiró!
        </span>
      )
    }
  };


  return renderCountdown()
};

export default Countdown;