Simple CRUD API

API which provides the abilities to Create, Update, Read and Delete data in an in-memory database.

### Requirements

- Nodejs v16.x
- npm v8.x

### Installation

1. Clone repository

```bash
git clone https://github.com/GolDOragon/simple-crud-api.git
```

2. Go into project folder

```bash
cd simple-crud-api
```

3. Change branch

```bash
git checkout crud-api
```

4. Install dependencies

```bash
npm install
```

5. Fill in .env

```js
PORT=***
```

### Command syntax

1. Run server

```bash
npm run start:dev
```

2. Run tests

```bash
npm run test
```

### Endpoints

- API path `/person`:

  - **GET** `/person` or `/person/${personId}` return all persons or person with corresponding `personId`
  - **POST** `/person` creates record about new person and store it in database
  - **PUT** `/person/${personId}` updates record about existing person
  - **DELETE** `/person/${personId}` deletes record about existing person from database

- Persons are stored as `objects` that have following properties:
  - `id` — unique identifier (`string`, `uuid`) generated on server side
  - `name` — person's name (`string`, **required**)
  - `age` — person's age (`number`, **required**)
  - `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
