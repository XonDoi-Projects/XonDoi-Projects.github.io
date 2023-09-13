import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { User } from '@/components/Providers'
import { IJoke } from '@/components'

const getJokes = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const dbScore = client.db('jokes')

        let result = await dbScore.collection('jokes').find<IJoke[]>({}).toArray()

        const dbUsers = client.db('users')
        let resolvedResult = await Promise.all(
            result.map(async (item: any) => ({
                ...item,
                submittedBy: await dbUsers
                    .collection('users')
                    .findOne<User>({ _id: new ObjectId(item.userId) })
            }))
        )

        if (result) {
            return res.status(200).json({ jokes: resolvedResult })
        }
    } catch (e: any) {
        return res.status(404).json({ message: 'Failed to get Jokes' })
    }
}

export default getJokes
