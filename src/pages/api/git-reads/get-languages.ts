import { GIT_PAT, GIT_USERNAME } from '@/components/Server/github'
import { NextApiRequest, NextApiResponse } from 'next'

const getLanguages = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let result = await fetch(`https://api.github.com/users/${GIT_USERNAME}/repos`, {
            headers: { Authorization: `token ${GIT_PAT}` }
        })

        let languages = {}

        console.log(result.headers)

        result = await result.json()

        console.log(result)

        if (!Array.isArray(result)) {
            throw new Error('Failed to fetch GitHub repositories.')
        }

        for (const repo of result) {
            const languagesResponse = await fetch(repo.languages_url, {
                headers: {
                    Authorization: `token ${GIT_PAT}`
                }
            })
            const languageResult = await languagesResponse.json()
            languages = { ...languages, ...languageResult }
        }

        console.log(languages)
    } catch (e: any) {
        return res.status(404).json({ message: 'Failed to get Languages' })
    }
}

export default getLanguages
