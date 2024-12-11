# Habit Tracker

This is a web application that helps users build and maintain positive habits through a simple and intuitive interface. Users can add habits, set deadlines, track their progress with streaks, and receive motivational emojis when reaching milestones.

---

## Features

- **Add Habits**: Users can add new habits with a name, description, category, start date, and a 24-hour deadline.
- **Track Streaks**: Habits include a streak counter, which rewards users with emojis for maintaining progress:
  - 🔥 for 3+ days.
  - 🎉 for 5+ days.
  - 🏆 for 10+ days.
- **Deadline Alerts**: Visual feedback based on time remaining:
  - **Red**: Less than 1 hour left.
  - **Yellow**: Less than 4 hours left.
  - **Gray**: Deadline missed.
- **Category Badges**: Habits are labeled with categories (e.g., Fitness, Work, Personal) for better organization.
- **Renew or Delete**: Users can reset a habit’s deadline or remove it entirely.

## Technologies Used

**React.js**
  - Handles component-based architecture and state management.
  - Built-in hooks (```useState```, ```useEffect```) for dynamic behavior.

**React-Bootstrap**
  - Styled components such as cards, buttons, forms, and grids for responsive design.
  - Enables quick and consistent UI development.

**Bootstrap Icons**
  - Provides intuitive icons for actions like "Check," "Renew," and "Delete."

# Deployment Instructions

**Development Environment**

  Tested locally with Node.js and React development tools.

1. Clone the repository:
   ```
    git clone https://github.com/sebastianrdz/habit-tracker.git
    cd habit-tracker
   ```

2. Install dependencies:
  ```
  npm install
  ```

3. Start the development server:
```
npm start
```

4. Build for production:
```
npm run build
```

## Usage

  1. Visit **habittracker.sebastianrdz.com**.
  2. Add a habit by filling out the form with:
  - **Name**: Enter the habit name (e.g., "Read")
  - **Description**: Provide a brief description (e.g., "Read 10 pages daily").
- **Category**: Choose a category such as Fitness, Work, or Personal.
- **Start Date**: Select the start date and time for the habit.
  3. Track your progress:
  - Check off completed habits daily.
  - View streak progress with motivational emojis.
  - Renew habits or delete them as needed.

## Notes

  - All habits and progress are saved in the browser’s local storage.
- Dark mode is enabled by default for an immersive user experience.
- Use the app to build lasting positive habits and reach your goals!

## Author

**Sebastián Rodríguez**
- [LinkedIn](https://www.linkedin.com/in/sebastian-rodriguez-zavala/)
- [Web](https://sebastianrdz.com)
- [Email](mailto:contact@sebastianrdz.com)

---

## License

This project is for personal use and is not licensed for commercial distribution.
