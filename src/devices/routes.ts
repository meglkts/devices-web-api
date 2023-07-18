import express from "express";
import _ from "lodash";
import DeviceController from "./controller.js";
import type { Device } from "./types.js";

const router = express.Router();

router.post("/", function (req, res) {
  const payload: Device = req.body;

  if (typeof payload.id !== "string") {
    res.status(400);
    res.send("Device id is required");
  } else if (_.isEmpty(payload.readings)) {
    res.status(400);
    res.send("Device readings are required");
  } else {
    DeviceController.storeReadings(payload);

    res.status(201);
    res.send();
  }
});

export default router;
