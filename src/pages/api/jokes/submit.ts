import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

const submitJoke = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const db = client.db('jokes')
        let { userId, text, answer } = req.body

        userId = userId.trim()

        let result = await db.collection('jokes').insertOne({
            text,
            answer,
            submittedOn: new Date(),
            userId
        })

        if (result?.acknowledged) {
            return res.status(200).json({ message: 'Joke Submitted!' })
        }
    } catch (e: any) {
        console.log(e.message)
        return res.status(404).json({ message: 'Failed to Joke' })
    }
}

export default submitJoke
