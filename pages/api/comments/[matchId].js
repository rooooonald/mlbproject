import { connectToDB } from "@/lib/db";

export default async function handler(req, res) {
  let client;
  try {
    client = await connectToDB();
  } catch (err) {
    res.status(500).json({ message: "CANNOT CONNECT TO DATABASE" });
    return;
  }

  const db = client.db("comments");

  if (req.method === "POST") {
    const commentBody = req.body;

    if (
      !commentBody ||
      !commentBody.name ||
      !commentBody.comment ||
      commentBody.name.trim().length === 0 ||
      commentBody.comment.trim().length === 0
    ) {
      res.status(422).json({ message: "PLEASE FILL IN ALL THE FIELDS" });
      return;
    }

    try {
      const result = await db
        .collection(req.query.matchId)
        .insertOne(commentBody);
      commentBody.id = result.insertedId;
    } catch (err) {
      client.close();
      res.status(500).json({ message: "CANNOT STORE COMMENTS IN DATABASE" });
      return;
    }
    client.close();
    res.status(201).json({ message: "COMMENT POSTED SUCCESSFULLY" });
  } else {
    let comments;

    try {
      comments = await db
        .collection(req.query.matchId)
        .find()
        .sort({ publishedTime: -1 })
        .toArray();

      res.status(200).json({ comments: comments });
    } catch (err) {
      res.status(500).json({ message: "CANNOT RETRIEVE COMMENTS" });
      return;
    }
    client.close();
  }
}
