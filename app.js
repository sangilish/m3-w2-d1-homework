const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'statsdb';
const collectionName = 'uscensus';

async function sortRecordsByState() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB server.');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Sort records in ascending order by state
        const results = await collection.find().sort({ state: 1 }).toArray();

        if (results.length > 0) {
            console.log('Records sorted in ascending order by state:');
            results.forEach(result => {
                console.log(`City: ${result.city}, State: ${result.state}, Zip: ${result.zip}, Income: ${result.income}, Age: ${result.age}`);
            });
        } else {
            console.log('No records found.');
        }

    } finally {
        await client.close();
        console.log('Connection to MongoDB closed.');
    }
}

sortRecordsByState().catch(console.dir);