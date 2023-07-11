import { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'
import { EMAIL, SENDGRID_API_KEY } from '@/components/Server'
import { runCors } from './cors'

const sendMessage = async (req: NextApiRequest, res: NextApiResponse) => {
    // Handle your API logic here
    try {
        // await runCors(req, res)

        const { name, email, message } = req.body

        sgMail.setApiKey(SENDGRID_API_KEY)

        // Define the email options
        const msg = {
            from: EMAIL, // Sender's email address
            to: EMAIL, // Recipient's email address
            subject: `${name} is trying to reach you!`,
            html: `<p>${message}</p><p>Their contact is <strong>${email}</strong></p>`
        }

        // Send the email

        sgMail
            .send(msg)
            .then(() => {
                res.status(200).json({ message: 'Email sent successfully' })
            })
            .catch(() => {
                res.status(500).json({ message: 'Failed to send email' })
            })
    } catch (e: any) {
        console.log(e)
        res.status(400).json(e.response.data)
    }
}

export default sendMessage
