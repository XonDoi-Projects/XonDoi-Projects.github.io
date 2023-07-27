if (!process.env.NEXT_PUBLIC_GIT_USERNAME)
    throw new Error('NEXT_PUBLIC_GIT_USERNAME variable is missing!')

export const GIT_USERNAME = process.env.NEXT_PUBLIC_GIT_USERNAME

if (!process.env.NEXT_PUBLIC_GIT_PAT) throw new Error('NEXT_PUBLIC_GIT_PAT variable is missing!')

export const GIT_PAT = process.env.NEXT_PUBLIC_GIT_PAT
