import React, { useEffect, useState } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';
import '../assets/styles/Habit.css';

function Habit({ title, text, date, category, streak, deadline, completed, onCheck, onRenew, onDelete }) {
  const [status, setStatus] = useState('secondary'); 
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const deadlineTime = new Date(deadline);
      const diff = deadlineTime - now;

      if (diff <= 0) {
        setTimeRemaining('Expired');
        setStatus('secondary');
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${hours}h ${minutes}m remaining`);

        if (completed) {
          setStatus('success');
        } else if (diff <= 3600000) {
          setStatus('danger');
        } else if (diff <= 14400000) {
          setStatus('warning');
        } else {
          setStatus('secondary');
        }
      }
    };
    calculateTimeRemaining();

    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [deadline, completed]);

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

        {/* <Card.Text>
          <strong>Start Date:</strong> {new Date(date).toLocaleString()}
        </Card.Text> */}

        {/* <Card.Text>
          <strong>Deadline:</strong> {new Date(deadline).toLocaleString()}
        </Card.Text> */}

        {!completed && (
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