const { MongoClient } = require("mongodb");


async function listDatabases(client){

    const db = client.db("sample_mflix");
    const collection = db.collection("contacts");

    const documents = await collection.find().toArray();
    console.log("Documents:", documents);

    // databasesList = await client.db().admin().listDatabases();
 
    // console.log("Databases:");
    // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://hoskinsbe:Queretaro22$!@cluster0.9wyhj.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
