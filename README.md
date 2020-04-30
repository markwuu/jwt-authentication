# JSON Web Token Authentication
JSON Web Token Authentication Example

Download dependencies

1. ```npm install dotenv express jsonwebtoken```

2. ```npm install --save-dev nodemon```

Create and save values for ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET in an .env file by running

3. ```node```

4. ```require('crypto').randomBytes(64).toString('hex')```

Start servers:

5. ```npm run devStart```
6. ```npm run devStartAuth```
