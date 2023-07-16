if (!process.env.NEXT_PUBLIC_EMAIL) throw new Error('NEXT_PUBLIC_EMAIL variable is missing!')

export const EMAIL = process.env.NEXT_PUBLIC_EMAIL
