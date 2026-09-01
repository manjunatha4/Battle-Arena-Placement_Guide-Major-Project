const mongoose = require('mongoose');

const uri = "mongodb://manja22nayaka_db_user:0i1fy6v0ClOnAxsh@ac-atfccek-shard-00-00.opmseml.mongodb.net:27017,ac-atfccek-shard-00-01.opmseml.mongodb.net:27017,ac-atfccek-shard-00-02.opmseml.mongodb.net:27017/?ssl=true&replicaSet=atlas-ns2213-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri).then(async () => {
    console.log("Connected to DB:", mongoose.connection.name);
    
    const UserSchema = new mongoose.Schema({ name: String, email: String });
    const User = mongoose.model('User', UserSchema);

    await User.create({ name: 'Agent Test', email: 'agent@test.com' });
    console.log("Successfully inserted a user into the DB!");
    
    process.exit(0);
}).catch(console.error);
