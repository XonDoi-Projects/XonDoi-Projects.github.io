import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

const submitScore = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const db = client.db('scores')
        let { userId, score, moves, time } = req.body

        userId = userId.trim()

        const findScore = await db.collection('scores').findOne({ userId })

        if (!findScore) {
            const result = await db.collection('scores').insertOne({
                score,
                moves,
                time: new Date(new Date(new Date(time).setHours(0)).setMinutes(0)),
                submittedBy: userId,
                submittedOn: new Date(),
                editedBy: userId,
                editedOn: new Date(),
                userId
            })
            if (result?.acknowledged) {
                return res.status(200).json({ message: 'Score Submitted!' })
            }
        } else {
            let result = await db.collection('scores').findOneAndUpdate(
                { userId },
                {
                    $set: {
                        score,
                        moves,
                        time: new Date(new Date(new Date(time).setHours(0)).setMinutes(0)),
                        editedBy: userId,
                        editedOn: new Date(),
                        userId
                    }
                },
                { upsert: true }
            )
            if (result?.ok) {
                return res.status(200).json({ message: 'Score Submitted!' })
            }
        }
    } catch (e: any) {
        console.log(e.message)
        return res.status(404).json({ message: 'Failed to Submit' })
    }
}

export default submitScore
