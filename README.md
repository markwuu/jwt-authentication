# JSON Web Token Authentication Example
## Installation

### Download dependencies

1. ```npm install dotenv express jsonwebtoken```

2. ```npm install --save-dev nodemon```

### Save ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET in an .env file by running

3. ```node```

4. ```require('crypto').randomBytes(64).toString('hex')```

### Start servers:

5. ```npm run devStart```
6. ```npm run devStartAuth```



## API Documentation

**POST /login**

login with username will respond back with an [access token] & [refresh token]

**GET /posts**

sends [access token] with request to match [ACCESS_TOKEN_SECRET] in jwt verify function
======

**DELETE /logout**

sends [refresh token] and deletes it from storage
======

**POST /token**

sends [refresh token] and receives a new [access token] using user + [ACCESS_TOKEN_SECRET]
