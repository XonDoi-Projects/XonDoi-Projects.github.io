import { FunctionComponent, createRef, useEffect, useState } from 'react'
import { Container } from '../LayoutComponents'
import { Typography } from '../LayoutComponents/Typography'
import { SkillsShowcase } from './SkillsShowcase'
import { useDarkTheme, useSize } from '../Providers'
import Image from 'next/image'
import { colors } from '../Colors'
import Link from 'next/link'
import { Button } from '../InputComponents'
import { BiSolidDownload } from 'react-icons/bi'

export interface ISkill {
    src: string
    alt: string
}

const skills: ISkill[] = [
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
                width: '100%',
                paddingLeft: mobile.mobile ? undefined : '110px'
            }}
        >
            <Container
                sx={{
                    width: mobile.mobile ? mobile.size?.width : '100%',
                    height: mobile.mobile ? undefined : '100%',
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
                        <Link
                            href="/Nathan_Magro_Resume.pdf"
                            download="NathanMagro_Resume.pdf"
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
                        justifyContent: 'center'
                    }}
                >
                    <Container
                        sx={{
                            height: mobile.mobile ? 'fit-content' : '360px',
                            width: 'fit-content',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            marginLeft: mobile.mobile ? '0px' : '100px',
                            marginBottom: mobile.mobile ? '0px' : '30px',
                            marginTop: mobile.mobile ? '0px' : '30px',
                            overflowY: 'auto'
                        }}
                        hidescrollBar
                    >
                        <Typography
                            variant="body"
                            sx={{
                                fontSize: '24px',
                                lineHeight: mobile.mobile ? undefined : '30px'
                            }}
                        >
                            I am a Front-end Web Developer, focused on building reusable components,
                            user interfaces, data display, and forms. I also have experience in
                            library management and version control.I also worked in Back-end
                            Development, specifically connecting routes with Front-End endpoints,
                            and services. I am passionate about crafting smooth and intuitive UIs to
                            deliver the best possible experience for our clients.
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
