# React Country Search Application

## Overview

This is a sophisticated React application featuring authentication, private routes, form handling, complex state management using useReducer, and integration with an external API for country search functionality.

## Features

- **Authentication System**: Sign up and login with form validation
- **Private Routes**: Protected routes accessible only to authenticated users
- **Country Search**: Integration with the external Countries API
- **Complex State Management**: Using useReducer for managing application state
- **Form Validation**: Comprehensive validation for all user inputs
- **Dark/Light Mode**: Theme toggle for user preference
- **Responsive Design**: Works well on desktop and mobile devices
- **Pagination Options**: Choose between traditional pagination or infinite scrolling

## Technologies Used

- React (with hooks)
- React Router for navigation
- Axios for API requests
- Context API for global state
- useReducer for complex state management
- CSS for styling

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Application Structure

- `/src/components/Auth`: Authentication components (Login, Signup)
- `/src/components/Countries`: Country search functionality
- `/src/components/Dashboard`: Main dashboard after login
- `/src/components/Layout`: Shared layout components like Navbar
- `/src/context`: Context providers for authentication and theme

## Usage

1. Sign up for a new account or log in with existing credentials
2. Navigate to the Countries page to search for countries
3. Use the theme toggle in the navbar to switch between light and dark mode
4. Try both pagination options in the country search

## API Information

The application uses the Countries API from api.first.org. No API key is required for this public API.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
