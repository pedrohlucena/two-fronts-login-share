const { v4: uuid } = require('uuid');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4000', credentials: true }));

app.post('/login', (req, res) => {
  try {
    const { user, password } = req.body

    if (user === "pedrohlucena" && password === "123") {
      const access_token = uuid()
      const refresh_token = uuid()

      res.cookie('@two-fronts-login-share:refresh_token', refresh_token, { maxAge: 900000, httpOnly: true, secure: true });
      res.status(201)
        .send({ access_token });
    } else {
      res.status(401)
        .send({
          message: 'Invalid credentials'
        })
    }
  } catch (error) {
    console.log(error)
  }
});

app.get('/refresh_token', (req, res) => { });

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});