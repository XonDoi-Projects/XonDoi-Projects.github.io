import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

const submitScore = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const db = client.db('scores')
        let { userId, score, moves, time } = req.body

        userId = userId.trim()

        console.log(userId)
        let result = await db
            .collection('scores')
            .findOneAndUpdate(
                { userId },
                { $set: { score, moves, time, userId } },
                { upsert: true }
            )

        if (result?.ok) {
            return res.status(200).json({ message: 'Score Submitted!' })
        }
    } catch (e: any) {
        console.log(e.message)
        return res.status(404).json({ message: 'Failed to Submit' })
    }
}

export default submitScore
