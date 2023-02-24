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
1. Make the current environment be "New Environment", which is the name given to the provided environment. Super original, right?
1. Ensure that the variable "jwt_token" is setup in the current environment. If it is not, please do so. Authentication will always fail without it.
1. Create a user using the "Create User" request.
1. Run any of the other requests that your heart desires.

> The jwt token will expire after 10 minutes. Should the jwt token expire, run the "Sign into account" to get a new one for the same user.

> The postman project will use the most recent jwt generated from either of those requests. If you would like to create a new user, edit the body of the "Create User" request to be unique. You can then sign into any user by editting the body of the "Sign into account" request to match a user's information.
