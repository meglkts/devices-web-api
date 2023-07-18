import _ from "lodash";
import { devices } from "../data/devices.js";
import type { Device, ReadingFieldOptions, ReadingFields } from "./types";

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

function getReadingData(
  id: string,
  fields: ReadingFieldOptions
): ReadingFields | null {
  const device = devices[id];

  if (device === undefined) {
    return null;
  }

  if (fields === "latest_timestamp") {
    return {
      latest_timestamp: _.max(_.keys(device)),
    };
  }

  if (fields === "cumulative_count") {
    return {
      cumulative_count: _.reduce(
        _.values(device),
        (prev, curr) => {
          return (prev += curr.count);
        },
        0
      ),
    };
  }

  return null;
}

export default { storeReadings, getReadingData };
