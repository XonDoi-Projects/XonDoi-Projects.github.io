import { FunctionComponent, createRef, useEffect, useState } from 'react'
import { Container } from '../LayoutComponents'
import { Typography } from '../LayoutComponents/Typography'
import { useDarkTheme, useSize } from '../Providers'
import Image from 'next/image'
import { colors } from '../Colors'
import Link from 'next/link'
import { Button } from '../InputComponents'
import { BiSolidDownload } from 'react-icons/bi'
import { SkillsShowcase } from './Skills'

export interface ISkill {
    src: string
    alt: string
}

const skills: ISkill[] = [
    {
        src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/React.svg?alt=media&token=e304398c-c39c-4a72-ada2-3deda2efc9c6',
        alt: 'React'
    },
    {
        src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/JS.svg?alt=media&token=a8837565-7313-4d0c-8f40-55c9f21bca1e',
        alt: 'JS'
    },
    {
        src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/TS.svg?alt=media&token=0d2352da-ae22-4a6d-ac81-8e0cbafd50bd',
        alt: 'TS'
    },
    {
        src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/Jest.svg?alt=media&token=050b9a70-b08b-43bc-b879-1a4169999416',
        alt: 'Jest'
    },
    {
        src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/Node.svg?alt=media&token=dcc30c9a-de76-4632-9a0d-1413a9eed92d',
        alt: 'NodeJS'
    },
    {
        src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/Mongo.svg?alt=media&token=f9b42dbc-f985-47c5-b87a-47e372719b3e',
        alt: 'MongoDB'
    },
    {
        src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/Firebase.svg?alt=media&token=7452c6ec-cb2c-4725-8e7a-32449d6514d8',
        alt: 'Firebase'
    },
    {
        src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/Next.svg?alt=media&token=bd049721-b37d-442a-98b2-ee1b8ce88da5',
        alt: 'Next'
    }
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
                width: '100%',
                paddingLeft: mobile.mobile ? undefined : '110px'
            }}
        >
            <Container
                sx={{
                    width: mobile.mobile ? mobile.size?.width : '100%',
                    height: mobile.mobile ? undefined : '100dvh',
                    flexDirection: mobile.mobile ? 'column' : 'row'
                }}
            >
                <Container
                    ref={bannerRef}
                    sx={{
                        flexDirection: 'column',
                        width: mobile.mobile ? '100%' : '35%',
                        height: mobile.mobile ? 'fit-content' : '100%',
                        justifyContent: 'center',
                        backgroundColor: light ? colors.light.accent : colors.dark.accent,
                        gap: '10px'
                    }}
                >
                    <Container
                        sx={{
                            width: bannerWidth,
                            height: `calc(1451/2736 * ${bannerWidth}px)`,
                            marginTop: mobile.mobile ? '30px' : '50px'
                        }}
                    >
                        <Image
                            src={
                                'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/Nathan_Picture_2_cropped.jpg?alt=media&token=87dcdc07-ec97-42f1-af1e-49cafb099717'
                            }
                            alt="Profile Picutre"
                            fill
                            style={{ objectFit: 'scale-down' }}
                        />
                    </Container>
                    <Container
                        sx={{
                            // flex: 1,
                            padding: '20px',
                            flexDirection: 'column',
                            height: mobile.mobile ? undefined : '259px',
                            width: '100%',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography
                            variant="supertitle"
                            sx={{
                                marginTop: '30px',
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
                                marginBottom: '15px',
                                color: light
                                    ? colors.light.accentForeground
                                    : colors.dark.accentForeground
                            }}
                        >
                            Web Developer
                        </Typography>
                        <Link
                            href="/Nathan_Magro_(Redacted).pdf"
                            download="Nathan_Magro_Resume.pdf"
                            target="_blank"
                            style={{
                                textDecoration: 'none',
                                width: 'fit-content',
                                marginLeft: '30px'
                            }}
                        >
                            <Button
                                sx={{
                                    width: '150px',
                                    height: '38px',
                                    borderRadius: '19px',
                                    backgroundColor: light
                                        ? colors.light.accentForeground
                                        : colors.dark.accentForeground,
                                    justifyContent: 'space-between',
                                    padding: '0px 20px'
                                }}
                            >
                                <Typography variant="button"> Resume </Typography>
                                <BiSolidDownload style={{ fontSize: '20px' }} />
                            </Button>
                        </Link>
                    </Container>
                </Container>
                <Container
                    sx={{
                        flexDirection: 'column',
                        padding: '20px',
                        width: mobile.mobile ? '100%' : '55%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}
                >
                    <Container
                        sx={{
                            minHeight: '150px',
                            // maxHeight: mobile.mobile ? undefined : '250px',
                            height: mobile.mobile
                                ? undefined
                                : `calc(1451/2736 * ${bannerWidth}px)`,
                            width: 'fit-content',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            marginLeft: mobile.mobile ? '0px' : '70px',
                            marginTop: mobile.mobile ? '30px' : '50px',
                            overflowY: 'auto'
                        }}
                        hidescrollBar
                    >
                        <Typography
                            variant="body"
                            sx={{
                                fontSize: '20px',
                                lineHeight: mobile.mobile ? undefined : '30px',
                                margin: '0px'
                            }}
                        >
                            I am a versatile Front-end Web Developer skilled in building reusable
                            components, intuitive UIs, data display, and forms. With experience in
                            library management, version control, and back-end integration, I am
                            committed to crafting smooth and seamless interfaces to create an
                            exceptional user experience.
                        </Typography>
                    </Container>
                    <Container
                        sx={{
                            marginLeft: mobile.mobile ? '0px' : '70px',
                            height: 'fit-content',
                            width: mobile.mobile ? '100%' : '70%',
                            justifyContent: 'center',
                            alignItems: 'space-evenly'
                        }}
                    >
                        <SkillsShowcase skills={skills} />
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
