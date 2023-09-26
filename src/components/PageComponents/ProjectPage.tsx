import { FunctionComponent, useEffect, useState } from 'react'
import { Container } from '../LayoutComponents'
import { useDarkTheme, useSize } from '../Providers'
import { Typography } from '../LayoutComponents/Typography'
import { colors } from '../Colors'
import { Projects } from './Projects/Projects'
import { Project } from './Projects'

const projectList: Project[] = [
    {
        title: 'Tic-Tac-Toe',
        excerpt: 'My take on Tic-Tac-Toe, featuring a score leaderboard!',
        description: `The Front-end part is built using React, Typescript and Styled Components (CSS). Whereas, the Back-end part of this project is set up using the pages/api directory of NextJS 13, which makes use of a MongoDB connection to create, update, and get user scores. Logged in users can track their scores and update if a high score is obtained.`,
        link: '/projects/tic-tac-toe',
        tags: ['Next.js', 'React', 'Typescript', 'CSS', 'MongoDB']
    },
    {
        title: 'Dad Joke Viewer',
        excerpt:
            'A simple Dad Joke Viewer, in which you may also submit your own jokes for everyone else to see!',
        description: ` The Front-end part is built using React, Typescript and Styled Components (CSS). Whereas, the Back-end part of this project is set up using the pages/api directory of NextJS 13, which makes use of a MongoDB connection to create, update, and get dad jokes. Logged in users can submit and update their own dad jokes, as well as 'like' dad jokes.`,
        link: '/projects/dad-joke-generator',
        tags: ['Next.js', 'React', 'Typescript', 'CSS', 'MongoDB']
    },
    {
        title: 'Dog Finder',
        excerpt: 'A place where you can find a dog to adopt!',
        description:
            'This project was built using React, Typescript and Styled Components. The data is obtained from fetch rewards api as a take home assignment. The motivation behind this project was to test my strengths and weaknesses in a setup that is very similar to e-commerce.',
        link: 'https://fetch-take-home-inky.vercel.app/',
        tags: ['React', 'Typescript', 'CSS']
    }
]

export interface ProjectPageProps {}

export const ProjectPage: FunctionComponent<ProjectPageProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()

    const [parentDiv, setParentDiv] = useState<{ height?: number; width?: number }>()

    useEffect(() => {
        const element = document.getElementById('parentDetailsScroll')
        setParentDiv({ height: element?.clientHeight, width: element?.clientWidth })
    }, [])

    return (
        <Container
            sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}
            hidescrollBar
        >
            <Container
                sx={{
                    flexDirection: mobile.mobile ? 'column' : 'row',
                    width: mobile.mobile ? mobile.size?.width : '100%',
                    height: mobile.mobile ? '100%' : '100%'
                }}
            >
                <Container
                    sx={{
                        width: mobile.mobile ? '100%' : '35%',
                        height: mobile.mobile ? 'fit-content' : '100vh',
                        padding: '30px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: mobile.mobile ? 'center' : 'flex-start',
                        backgroundColor: light ? colors.light.accent : colors.dark.accent
                    }}
                >
                    <Typography
                        variant="supertitle"
                        sx={{
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            marginLeft: mobile.mobile ? '0px' : '35px'
                        }}
                    >
                        Projects
                    </Typography>
                </Container>

                <Container
                    sx={{
                        width: mobile.mobile ? '100%' : '55%',
                        height: mobile.mobile ? 'fit-content' : '100vh',
                        padding: '20px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}
                >
                    <Container
                        id="parentDetailsScroll"
                        sx={{
                            flexDirection: 'column',
                            padding: mobile ? undefined : '0px 15px',
                            width: mobile.mobile ? '100%' : '70%',
                            height: mobile.mobile ? '100%' : '70%',
                            overflowY: mobile.mobile ? 'hidden' : 'auto',
                            overflowX: 'hidden',
                            alignItems: 'center'
                        }}
                        hidescrollBar
                    >
                        <Container
                            sx={{
                                flexDirection: 'column',
                                width: parentDiv?.width + 'px',
                                height: parentDiv?.height + 'px',
                                pointerEvents: 'none',
                                zIndex: 1,
                                position: 'fixed',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Container
                                sx={{
                                    width: '100%',
                                    height: '30px',
                                    background: mobile.mobile
                                        ? undefined
                                        : `linear-gradient(to bottom, ${
                                              light
                                                  ? colors.light.background
                                                  : colors.dark.background
                                          }, transparent)`
                                }}
                            />

                            <Container
                                sx={{
                                    width: '100%',
                                    height: '30px',
                                    background: mobile.mobile
                                        ? undefined
                                        : `linear-gradient(to top, ${
                                              light
                                                  ? colors.light.background
                                                  : colors.dark.background
                                          }, transparent)`
                                }}
                            />
                        </Container>
                        <Projects projects={projectList} />
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
