# Simple CRUD API

_So simple yet..._

## General:

To start the application, please make sure you have [Git](https://git-scm.com) and [Node.js](https://nodejs.org) installed on your machine. Then, follow these steps:

1. Clone repository: `git clone https://github.com/GoodValts/CRUD-API.git`
1. Navigate to the project directory: `cd CRUD-API`
1. Switch to 'develop' branch: `git checkout develop`
1. Try to send requests

#### Examples:

```
curl -X GET http://localhost:3001/api/users/
```

```
curl -X GET http://localhost:3001/api/users/{id}
```

```
curl -X POST http://localhost:3001/api/users/ \
-H "Content-Type: application/json" \
-d '{"username": "Jesus", "age": 2, "hobbies": ["traveling"]}'
```

```
curl -X PUT http://localhost:3001/api/users/{id} \
-H "Content-Type: application/json" \
-d '{"username": "Jesus", "age": 30, "hobbies": ["traveling", "talking"]}'
```

```
curl -X DELETE http://localhost:3001/api/users/{id}
```

## Commands:

- `start:dev` - starts application in developing mode;
- `start:prod` - starts application in production mode;
- `start:multi` - starts application with a load balancer (using the Node.js Cluster API);
- `npm run test` - runs tests using Jest;
- `npm run test:coverage` - runs tests and collect coverage;
- `npm run lint` - runs ESLint to check the code for potential issues and adherence to coding style rules;
- `npm run fix` - uses Prettier to automatically format the code and make it consistent.
