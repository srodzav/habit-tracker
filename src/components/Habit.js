import React, { useEffect, useState } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';
import '../assets/styles/Habit.css';

function Habit({ title, text, date, category, streak, deadline, completed, onCheck, onRenew, onDelete }) {
  const [status, setStatus] = useState('secondary'); 
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const updateHabitStatus = () => {
      const now = new Date();
      const deadlineTime = new Date(deadline);
      const diff = deadlineTime - now;
  
      console.log("Debug: Tiempo restante (ms):", diff);
  
      if (completed) {
        setStatus("success"); // ✅ Si está completado, SIEMPRE VERDE
        return;
      }

      if (diff <= 0) {
        setStatus('secondary'); // Expirado (gris)
      } else if (diff <= 3600000) { // Menos de 1 hora
        setStatus('danger');
      } else if (diff <= 10800000) { // Menos de 3 horas
        setStatus('warning');
      } else {
        setStatus(completed ? 'success' : 'success'); // Verde si está completado
      }
    };
  
    updateHabitStatus();
    const interval = setInterval(updateHabitStatus, 1000); // Se actualiza cada segundo
  
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [deadline, completed]); // Se ejecuta cada vez que `deadline` o `completed` cambian  

  return (
    <Card bg={status} text="white" style={{ width: '100%' }}>

      <Card.Body>

        <div className="position-relative">

          <Card.Title className="text-center fs-2">
            <strong>{title}</strong>
          </Card.Title>

          <Badge className={`badge-${category} position-absolute top-0 end-0`}>
            {category}
          </Badge>

        </div>

        <Card.Text className="text-center fs-4">{text}</Card.Text>

        <Card.Text className="text-center fs-5">
          <strong>Streak:</strong> {streak} days{' '}
          {streak >= 10 ? '🏆' : streak >= 5 ? '🎉' : streak >= 3 ? '🔥' : ''}
        </Card.Text>

        <Card.Text>
          <strong>Time Remaining:</strong> {timeRemaining}
        </Card.Text>

        {status !== 'secondary' && (
          <Button variant="light" onClick={onCheck} className="me-2">
            Check <i className="bi bi-check-circle"></i>
          </Button>
        )}

        {status === 'secondary' && (
          <Button variant="light" onClick={onRenew} className="me-2">
            Renew <i className="bi bi-arrow-clockwise"></i>
          </Button>
        )}

        <Button variant="danger" onClick={onDelete} className="me-2">
          Delete <i className="bi bi-trash-fill"></i>
        </Button>

      </Card.Body>

    </Card>
  );
}

export default Habit;