var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    filePath: { type: String, required: true },
    name: { type: String, required: true },
    time: { type: Number, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: String, required: true }
});

module.exports = mongoose.model('Tracks', schema);