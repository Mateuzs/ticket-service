# ticket-service

A simple Node.js REST service for handling lottery tickets requests. Responsible for:

- creating new tickets
- verifying ticket status
- amending ticket
- returning single ticket
- returning a list of tickets

## Setup

In order to run this project locally, download the git repository, then in the project folder:

install dependencies with yarn package manager:

```
yarn
```

run the app locally:

```
yarn start
```

The app will run on port 3000.

## Testing

in order to run tests, use commands below:

Unit Tests:

```
yarn test:unit
```

Coverage:

```
yarn test:coverage
```

E2E api tests:

```
yarn test:api
```

## Building

If you want to check the production build, run the command:

```
yarn build
```

After script finishes, run the app from production build:

```
yarn start:prod
```

## API

The ticket-microsevice provides following endpoints:

### Creation of ticket

```
POST http://localhost:3000/ticket
```

As a result the id of newly created ticket is returned.

Success response example:

```
{
    "id": 0
}
```

### Get a ticket

```
GET http://localhost:3000/ticket/:id
```

As a result the ticket is returned if exists, error otherwise.

Success response example:

```
{
    "id": 0,
    "numbers": [
        [
            2,
            1,
            0
        ],
        [
            0,
            2,
            0
        ],
        [
            2,
            0,
            0
        ],
        [
            1,
            0,
            1
        ],
        [
            0,
            1,
            0
        ]
    ],
    "status": null,
    "verified": false
}
```

Error response example:

```
{
    "code": 404,
    "msg": "ticket does not exist for provided id"
}
```

### Get a ticket list

```
GET http://localhost:3000/ticket
```

As a result the ticket list is returned if tickets exist, empty list otherwise. Tickets are sorted by status. Null values (not verified tickets) land at the end of the list.

Success response example:

```
[
  {
    "id": 0,
    "numbers": [
        [
            2,
            1,
            0
        ],
        [
            0,
            2,
            0
        ],
        [
            2,
            0,
            0
        ],
        [
            1,
            0,
            1
        ],
        [
            0,
            1,
            0
        ]
    ],
    "status": null,
    "verified": false
  }
]
```

Empty list response example:

```
   []
```

### Verify Ticket

```
PUT http://localhost:3000/status/:id
```

As a result the ticket status is returned and ticket updated, if ticket exists, error otherwise.

Success response example:

```
{
    "status": 0
}
```

Error response example:

```
{
    "code": 404,
    "msg": "ticket does not exist for provided id"
}
```

### Amend Ticket

```
PUT http://localhost:3000/ticket/:id
```

Amend ticket line numbers. As a result, the ticket is updated with new numbers.
200 is returned as successful operation confirmation, error otherwise. Ticket can be amended only if not verified.

Success response example:

```
OK
```

Error response example:

```
{
    "code": 403,
    "msg": "ticket is already verified"
}
```

### Params validation

If for any endpoint which requires id as a parameter, a wrong value is provided, the following error will occur as a response result:

Error response example:

```
{
    "code": 400,
    "msg": "invalid id"
}
```
