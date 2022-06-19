# CRUD API

API which provides the abilities to Create, Update, Read and Delete data in an in-memory database.

### Requirements

- Nodejs v16.x
- npm v8.x

### Installation

1. Clone repository

```bash
git clone git@github.com:GolDOragon/simple-crud-api.git
```

or

```bash
git clone https://github.com/GolDOragon/simple-crud-api.git
```

2. Go into project folder

```bash
cd simple-crud-api
```

3. Change branch

```bash
git checkout scalable-crud-api
```

4. Install dependencies

```bash
npm ci
```

5. Create and fill in .env

```env
PORT=****
```

### Command syntax

0. Run application in production mode

```bash
npm run start:prod
```

1. Run application in development mode

```bash
npm run start:dev
```

2. Run application with multiple instances

```bash
npm run start:multi
```

3. Run tests

```bash
npm run test
```

### Endpoints

- API path `/users`:

  - **GET** `/` returns all users
  - **GET** `/${userId}` returns a user with corresponding `userId`
  - **POST** `/` creates record about new user and store it in database
  - **PUT** `/${userId}` updates existing user
  - **DELETE** `/${userId}` deletes existing user from database

- users are stored as `objects` that have the following properties:
  - `id` — unique identifier (`string`, `uuid`) generated on server side
  - `username` — user's name (`string`, **required**)
  - `age` — user's age (`number`, **required**)
  - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
