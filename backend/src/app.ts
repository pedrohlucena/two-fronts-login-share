const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

import { allowedOrigins } from "./constants";
import { authRoutes, usersRoutes } from "./routes";
import { cleanAccessTokens } from "./utils";

const app = express();

app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json())
app.use(authRoutes)
app.use(usersRoutes)

export const database = {
  access_tokens: [] as string[],
  refresh_tokens: [] as string[]
}

const fiveSeconds = 5 * 1000

setInterval(cleanAccessTokens, fiveSeconds);

const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));