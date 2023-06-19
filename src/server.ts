import express, { type Application } from "express";

const ExpressConfig = (): Application => {
  const app = express();
  return app;
};

const app = ExpressConfig();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
