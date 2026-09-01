const mongoose = require('mongoose');

const uri = "mongodb://manja22nayaka_db_user:0i1fy6v0ClOnAxsh@ac-atfccek-shard-00-00.opmseml.mongodb.net:27017,ac-atfccek-shard-00-01.opmseml.mongodb.net:27017,ac-atfccek-shard-00-02.opmseml.mongodb.net:27017/?ssl=true&replicaSet=atlas-ns2213-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri).then(async () => {
    console.log("Connected to DB:", mongoose.connection.name);
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
    const count = await mongoose.connection.collection('users').countDocuments();
    console.log("Users count in this DB:", count);
    
    process.exit(0);
}).catch(console.error);
