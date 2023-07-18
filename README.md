# Device Readings

## Starting the Server

Install dependencies

`npm install`

Transpile

`npm run build`

Start API server

`npm run start`

**Note: you can optionally specify a custom port as environment variable PORT. Example:
`PORT=3001 npm run start`

<br>

*Run in watch mode for easier development*

Transpile

`npm run build:watch`

Start API server

`npm run start:dev`

<br>

## Available Endpoints for Readings

### Store readings

To store device readings, make a POST request to the `/devices` endpoint with the required data defined below.

`POST /devices`

**Request payload**

Required fields:
- id - uuid
- readings - array
  - timestamp - ISO-8061
  - count - integer

JSON
```
{ 
  "id": UUID,
  "readings": [
    { 
      "timestamp": ISO-8061, 
      "count": Integer
    }, 
  ] 
}
```
Example
```
{ 
  "id": "36d5658a-6908-479e-887e-a949ec199272", 
  "readings": [
    { 
      "timestamp": "2021-09-29T16:08:15+01:00", 
      "count": 2 
    }, 
    { 
      "timestamp": "2021-09-29T16:09:15+01:00", 
      "count": 15 
    } 
  ] 
}
```
### Response

**Success**

Readings are stored successfully

*201*

<br>

**Server Error**

An issue on our end. Sorry!

*500*

<br>

**Bad Request**

*400*

Malformed request payload, missing required fields, incorrect field value types

<br>

### Get Readings Data

Fetch specific data points for a given device by id.

**Currently supported:**
- `latest_timestamp` - request the timestamp of latest reading for given device
- `cumulative_count` - request the total count of all readings for given device

<br>


**Success**

*200*

`GET /devices/:id?fields=latest_timestamp`

Payload
```
{ 
  "latest_timestamp": ISO-8061 
}
```
Example:
```
{ 
  "latest_timestamp": "2021-09-29T16:08:15+01:00" 
}
```
<br>

`GET /devices/:id?fields=cumulative_count`

Payload
```
{ 
  "cumulative_count": integer
}
```
Example:
```
{ 
  "cumulative_count": 5
}
```

<br>

**Server Error**

An issue on our end. Sorry!

*500*

<br>

**Not Found**

*404*

The device by id does not exist

<br>

**Bad Request**

*400*

Malformed request url, missing or unsupported parameters

<br>

## Project Structure

This is a Node.js / TypeScript project. The main app code lives within the `src/` directory and is compiled to a `dist/` directory when built. There is a top level `tests/` directory that would house unit and integration tests.

The entrypoint for the API server is the top level file `server.js`. This initiates an `Express` server and attaches the requisite `device` routes. 

There is a top level `devices/` folder that contains the domain-specific components. You will find the `DeviceRoutes` with the required POST and GET routes, `DeviceController` that supports the basic functionality of writing and reading data, and any defined types.

The in memory data store is defined in `/data/devices.ts` directory.

<br>

## What next?

If allotted more time, these are some of the first areas for enhancement and improvement:

**More robust domain directory**
- Define a `device` model with support for validating fields
- Move more of the logic from the controller to the model or a service class
- Add more error handling

**Testing**

I focused on application code for the limited timeframe. I would have incorporated more TDD practices if time constraint was not present. I did more "testing" in Postman to ensure routes functioned as desired with the time limit.

- Add unit tests for business logic in managing `device` resources. Cases to cover:
  - Creating new device record
  - Updating existing device record
  - Handling each new and duplicate readings
  - Assert latest_timestamp data
  - Assert cumulative count data
- Add integration tests for API and routes. Cover both successful and error cases.

**Error handling**
- Handle more error cases in the routes, specifically around malformed requests

**Enhance GET request for reading data**
- Support any combintation of requested fields in the query params, better define typings for allowed fields