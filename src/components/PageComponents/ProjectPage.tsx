import { FunctionComponent } from 'react'
import { Container } from '../LayoutComponents'
import { useDarkTheme, useSize } from '../Providers'
import { Typography } from '../LayoutComponents/Typography'
import { colors } from '../Colors'
import { Projects } from './Projects/Projects'
import { Project } from './Projects'

const projectList: Project[] = [
    {
        title: 'Tic-Tac-Toe',
        description: 'My take on Tic-Tac-Toe, also features a leaderboard.',
        link: '/projects/tic-tac-toe'
    },
    {
        title: 'Dad Joke Generator',
        description: 'Coming soon'
    },
    {
        title: 'E-Commerce Template',
        description: 'Coming soon'
    }
]

export interface ProjectPageProps {}

export const ProjectPage: FunctionComponent<ProjectPageProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()

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
                        minWidth: '360px',
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
                        sx={{
                            flexDirection: 'column',
                            width: mobile.mobile ? '100%' : '70%',
                            height: mobile.mobile ? '100%' : '70%',
                            overflowY: mobile.mobile ? 'hidden' : 'auto',
                            overflowX: 'hidden',
                            alignItems: 'center'
                        }}
                        hidescrollBar
                    >
                        <Projects projects={projectList} />
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
