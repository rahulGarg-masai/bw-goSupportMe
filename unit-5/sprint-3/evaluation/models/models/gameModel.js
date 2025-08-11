const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title:{type:String,required:true},
    genre:{type:String, $enum:['RPG','action','adventure','strategy','sports']},
    releaseDate: Date,
    publisher : {type: mongoose.Schema.Types.ObjectId,'Publisher' , required:true}
})

const GameModel = mongoose.model('Game',gameSchema);

module.exports = GameModel;