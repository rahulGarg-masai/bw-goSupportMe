const express = require('express');
const GameModel = require('../models/models/gameModel');



const createGame = async (req,res) => {
    try {
        const {publisher} = req.body;
        if(!publisher){
            return res.status(400).json({msg:'publisher id not found'})
        }
        else {
            let game = await GameModel.create(req.body);
            return res.status(200).json({msg:'new game created',game});
        }
    } catch (error) {
        res.status(400).json({msg:'error adding new game',error})
        
    }
}

const getGame = async (req,res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({msg:'invalid game id'})
        }
        else {
            let game = await GameModel.findById(id).populate('publisher');
            return res.status(200).json({msg:'game retrieved',game});
        }
    } catch (error) {
        res.status(400).json({msg:'error fetching game',error})
        
    }
}

const updateGame = async (req,res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({msg:'invalid game id'})
        }
        else {
            let updatedGame = await GameModel.findByIdAndUpdate(
                id,
                req.body,
                {new:true}
            )
            return res.status(200).json({msg:'game updated',game:updatedGame});
        }
    } catch (error) {
        res.status(400).json({msg:'error updating game',error})
        
    }
}

const deleteGame = async (req,res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({msg:'invalid game id'})
        }
        else {
        await GameModel.findByIdAndDelete(id)
            return res.status(200).json({msg:'game deleted'});

        }
    } catch (error) {
        res.status(400).json({msg:'error deleting game',error})
        
    }
}

const getGames = async (req,res) => {
    try {
        let games = await GameModel.find().populate('publisher', 'name location');
            return res.status(200).json({msg:'games',games});
        
    } catch (error) {
        res.status(400).json({msg:'error deleting game',error})
        
    }
}

const getGameByPublisher = async (req,res) => {
    try {
        const {publisherId} = req.params;
        if(!publisherId){
            return res.status(400).json({msg:'invalid publisher id'})
        }
        else {
            let games = await GameModel.find({publisher: publisherId}).populate('publisher', 'name location');
            return res.status(200).json({msg:'games by publisher retrieved',games});
        }
    } catch (error) {
        res.status(400).json({msg:'error getting games by publisher',error})
        
    }
}

module.exports = {createGame,getGame,updateGame,deleteGame,getGames,getGameByPublisher}