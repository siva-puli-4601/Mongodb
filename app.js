const express=require('express');
const app=express();
app.use(express.json());
const {connectDb, getDb} = require('./mongodb');
const { ObjectId } = require('mongodb');
var db;
connectDb((err)=>
{
    if(!err)
    {
        app.listen(3030,()=>{
            console.log("listening port 3030");
        });
        db=getDb();
    }
    else
    {
        console.log(err)
    }
})

app.get("/books",(req,res)=>
{
    const data=db.collection("books")
    .find({})
    .sort({name:1})
    .toArray()
    .then((data)=>{
        res.json(data);
 
    })
    .catch((err)=>
    {
        res.status(500).send(err);
    })
    
})

app.get("/books/:id",(req,res)=>
{
    const id=req.params.id;
    if(ObjectId.isValid(id))
    {

    db.collection("books")
    .findOne({_id:new ObjectId(id)})
    .then((data)=>
     {
        res.json(data)
     })
     .catch((err)=>
      {
        res.status(500).send(err);
      })
    }
    else
    {
        res.status(400).send("Invalid ID");
    }
})

app.post("/addbook",(req,res)=>
{
  const book =req.body;
  db.createCollection("books");
  db.collection("books").insertOne(book)
  .then((data)=>
   {
    res.json(data);
   })
   .catch((err)=>
   {
    res.status(500).send(err);
   })
})

app.delete("/books/:id",(req,res)=>
    {
        const id=req.params.id;
        if(ObjectId.isValid(id))
        {
    
        db.collection("books")
        .deleteOne({_id:new ObjectId(id)})
        .then((data)=>
         {
            res.json(data)
         })
         .catch((err)=>
          {
            res.status(500).send(err);
          })
        }
        else
        {
            res.status(400).send("Invalid ID");
        }
    })
