import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { IJoke } from '@/components'

const editJoke = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const db = client.db('jokes')
        const { id } = req.query
        let { userId, text, answer } = req.body

        userId = userId.trim()

        let jokeId = new ObjectId(id?.toString())

        let result = await db.collection('jokes').findOne<IJoke>({
            _id: jokeId
        })

        if (!result) {
            return res.status(404).json({ message: 'Could not find Joke!' })
        }

        if (userId !== result?.userId) {
            return res.status(404).json({ message: 'This joke was not your submission!' })
        }

        let updatedResult = await db
            .collection('jokes')
            .updateOne({ _id: jokeId }, { $set: { text, answer } })

        if (updatedResult?.acknowledged) {
            return res.status(200).json({ message: 'Joke Updated!' })
        }
    } catch (e: any) {
        console.log(e.message)
        return res.status(404).json({ message: 'Failed to edit Joke' })
    }
}

export default editJoke
