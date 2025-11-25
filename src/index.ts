import "dotenv/config";
import { getDatabase } from "./db_client";
import { AreaData } from "./types";

export default async function search(query: string) {
  const { db, client } = await getDatabase();
  const collection = db.collection<AreaData>("area_data");

  const results = await collection
    .aggregate([
      {
        $match: { name: { $regex: query, $options: "i" } },
      },
      {
        $lookup: {
          from: "area_data",
          localField: "parent",
          foreignField: "code",
          as: "parent_doc", // résultat mis dans ce tableau
        },
      },
      {
        $addFields: {
          _parent: { $arrayElemAt: ["$parent_doc", 0] }, // récupérer un seul parent
        },
      },
      { $project: { parent_doc: 0 } }, // supprimer le tableau temporaire
    ])
    .toArray();

  await client.close();

  return results;
}
