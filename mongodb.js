const {MongoClient} =require('mongodb');

var dbConnect;
module.exports={
    connectDb:(cb)=>
    {
        MongoClient.connect('mongodb+srv://sivareddypuli1:SyrJXmDZfk3cfbyj@cluster0.ij9xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tlsInsecure=true')
        .then((client)=>
        {
            dbConnect=client.db();
            return cb();
        })
        .catch((err)=>
        {
        return cb(err);
        })
    },
    getDb:()=>dbConnect
}