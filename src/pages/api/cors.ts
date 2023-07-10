import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

// Initialize the cors middleware
const cors = Cors({
    origin: 'https://xondoi-projects.github.io', // Replace with your website URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] // Allow the HTTP methods you want
})

// Helper function to run the cors middleware
// Use it in your API route handlers
export const runCors = (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
    new Promise((resolve, reject) => {
        cors(req, res, (result: unknown) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve()
        })
    })
