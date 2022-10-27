import "express-async-errors"; // I use this package instead of the so many (try & catch)
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./router";
import errorHundler from "./middlewares/error-hundler";
import notFound from "./middlewares/not-found";
import dotenv from "dotenv";
dotenv.config();
const app: express.Application = express();

// main middlewares
app.use(cors());
// I prefere express.json() instead of body-parser
app.use(express.json());

const address: string = "0.0.0.0:3000";

// routers
app.use("/", router);
// home page
app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

// Not found middleware
app.use(notFound);
// error hundler
app.use(errorHundler);

// run server
app.listen(parseInt(process.env.PORT as string) as number, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
