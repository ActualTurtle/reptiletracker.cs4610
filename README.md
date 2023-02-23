# reptiletracker.cs4610

## Setup

Copy contents of `.env.example` to a new file `.env`

Then make sure to run: 

```
yarn
```

or 

```
npm install
```
Then,

```
yarn db:migrate
```
or
```
npm run db:migrate
```


## To run development server:
```
yarn dev
```
or 
```
npm run 
```

## To test the server using postman:

1. Load the provided collection and environment into Postman.
1. Ensure that the variable "jwt_token" is setup in the current environment. If it is not, please do so. Authentication will always fail without it.
1. Create a user using the "Create User" request.
1. Run any other the other requests that your heart desires.

> Should the jwt token expire, run either the "Sign into account" or "Create User" requests. The postman project will use the most recent jwt generated from either of those requests.
