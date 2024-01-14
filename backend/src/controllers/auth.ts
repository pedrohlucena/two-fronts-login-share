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
}