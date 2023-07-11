import { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'
import { EMAIL, SENDGRID_API_KEY } from '@/components/Server'
import { runCors } from './cors'

const sendMessage = async (req: NextApiRequest, res: NextApiResponse) => {
    // Handle your API logic here
    try {
        // await runCors(req, res)
        console.log(req.body)

        const { name, email, message } = req.body

        console.log('in api', req.method)

        sgMail.setApiKey(SENDGRID_API_KEY)

        console.log('sendgrid api set')
        // Define the email options
        const msg = {
            from: EMAIL, // Sender's email address
            to: EMAIL, // Recipient's email address
            subject: `${name} is trying to reach you!`,
            html: `<p>${message}</p><p>Their contact is <strong>${email}</strong></p>`
        }

        console.log('message prepared')
        // Send the email

        await sgMail
            .send(msg)
            .then(() => {
                console.log('message sent')
                return res.status(200).json({ message: 'Email sent successfully' })
            })
            .catch(() => {
                console.log('message failed')
                return res.status(500).json({ message: 'Failed to send email' })
            })
    } catch (e: any) {
        console.log('api call failed')
        return res.status(400).json(e.response.data)
    }
}

export default sendMessage
