import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

const getScores = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const dbScore = client.db('scores')
        const { filter, sort } = req.body

        let result = await dbScore.collection('scores').find(filter).limit(10).sort(sort).toArray()

        const dbUsers = client.db('users')
        let resolvedResult = await Promise.all(
            result.map(async (item: any) => ({
                ...item,
                name: await dbUsers.collection('users').findOne({ _id: new ObjectId(item.userId) })
            }))
        )

        if (result) {
            return res.status(200).json({ scores: resolvedResult })
        }
    } catch (e: any) {
        return res.status(404).json({ message: 'Failed to get Scores' })
    }
}

export default getScores
