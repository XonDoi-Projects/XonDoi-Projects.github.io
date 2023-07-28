import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { InsertOneResult, WithId } from 'mongodb'

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const db = client.db('users')
        let { username, password } = req.body

        username = username.trim()
        password = password.trim()

        let user = await db.collection('users').findOne({
            username
        })

        if (user && user?.password !== password) {
            return res.status(404).json({ message: 'Incorrect Password' })
        }

        let newUser: InsertOneResult<Document>
        if (!user) {
            newUser = await db.collection('users').insertOne({ username, password })

            if (newUser.acknowledged) {
                let foundUser = await db.collection('users').findOne({ _id: newUser.insertedId })

                return res.status(200).json({ user: foundUser, message: 'User created!' })
            }

            return res.status(404).json({ message: 'User not created' })
        }

        return res.status(200).json({ user, message: 'User found in database!' })
    } catch (e: any) {
        return res.status(404).json({ message: 'Failed to login' })
    }
}

export default login
