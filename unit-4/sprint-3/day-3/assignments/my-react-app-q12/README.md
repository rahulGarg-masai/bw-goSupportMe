# MovieHub - React Redux Movie Application

MovieHub is a full-featured movie database application built with React, Redux, and Chakra UI. It allows users to browse popular movies, search for specific titles, maintain a watchlist, and book movie tickets.

## Features

- **Movie Browsing**: View popular movies with detailed information
- **Search & Filtering**: Search for movies by title and filter by genre, year, and rating
- **User Authentication**: Register and login functionality with secure token-based authentication
- **Watchlist Management**: Add/remove movies to personal watchlist
- **Ticket Booking**: Book movie tickets for available screenings
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop

## Technologies Used

- **React 18+**: Modern React with functional components and hooks
- **Redux**: State management with Redux Thunk for async actions
- **Chakra UI**: Component library for sleek, accessible UI
- **React Router**: For navigation and route protection
- **Axios**: For API requests to TMDB

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn package manager
- TMDB API key (get it from [https://www.themoviedb.org/](https://www.themoviedb.org/))

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── api/               # API service files
├── components/        # React components
│   ├── Auth/          # Authentication components
│   ├── Booking/       # Ticket booking components
│   ├── Home/          # Home page components
│   ├── Layout/        # Layout components (navbar, etc.)
│   ├── Movies/        # Movie-related components
│   └── Watchlist/     # Watchlist components
├── redux/             # Redux store, actions, reducers
│   ├── actions/       # Action creators
│   └── reducers/      # State reducers
├── App.jsx           # Main app component with routes
└── main.jsx          # Entry point
```

## API Integration

The application uses The Movie Database (TMDB) API for fetching movie data. You'll need to register for an API key at [https://www.themoviedb.org/](https://www.themoviedb.org/) and add it to your environment variables.

## Authentication

For demonstration purposes, this application uses a mock authentication system with localStorage. In a production environment, you should implement a proper backend authentication solution.
