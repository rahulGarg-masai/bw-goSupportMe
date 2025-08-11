const express = require('express');
const { createGame, getGame, updateGame, deleteGame, getGames } = require('../controllers/game.controller');

const GameRouter = express.Router();

GameRouter.post('/api/games',createGame)

GameRouter.get('/api/games/:id',getGame);

GameRouter.put('/api/games/:id',updateGame)

GameRouter.delete('/api/games/:id',deleteGame);

GameRouter.get('/api/games',getGames)

module.exports = GameRouter;