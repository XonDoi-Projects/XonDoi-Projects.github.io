import { NextApiRequest, NextApiResponse } from 'next'
import sgMail, { MailDataRequired } from '@sendgrid/mail'
import { EMAIL, SENDGRID_API_KEY } from '@/components/Server'

const sendMessage = async (req: NextApiRequest, res: NextApiResponse) => {
    // Handle your API logic here
    try {
        const { name, email, message } = req.body

        sgMail.setApiKey(SENDGRID_API_KEY)

        // Define the email options
        const msg: MailDataRequired = {
            from: EMAIL, // Sender's email address
            to: EMAIL, // Recipient's email address
            subject: `${name} is trying to reach you!`,
            html: `<p>${message}</p><p>Their contact is <strong>${email}</strong></p>`
        }

        // Send the email

        await sgMail.send(msg).then(() => {
            return res.status(200).json({ message: 'Message sent successfully' })
        })
    } catch (e: any) {
        return res.status(400).json(e.response.data)
    }
}

export default sendMessage
