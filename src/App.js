import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Habit from './components/Habit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/styles/App.css';
import './assets/styles/Habit.css'; 

function formatToLocalDateTime(date) {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000); // Adjust for timezone offset
  return localDate.toISOString().slice(0, 16); // Format for datetime-local
}  

function App() {

  const [habits, setHabits] = useState(() => {
    // Load habits from localStorage or initialize with an empty array
    const storedHabits = localStorage.getItem('habits');
    return storedHabits ? JSON.parse(storedHabits) : [];
  });

  // Dark mode by default
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
    document.body.classList.add('dark-mode');
  }, [habits]);

  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    startDate: formatToLocalDateTime(new Date()), // Local date and time for input
    deadline: '',
    category: 'General',
  });

  const handleChange = (e) => {
    setNewHabit({ ...newHabit, [e.target.name]: e.target.value });
  };

  const handleAddHabit = (e) => {
    e.preventDefault();

    const deadline = new Date(newHabit.startDate); // Start from the habit's startDate
    deadline.setHours(deadline.getHours() + 24);

    setHabits([
      ...habits,
      { ...newHabit, 
        streak: 0, 
        completed: false, 
        lastChecked: null,
        deadline: formatToLocalDateTime(deadline) 
      },
    ]);
    setNewHabit({
      name: '',
      description: '',
      startDate: formatToLocalDateTime(new Date()), // Reset startDate with the current time
      deadline: '',
      category: "General",
    });
  };

  const handleCheckHabit = (index) => {
    const updatedHabits = [...habits];
    const now = new Date();
    
    const lastCheckedDate = updatedHabits[index].lastChecked
      ? new Date(updatedHabits[index].lastChecked).toDateString()
      : null;
    const currentDate = now.toDateString();
  
    if (lastCheckedDate !== currentDate) {
      updatedHabits[index].completed = true;
      updatedHabits[index].streak += 1; // Incrementa la racha
      updatedHabits[index].lastChecked = now.toISOString(); // Registra el nuevo Check
    }
  
    setHabits(updatedHabits);
  };

  const handleRenewHabit = (index) => {
    const updatedHabits = [...habits];
    const now = new Date();
    const newDeadline = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 horas desde ahora
  
    updatedHabits[index].deadline = newDeadline.toISOString();
    updatedHabits[index].completed = false;
    updatedHabits[index].lastChecked = null; // Permite hacer Check nuevamente al día siguiente
  
    setHabits(updatedHabits);
  };

  const handleDeleteHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
  };

  return (
    <Container className="p-4">
      <h1 className="text-center mb-4"> <strong>Habit Tracker</strong> </h1>

      {/* Form to add new habits */}
      <Form onSubmit={handleAddHabit} className="mb-4">
        <Row>
          <Col md={3} className="mb-2">
            <Form.Group controlId="formHabitName">
              <Form.Label>Habit Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="E.g., Read"
                value={newHabit.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3} className="mb-2">
            <Form.Group controlId="formHabitDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="E.g., Read 10 pages daily"
                maxLength={30}
                value={newHabit.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3} className="mb-2">
            <Form.Group controlId="formHabitCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={newHabit.category}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Fitness">Fitness</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3} className="mb-2">
            <Form.Group controlId="formHabitStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                value={newHabit.startDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Add Habit <i className="bi bi-plus-circle"></i>
        </Button>
      </Form>

      {/* List of habits */}
      <Row>
        {habits.map((habit, index) => (
          <Col md={4} key={index} className="mb-4">
            <Habit
              title={habit.name}
              text={habit.description}
              date={habit.startDate}
              category={habit.category}
              streak={habit.streak}
              deadline={habit.deadline}
              completed={habit.completed}
              onCheck={() => handleCheckHabit(index)}
              onRenew={() => handleRenewHabit(index)}
              onDelete={() => handleDeleteHabit(index)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;