import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const db = client.db('users')
        let { uid, email, displayName } = req.body

        uid = uid.trim()
        displayName = displayName.trim()
        email = email.trim()

        const newUser = await db.collection('users').insertOne({ uid, email, displayName })

        if (newUser.acknowledged) {
            let foundUser = await db.collection('users').findOne({ _id: newUser.insertedId })

            return res.status(200).json({ user: foundUser, message: 'User created!' })
        }

        return res.status(404).json({ message: 'User not created' })
    } catch (e: any) {
        return res.status(404).json({ message: 'Failed to login' })
    }
}

export default create
