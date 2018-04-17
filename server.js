const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

const MongoClient = require("mongodb").MongoClient;

const ObjectID = require("mongodb").ObjectID;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err){
    console.log(err);
    return;
  }

  const db = client.db("hotels");

  console.log("Connected to the database");

  server.post("/api/hotels", function(req, res){
    const hotelsCollection = db.collection("hotels");
    const hotelToSave = req.body;

    hotelsCollection.save(hotelToSave, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }

      console.log("Saved to database");
      res.status(201);
      // res.json(result);
      res.json(hotelToSave);
    })
  })

  server.get("/api/hotels", function(req, res){
    const hotelsCollection = db.collection("hotels");

    hotelsCollection.find().toArray(function(err, allHotels){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }

      res.json(allHotels);
    });
  })

  server.delete("/api/hotels", function(req, res){
    const hotelsCollection = db.collection("hotels");
    const filterObject = {};

    hotelsCollection.deleteMany(filterObject, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }

      res.status(204);
      res.send();
      console.log("Deleted all objects successfully");
    })
  })

  server.put("/api/hotels/:id", function(req, res){
  const hotelsCollection = db.collection("hotels");
  const objectID = ObjectID(req.params.id);
  const filterObject = { _id: objectID };
  const updatedData = req.body;

  hotelsCollection.update(filterObject, updatedData, function(err, result){
    if(err){
      console.log(err);
      res.status(500);
      res.send();
    }
    res.status(204);
    res.send();

    console.log("Updated the quote successfully");
  });
})

  server.listen(3000, function(){
    console.log("Listening on port 3000");
  });
})
