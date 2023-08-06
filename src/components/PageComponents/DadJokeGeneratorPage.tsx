import { FunctionComponent } from 'react'
import { Container } from '../LayoutComponents'
import { useSize } from '../Providers'
import { Typography } from '../LayoutComponents/Typography'
import { DadJokeGenerator } from './Projects'

export interface DadJokeGeneratorPageProps {}

export const DadJokeGeneratorPage: FunctionComponent<DadJokeGeneratorPageProps> = (props) => {
    const mobile = useSize()

    return (
        <Container
            sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: mobile.mobile ? 'fit-content' : '100%'
            }}
            hidescrollBar
        >
            <Container
                sx={{
                    flexDirection: mobile.mobile ? 'column' : 'row',
                    width: mobile.mobile ? mobile.size?.width : '100%',
                    height: mobile.mobile ? '100%' : '90%',
                    justifyContent: 'center'
                }}
            >
                <Container
                    sx={{
                        flexDirection: 'column',
                        padding: '20px',
                        width: mobile.mobile ? '100%' : '70%',
                        height: '100%',
                        alignItems: mobile.mobile ? 'center' : 'flex-start',
                        justifyContent: 'flex-start',
                        overflow: 'hidden'
                    }}
                >
                    <Container sx={{ width: '100%', height: 'fit-content' }}>
                        <Typography
                            variant="supertitle"
                            sx={{ marginTop: '20px', marginBottom: '20px' }}
                        >
                            Dad Joke Generator
                        </Typography>
                    </Container>

                    <Container
                        sx={{
                            flex: 1,
                            padding: '20px 0px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            width: '100%',
                            height: mobile.mobile ? 'fit-content' : undefined,
                            overflowY: mobile.mobile ? undefined : 'auto',
                            overflowX: 'hidden'
                        }}
                        hidescrollBar
                    >
                        <DadJokeGenerator />
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
