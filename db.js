const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://SongDB:SongDB@songdb.gwbv2.mongodb.net/?retryWrites=true&w=majority&appName=SongDB", {useNewURLParser: true});

module.exports = mongoose