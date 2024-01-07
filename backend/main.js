const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cookieParser());
app.use(cors());

app.get('/setCookie', (req, res) => {
  // res.header('Access-Control-Allow-Origin', 'http://your-frontend-domain.com');
  res.header('Access-Control-Allow-Credentials', true);
  res.cookie('cookie', 'SDFASDF', { maxAge: 900000, httpOnly: true, secure: true });
  res.send('Cookie set successfully!');
});

app.get('/getCookie', (req, res) => {
  const myCookie = req.cookies.myCookie;

  if (myCookie) {
    res.send(`Cookie value: ${myCookie}`);
  } else {
    res.send('Cookie not found!');
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});