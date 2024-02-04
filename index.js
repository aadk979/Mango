const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://Chatsy-secondary-database:1D5sRrV7aNtBtLJM@chatsy.tnisk30.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function addDocumentToCollection(collectionName, documentId, documentData) {
  try {
    await client.connect();

    const database = client.db("yourDatabaseName"); // Replace "yourDatabaseName" with your actual database name
    const collection = database.collection(collectionName);

    // Create the document to be inserted
    const dataToInsert = {
      _id: documentId,
      ...documentData,
      timestamp: new Date()
    };

    // Insert the document into the collection
    const result = await collection.insertOne(dataToInsert);
    console.log(`Inserted ${result.insertedCount} document into the collection.`);

  } finally {
    await client.close();
  }
}

async function retrieveDataFromCollection(collectionName) {
  try {
    await client.connect();

    const database = client.db("yourDatabaseName"); // Replace "yourDatabaseName" with your actual database name
    const collection = database.collection(collectionName);

    // Retrieve all documents from the collection
    const documents = await collection.find().toArray();

    console.log("Retrieved documents from the collection:");
    console.log(documents);

  } finally {
    await client.close();
  }
}

// Example usage
const collectionName = "yourCollectionName"; // Replace with your actual collection name
const documentId = "uniqueDocumentId"; // Replace with a unique document id
const documentData = {
  username: "exampleUser",
  message: "Hello, MongoDB!",
  // Additional data properties...
};

addDocumentToCollection(collectionName, documentId, documentData).catch(console.dir);

// Trigger the retrieval after 5 seconds
setTimeout(() => {
  retrieveDataFromCollection(collectionName).catch(console.dir);
}, 5000);

