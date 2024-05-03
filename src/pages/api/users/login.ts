import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { User } from '@/components/Providers'

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const db = client.db('users')
        let { uid } = req.body

        uid = uid.trim()

        let user = await db.collection('users').findOne<User>({
            uid
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).json({ user, message: 'User found in database!' })
    } catch (e: any) {
        return res.status(404).json({ message: 'Failed to login' })
    }
}

export default login
