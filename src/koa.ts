import "dotenv/config";

import Koa from "koa";
import Router from "koa-router";

import { getDatabase } from "./db_client";
import { AreaData } from "./types";

// async function bootstrap() {
const app = new Koa();
const router = new Router();

router.get("/", async (ctx) => {
  const { db, client } = await getDatabase();
  const collection = db.collection<AreaData>("area_data");
  const query = ctx.query.query as string;

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

  ctx.body = results;
});

app.use(router.routes());
app.use(router.allowedMethods());

//   // Lancer le serveur
//   const PORT = 3000;
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }

// bootstrap();

export default app;
