import express, { type Application } from "express";
import DeviceRoutes from "./devices/routes.js";

const ExpressConfig = (): Application => {
  const app = express();
  return app;
};

const app = ExpressConfig();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/devices", DeviceRoutes);

app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
