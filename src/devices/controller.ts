import _ from "lodash";
import { devices } from "../data/devices.js";
import type { Device } from "./types";

function storeReadings(device: Device): void {
  const { id, readings } = device;

  const readingsKeyedByTimestamp = _.keyBy(readings, "timestamp");

  const existingDevice = devices[id];

  if (existingDevice !== undefined) {
    devices[id] = {
      ...readingsKeyedByTimestamp,
      ...devices[id],
    };
  } else {
    devices[id] = readingsKeyedByTimestamp;
  }
}

export default { storeReadings };
