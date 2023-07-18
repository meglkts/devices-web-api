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

