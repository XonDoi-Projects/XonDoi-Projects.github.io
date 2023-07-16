if (!process.env.NEXT_PUBLIC_FIREBASE_APP_ID)
    throw new Error('NEXT_PUBLIC_FIREBASE_APP_ID variable is missing!')

export const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID

if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
    throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY variable is missing!')

export const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

if (!process.env.NEXT_PUBLIC_FIREBASE_BUCKET)
    throw new Error('NEXT_PUBLIC_FIREBASE_BUCKET variable is missing!')

export const FIREBASE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_BUCKET

if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)
    throw new Error('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN variable is missing!')

export const FIREBASE_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN

if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
    throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID variable is missing!')

export const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
