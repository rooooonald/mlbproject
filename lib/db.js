import { MongoClient } from "mongodb";

export async function connectToDB() {
  const client = new MongoClient(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.krwlyqt.mongodb.net/?retryWrites=true&w=majority`
  );

  const connected = client.connect();

  return connected;
}
