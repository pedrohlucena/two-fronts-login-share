const { v4: uuid } = require('uuid');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4000', credentials: true }));

const database = {
  refresh_tokens: []
}

function generateAccessToken() {
  return uuid()
}

app.post('/login', (req, res) => {
  try {
    const { user, password } = req.body

    if (user === "pedrohlucena" && password === "123") {
      const access_token = generateAccessToken()
      const refresh_token = uuid()

      res.cookie('@two-fronts-login-share:refresh_token', refresh_token, { maxAge: 900000, httpOnly: true, secure: true });
      database.refresh_tokens.push(refresh_token)
      res.status(201).send({ access_token });
    } else {
      res.status(401).send({ message: 'Invalid credentials' })
    }
  } catch (error) {
    console.error(error)
  }
});

app.post('/refresh_token', (req, res) => {
  try {
    const cookies = req.cookies
    const sentRefreshToken = cookies['@two-fronts-login-share:refresh_token']

    const validRefreshToken = database.refresh_tokens.includes(sentRefreshToken)

    if (validRefreshToken) {
      const access_token = generateAccessToken()
      res.status(201).send({ access_token });
    }
  } catch (error) {
    console.error(error)
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});