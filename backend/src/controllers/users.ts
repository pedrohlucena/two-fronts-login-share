import { RequestHandler } from "express";
import { database } from "../app";
const { v4: uuid } = require('uuid');

export const getUsers: RequestHandler = (req, res, _) => {
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
}