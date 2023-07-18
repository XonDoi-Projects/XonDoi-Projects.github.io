import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { InsertOneResult, WithId } from 'mongodb'

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise
        const db = client.db('users')
        const { username, password } = req.body

        let user = await db.collection('users').findOne({
            username,
            password
        })

        let newUser: InsertOneResult<Document>
        if (!user) {
            newUser = await db.collection('users').insertOne({ username, password })

            if (newUser.acknowledged) {
                let foundUser = await db.collection('users').findOne({ _id: newUser.insertedId })

                return res.json({ user: foundUser, message: 'User created!' })
            }

            throw new Error('User not created')
        }

        return res.json({ user, message: 'User found in database!' })
    } catch (e: any) {
        console.error(e)
        throw new Error(e.response)
    }
}

export default login
