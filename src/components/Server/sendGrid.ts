if (!process.env.NEXT_PUBLIC_SENDGRID_API_KEY)
    throw new Error('NEXT_PUBLIC_SENDGRID_API_KEY variable is missing!')

export const SENDGRID_API_KEY = process.env.NEXT_PUBLIC_SENDGRID_API_KEY
