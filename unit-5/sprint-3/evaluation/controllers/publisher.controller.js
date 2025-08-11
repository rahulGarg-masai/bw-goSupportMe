const express = require('express');
const PublisherModel = require('../models/models/publisherModel');

const newPublisher = async (req,res) => {
    try {
        let newPublisher = req.body;
        if(!newPublisher){
            return res.status(400).json({msg:'send correct data'});
        }
        else {
            await PublisherModel.create(newPublisher);
            return res.status(200).json({msg:'new publisher added',newPublisher});
        }
    } catch (error) {
        res.status(400).json({msg:'error adding new publisher',error})
    }
}

const getAllPublishers = async (req,res) => {
    try {
        let publishers = await PublisherModel.find();
        return res.status(200).json({msg:'publishers retrieved',publishers});
    } catch (error) {
        res.status(400).json({msg:'error getting all publishers',error})
   }
}

const getPublisher = async (req,res) => {
    try {
        let {id} = req.params;
        if(!id){
            return res.status(400).json({msg:'publisher not found'});
        }
        else {
            let publisher = await PublisherModel.findById(id);
            return res.status(200).json({msg:'publisher ',publisher});
        }
    } catch (error) {
        res.status(400).json({msg:'error getting publisher by its id',error})
        
    }
}

const updatePublisher = async (req,res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({msg:'publisher not found'});
        }
        else {
            let updatedPublisher = await PublisherModel.findByIdAndUpdate(
                id,
                req.body,
                {new:true}
            )
            return res.status(200).json({msg:'publisher updated',updatedPublisher})
        }
    } catch (error) {
        res.status(400).json({msg:'error updating publisher by its id',error})
        
    }
}

const deletePublisher = async (req,res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({msg:'publisher not found'});
        }
        else {
           await PublisherModel.findByIdAndDelete(id);
            
            return res.status(200).json({msg:'publisher deleted'})
        }
    } catch (error) {
        res.status(400).json({msg:'error deleting publisher',error})
        
    }
}

module.exports = {newPublisher,getAllPublishers,getPublisher,updatePublisher,deletePublisher};