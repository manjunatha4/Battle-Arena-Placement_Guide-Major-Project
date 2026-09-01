const mongoose = require('mongoose');

const uri = "mongodb://manja22nayaka_db_user:0i1fy6v0ClOnAxsh@ac-atfccek-shard-00-00.opmseml.mongodb.net:27017,ac-atfccek-shard-00-01.opmseml.mongodb.net:27017,ac-atfccek-shard-00-02.opmseml.mongodb.net:27017/?ssl=true&replicaSet=atlas-ns2213-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri).then(async () => {
    const admin = mongoose.connection.db.admin();
    const dbs = await admin.listDatabases();
    
    console.log("ALL DATABASES IN CLUSTER:");
    for (const dbInfo of dbs.databases) {
        console.log(`\n--- DB: ${dbInfo.name} ---`);
        const db = mongoose.connection.client.db(dbInfo.name);
        const collections = await db.listCollections().toArray();
        for (const coll of collections) {
            const count = await db.collection(coll.name).countDocuments();
            if (count > 0 && coll.name !== 'system.views') {
                console.log(` Collection: ${coll.name} - ${count} docs`);
                if (coll.name === 'users') {
                    const docs = await db.collection(coll.name).find({}).toArray();
                    console.log(docs);
                }
            }
        }
    }
    process.exit(0);
}).catch(console.error);
