if (!process.env.SENDGRID_API_KEY) throw new Error('SENDGRID_API_KEY variable is missing!')

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
