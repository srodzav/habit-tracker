import React, { useEffect, useState } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';
import '../assets/styles/Habit.css';

function Habit({ title, text, date, category, streak, deadline, completed, onCheck, onRenew, onDelete }) {
  const [status, setStatus] = useState('secondary'); 

  useEffect(() => {
    const now = new Date();
    const deadlineTime = new Date(deadline);

    if (completed) {
      setStatus('success');
    } else if (deadlineTime - now <= 3600000) {
      // Less than 1 hour
      setStatus('danger');
    } else if (deadlineTime - now <= 14400000) {
      // Less than 4 hours
      setStatus('warning');
    } else if (deadlineTime > now) {
      // Within the allowed time
      setStatus('secondary');
    }
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