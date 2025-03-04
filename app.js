const express = require("express");

var cors = require("cors");


const bodyParser = require('body-parser');
const jwt = require("jwt-simple");
const User = require("./models/users")

const app = express();
const Song = require("./models/songs");
app.use(cors());

app.use(express.json())
const router = express.Router();
const secret = "supersecret";

//Creating a new user
router.post("/user", async (req, res) =>{
  if (!req.body.username || !req.body.password){
    res.status(400).json({error: "Missing username or password"})
  }

  const newUser = await new User({
    username: req.body.username,
    password: req.body.password,
    status: req.body.status
  })
  try{
    await newUser.save()
    console.log(newUser)
    res.sendStatus(201)
  }
  catch(err){
    res.status(400).send(err)
  }
})

//Authenticate or Login
//Post Request
router.post("/auth", async (req, res) => {
  if(!req.body.username ||  !req.body.password){
    res.status(400).json({error: "Missing username or password"})
    return
  }
  //try to find a username in the database then see if it matches with the username or password.
  //await finding the user
  let user = await user.findOne({username : req.body.username}, function(err, user){
    
    //connection or server error
    if(!user){
      res.status(400).send(err)
    }
    else if (user){
      res.status(401).json({error: "Bad Username"})
    }
    //check to see if the users password matches the request
    else{
      if(user.password != req.body.password){
        res.status(401).json({error: "Bad Password"})
      }
      else{
        //create a token and send it back
        username2 = user.username
        const token = jwt.encode({username: user.username}.secret)
        const auth = 1

        // respond with token
        res.json({
          username2,
          token:token,
          auth:auth 
        })
      }
    }
  })
})

//check status with a valid token
router.get("/status", async(req, res) =>{
  if(!req.headers["x-auth"]){
    return res.status(401).json({error: "Missing X-Auth"})
  }

  const token = req.headers["x-auth"]
  try{
    const decoded = jwt.decode(token,secret)

    let users = User.find({}, "username status")
    res.json(users)
  }
  catch(ex){
    res.status(401).json({error: "invalid jwt program"})
  }
})

//grab all the songs in a database
router.get("/songs", async(req, res) => {
  try{
    const songs = await Song.find({})
    res.send(songs)
    console.log(songs)
  }
  catch (err){
    console.log(err);
  }
})

//Grab a single song
router.get("/songs/:id", async (req, res) => {
  try{
    const song = await Song.findById(req.params.id)
    res.json(song)
  }
  catch{
    res.status(400).send(err)
  }
})

router.post("/songs", async(req, res) => {
  try{
    const song = new Song(req.body)
    await song.save()
    res.status(201).json(song)
    console.log(song)
  }
  catch(err){
    res.status(400).send(err)
  }
})

router.put(":/id", async (req, res) =>{
  try{
    const song = req.body
    await Song.updateOne({_id: req.params.id}.song)
    console.log(song)
    res.sendStatus(204)
  }
  catch(err){
      res.status(400).send(err)
  }
})

router.delete("/songs/:id", async(req,res) =>{
  //method or function in mongoose/mongo to delete a single instane of a song or object
  try{
  const song = await Song.findById(req.params.id)
  console.log(song)
  Song.deleteOne ({_id: req.params.id})
  res.sendStatus()
  }
  catch(err){
    res.status(400).send(err)
  }
})


app.use("/api", router);
var port = process.env.PORT || 3000
app.listen(port);