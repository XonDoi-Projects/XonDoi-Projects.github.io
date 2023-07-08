import { FunctionComponent, ReactNode, createRef, useEffect, useRef, useState } from 'react'
import { Container } from '../LayoutComponents'
import { Typography } from '../LayoutComponents/Typography'
import { SkillsShowcase } from './SkillsShowcase'
import { useDarkTheme, useSize } from '../Providers'
import Image from 'next/image'
import { colors } from '../Colors'

const skills = [
    { src: '/React.svg', alt: 'React' },
    { src: '/JS.svg', alt: 'JS' },
    { src: '/TS.svg', alt: 'TS' },
    { src: '/Jest.svg', alt: 'Jest' },
    { src: '/Node.svg', alt: 'NodeJS' },
    { src: '/Mongo.svg', alt: 'MongoDB' },
    { src: '/Firebase.svg', alt: 'Firebase' },
    { src: '/Next.svg', alt: 'Next' }
]

export interface MainPageProps {}

export const MainPage: FunctionComponent<MainPageProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()
    const bannerRef = createRef<HTMLDivElement>()

    const [bannerWidth, setBannerWidth] = useState<number>()

    useEffect(() => {
        if (bannerRef.current) {
            setBannerWidth(bannerRef.current.getBoundingClientRect().width)
        }
    }, [bannerRef])

    return (
        <Container
            sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}
        >
            <Container
                sx={{
                    width: mobile.mobile ? mobile.size?.width : '80%',
                    height: mobile.mobile ? undefined : '100%',
                    flexDirection: mobile.mobile ? 'column' : 'row'
                }}
            >
                <Container
                    ref={bannerRef}
                    sx={{
                        flexDirection: 'column',
                        width: mobile.mobile ? '100%' : '45%',
                        height: mobile.mobile ? 'fit-content' : '100%',
                        justifyContent: 'center',
                        backgroundColor: light ? colors.light.accent : colors.dark.accent
                    }}
                >
                    <Container
                        sx={{
                            width: bannerWidth,
                            height: `calc(1451/2736 * ${bannerWidth}px)`,
                            margin: '30px 0px'
                        }}
                    >
                        <Image
                            src={'/Nathan_Picture_2_cropped.jpg'}
                            alt="Profile Picutre"
                            fill
                            style={{ objectFit: 'scale-down' }}
                        />
                    </Container>
                    <Container
                        sx={{
                            padding: '20px',
                            flexDirection: 'column',
                            width: '100%',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography
                            variant="supertitle"
                            sx={{
                                marginLeft: '30px',
                                marginBottom: '0px',
                                color: light
                                    ? colors.light.accentForeground
                                    : colors.dark.accentForeground
                            }}
                        >
                            Nathan Magro
                        </Typography>
                        <Typography
                            variant="title"
                            sx={{
                                marginLeft: '30px',
                                marginTop: '5px',
                                color: light
                                    ? colors.light.accentForeground
                                    : colors.dark.accentForeground
                            }}
                        >
                            Web Developer
                        </Typography>
                    </Container>
                </Container>
                <Container
                    sx={{
                        flexDirection: 'column',
                        padding: '20px',
                        width: mobile.mobile ? '100%' : '55%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Container
                        sx={{
                            width: mobile.mobile ? '100%' : '80%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="body" sx={{ fontSize: '22px' }}>
                            I am a skilled Front-end Web Developer, experienced in library
                            management, version control, and some experience Back-end Development.
                            Below are technologies that I have worked with to develop projects.
                        </Typography>
                    </Container>
                    <Container
                        sx={{
                            width: mobile.mobile ? '100%' : '70%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <SkillsShowcase skills={skills} />
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
