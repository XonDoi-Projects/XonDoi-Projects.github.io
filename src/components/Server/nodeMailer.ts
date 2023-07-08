if (!process.env.EMAIL) throw new Error('EMAIL variable is missing!')

export const EMAIL = process.env.EMAIL
