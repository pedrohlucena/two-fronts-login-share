import { RequestHandler } from "express"
import { database } from "../app"
import { generateAccessToken, generateRefreshToken, saveAccessToken, saveRefreshToken } from "../utils"

export const postLogin: RequestHandler = (req, res, _) => {
    try {
        const { user, password } = req.body

        const userExists = user === "pedrohlucena" && password === "123"

        if (userExists) {
            const access_token = generateAccessToken()
            const refresh_token = generateRefreshToken()

            res.cookie(
                '@two-fronts-login-share:refresh_token', 
                refresh_token, 
                { maxAge: 900000, httpOnly: true, secure: true, sameSite: 'none' }
            );

            saveRefreshToken(refresh_token)
            saveAccessToken(access_token)

            res.status(201).send({ access_token });
        } else {
            res.status(401).send({ message: 'Invalid credentials' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

export const postRefreshToken: RequestHandler = (req, res, _) => {
    try {
        const cookies = req.cookies
        const sentRefreshToken = cookies['@two-fronts-login-share:refresh_token']

        if(!sentRefreshToken) {
            res.status(400).send({ message: 'refresh_token is missing' })
            return;
        }

        const refreshTokenIsValid = database.refresh_tokens.includes(sentRefreshToken)

        if (refreshTokenIsValid) {
            const access_token = generateAccessToken();
            saveAccessToken(access_token);
            res.status(201).send({ access_token });
        } else {
            res.status(400).send({ message: 'Invalid refresh_token' })
            return;
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}