const { v4: uuid } = require('uuid');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const origins = [
  'http://localhost:4000',
  'http://localhost:5000',
  'http://127.0.0.1:4000',
  'http://127.0.0.1:5000'
]

app.use(express.json())
app.use(cookieParser());
app.use(cors({ origin: origins, credentials: true }));

const database = {
  access_tokens: [],
  refresh_tokens: []
}

setInterval(() => {
  database.access_tokens.length = 0;
}, 100 * 1000);

function generateAccessToken() {
  return uuid()
}

function saveAccessToken(access_token) {
  database.access_tokens.push(access_token);
}

app.post('/login', (req, res) => {
  try {
    const { user, password } = req.body

    if (user === "pedrohlucena" && password === "123") {
      const access_token = generateAccessToken()
      const refresh_token = uuid()

      res.cookie('@two-fronts-login-share:refresh_token', refresh_token, { maxAge: 900000, httpOnly: true, secure: true, sameSite: 'none' });

      database.refresh_tokens.push(refresh_token)
      saveAccessToken(access_token)

      res.status(201).send({ access_token });
    } else {
      res.status(401).send({ message: 'Invalid credentials' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Internal Server Error' })
  }
});

app.post('/refresh_token', (req, res) => {
  try {
    const cookies = req.cookies

    const sentRefreshToken = cookies['@two-fronts-login-share:refresh_token']

    const validRefreshToken = database.refresh_tokens.includes(sentRefreshToken)

    if (validRefreshToken) {
      const access_token = generateAccessToken();
      saveAccessToken(access_token);
      res.status(201).send({ access_token });
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Internal Server Error' })
  }
});

app.get('/users', (req, res) => {
  try {
    const headers = req.headers
    const authorizationHeader = headers['authorization']

    if (!authorizationHeader) {
      res.status(401).send({ message: "You are not authorized to access this resource." });
      return;
    }

    const access_token = authorizationHeader.replace('Bearer ', '')

    const validAccessToken = database.access_tokens.includes(access_token)

    if (!validAccessToken) {
      res.status(401).send({ message: "You are not authorized to access this resource." });
    }

    if (validAccessToken) {
      res.status(200).send({ items: [`user ${uuid()}`, `user ${uuid()}`, `user ${uuid()}`] });
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Internal Server Error' })
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});