import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

const submitScoreAnon = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const db = client.db('scores')
        let { score, moves, time } = req.body

        let result = await db.collection('scores').insertOne({
            score,
            moves,
            time: new Date(time)
        })

        if (result?.acknowledged) {
            return res.status(200).json({ message: 'Score Submitted!' })
        }
    } catch (e: any) {
        return res.status(404).json({ message: 'Failed to Submit' })
    }
}

export default submitScoreAnon
