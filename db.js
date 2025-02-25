const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://sdev255:password255@SongDB.gwbv2.mongodb.net/?retryWrites=true&w=majority&appName=SongDB", {useNewURLParser: true});

module.exports = mongoose