import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { IJoke } from '@/components'
import { User } from '@/components/Providers'

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

        if (!result.likes) {
            result['likes'] = [userId]
        } else {
            const index = result.likes.findIndex((like: string) => like === userId)

            if (index >= 0) {
                result.likes.splice(index, 1)
            } else {
                result.likes.push(userId)
            }
        }

        let updatedResult = await db
            .collection('jokes')
            .updateOne({ _id: jokeId }, { $set: { likes: result.likes } })

        if (updatedResult?.acknowledged) {
            let updatedJoke = await db.collection('jokes').findOne<IJoke>({ _id: jokeId })

            if (!updatedJoke) {
                return res.status(404).json({ message: 'Could not get Updated Joke' })
            }

            const dbUsers = client.db('users')
            let resolvedResult = {
                ...updatedJoke,
                submittedBy: await dbUsers
                    .collection('users')
                    .findOne<User>({ _id: new ObjectId(updatedJoke.userId) })
            }

            return res.status(200).json({ joke: resolvedResult, message: 'Joke Updated!' })
        } else {
            return res.status(404).json({ message: 'Failed to Update!' })
        }
    } catch (e: any) {
        console.log(e.message)
        return res.status(404).json({ message: 'Failed to edit Joke' })
    }
}

export default editJoke
