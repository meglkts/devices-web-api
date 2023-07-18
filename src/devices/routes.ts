import express from "express";
import _ from "lodash";
import DeviceController from "./controller.js";
import type { Device, ReadingFieldOptions } from "./types.js";

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

router.get("/:id", function (req, res) {
  const id = req.params.id;
  const fields = req.query.fields as ReadingFieldOptions;

  if (!["latest_timestamp", "cumulative_count"].includes(fields)) {
    res.status(400);
    res.send("Must provide required parameters");
  }

  const payload = DeviceController.getReadingData(id, fields);

  if (_.isEmpty(payload)) {
    res.status(404);
    res.send("Device not found");
  } else {
    res.status(200);
    res.send(payload);
  }
});

export default router;
