import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";

import "dotenv/config";
// import { schema } from "./schema/schema.js";
import { connectDB } from "./config/db.js";
import { mongoSchema } from "./schema/mongoSchema.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    // schema: schema, // static data
    schema: mongoSchema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
