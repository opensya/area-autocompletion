import { eventHandler } from "h3";
import { getDatabase } from "../database";
import { AreaData } from "../types";

export default eventHandler(async (event) => {
  const { db, client } = await getDatabase();
  const collection = db.collection<AreaData>("area_data");
  const query = "dak";
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
});
