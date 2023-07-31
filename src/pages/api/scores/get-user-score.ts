import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

const getUserScore = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const dbScore = client.db('scores')
        const { query } = req.body

        let result = await dbScore.collection('scores').findOne(query)

        if (result) {
            return res.status(200).json({ score: result })
        }
    } catch (e: any) {
        return res.status(404).json({ message: 'Failed to get Score' })
    }
}

export default getUserScore
