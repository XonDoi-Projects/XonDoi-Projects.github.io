import { FunctionComponent, createRef, useCallback, useEffect, useRef, useState } from 'react'
import { Container } from '../LayoutComponents'
import { useDarkTheme, useSize } from '../Providers'
import { Typography } from '../LayoutComponents/Typography'
import Link from 'next/link'
import { colors } from '../Colors'
import { BiRightArrowAlt } from 'react-icons/bi'
import { Button } from '../InputComponents'

const navigation = [{ text: 'Experience' }, { text: 'Education' }, { text: 'Hobbies' }]

export interface AboutPageProps {}

export const AboutPage: FunctionComponent<AboutPageProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()

    const [scrollTo, setScrollTo] = useState<number>(0)

    const parentRef = useRef<HTMLDivElement | null>(null)
    const aboutRef = createRef<HTMLDivElement>()
    const educationRef = createRef<HTMLDivElement>()
    const hobbyRef = createRef<HTMLDivElement>()

    useEffect(() => {
        if (scrollTo === 0) {
            aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
        } else if (scrollTo === 1) {
            educationRef.current?.scrollIntoView({ behavior: 'smooth' })
        } else if (scrollTo === 2) {
            hobbyRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [aboutRef, educationRef, hobbyRef, scrollTo])

    const updateScrollPosition = useCallback(() => {
        if (
            parentRef.current &&
            hobbyRef.current &&
            aboutRef.current &&
            educationRef.current &&
            !mobile.mobile
        ) {
            if (
                hobbyRef.current?.getBoundingClientRect().top <=
                    parentRef.current?.getBoundingClientRect().bottom - 100 &&
                hobbyRef.current?.getBoundingClientRect().top >=
                    parentRef.current?.getBoundingClientRect().top
            ) {
                setScrollTo(2)
            } else if (
                educationRef.current?.getBoundingClientRect().top <=
                    parentRef.current?.getBoundingClientRect().bottom - 200 &&
                educationRef.current?.getBoundingClientRect().top >=
                    parentRef.current?.getBoundingClientRect().top
            ) {
                setScrollTo(1)
            } else if (
                aboutRef.current?.getBoundingClientRect().top <=
                    parentRef.current?.getBoundingClientRect().bottom - 150 &&
                aboutRef.current?.getBoundingClientRect().top + 100 >=
                    parentRef.current?.getBoundingClientRect().top
            ) {
                setScrollTo(0)
            }
        }
    }, [aboutRef, educationRef, hobbyRef, mobile.mobile])

    useEffect(() => {
        const element = document.getElementById('parentDetailsScroll')

        element?.removeEventListener('wheel', updateScrollPosition)
        element?.addEventListener('wheel', updateScrollPosition)

        return () => element?.removeEventListener('wheel', updateScrollPosition)
    }, [aboutRef, educationRef, hobbyRef, updateScrollPosition])

    return (
        <Container
            sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingLeft: mobile.mobile ? undefined : '110px'
            }}
            hidescrollBar
        >
            <Container
                sx={{
                    flexDirection: mobile.mobile ? 'column' : 'row',
                    justifyContent: 'flex-start',
                    width: mobile.mobile ? mobile.size?.width : '100%',
                    height: mobile.mobile ? '100%' : '100%'
                }}
            >
                <Container
                    sx={{
                        width: mobile.mobile ? '100%' : '35%',
                        minWidth: '360px',
                        height: '100%',
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
                        About Me
                    </Typography>
                    {navigation.map((nav, index) => (
                        <Button
                            key={index}
                            href={nav.text}
                            sx={{
                                flexDirection: 'row',
                                display: 'flex',
                                justifyContent: mobile.mobile ? 'center' : 'flex-start',
                                alignItems: 'center',
                                marginBottom: '10px',
                                marginLeft: mobile.mobile ? '0px' : '50px'
                            }}
                            onClick={() => setScrollTo(index)}
                            swapHover
                        >
                            <Typography
                                variant="linker"
                                sx={{
                                    fontSize:
                                        scrollTo === index && !mobile.mobile ? '28px' : '22px',
                                    color: light
                                        ? colors.light.accentForeground
                                        : colors.dark.accentForeground,
                                    margin: '0px 20px 0px 0px',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {nav.text}
                            </Typography>
                            <BiRightArrowAlt
                                style={{
                                    fontSize: scrollTo === index && !mobile.mobile ? '28px' : '22px'
                                }}
                                color={
                                    light
                                        ? colors.light.accentForeground
                                        : colors.dark.accentForeground
                                }
                            />
                        </Button>
                    ))}
                </Container>

                <Container
                    sx={{
                        width: mobile.mobile ? '100%' : '55%',
                        height: mobile.mobile ? 'fit-content' : '100%',
                        padding: '20px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Container
                        id="parentDetailsScroll"
                        ref={parentRef}
                        sx={{
                            flexDirection: 'column',
                            width: mobile.mobile ? '100%' : '70%',
                            height: mobile.mobile ? '100%' : '70%',
                            overflowY: mobile.mobile ? 'hidden' : 'auto',
                            overflowX: 'hidden'
                        }}
                        hidescrollBar
                    >
                        <Container
                            ref={aboutRef}
                            sx={{
                                flexDirection: 'column',
                                width: '100%',
                                marginBottom: '30px'
                            }}
                        >
                            <Typography variant="subtitle" sx={{ marginBottom: '20px' }}>
                                Experience
                            </Typography>
                            <Typography>
                                I am flexible and can adapt to newer technologies because I am a
                                fast-learner. Despite my background not initially being in Front-end
                                Web Development, I was able to learn technologies such as React,
                                Typescript, Javascript, HTML, CSS and others. Moreover, in over a
                                year of work experience in this field, I learned to write such code
                                in a way that is abstracted, readble and optimized. This site was
                                built using custom-built, reusable components on NextJs framework,
                                with React, Typescript, and Styled Components.
                            </Typography>
                            <Typography>
                                At Sector Eleven Ltd. I worked on the Front-End aspect of multiple
                                B2C and B2B projects with a team of 3 (1 Back-End 1 Full-Stack and 1
                                Front-End). This would typically involve the creation of the site
                                components, feature integration, api calls to the backend-end
                                server, data visualization (tables, autocompletes) with querying and
                                pagination, and feature testing.
                            </Typography>
                            <Typography>
                                Moreover, we created our own component library, with the main
                                purpose being to have reusable components while making sure that
                                they can be modified from project side as required. Using this
                                custom library resulted in an immediate increase in project
                                development efficiency by 65%.
                            </Typography>
                        </Container>
                        <Container
                            ref={educationRef}
                            sx={{
                                flexDirection: 'column',
                                width: '100%',
                                marginBottom: '30px'
                            }}
                        >
                            <Typography variant="subtitle" sx={{ marginBottom: '20px' }}>
                                Education
                            </Typography>
                            <Typography>
                                I have a Masters Degree in Electrical Engineering, specializing in
                                Image/Signal Processing. During the duration of this course I
                                learned about pre-processing algorithms, image segmentation
                                algorithms, and image/signal classification methods. I also briefly
                                learned about AI, Machine Learning, and Python. During the course I
                                published a paper at ICIP 2021.
                            </Typography>
                            <Link
                                href="https://ieeexplore.ieee.org/document/9506558"
                                target="_blank"
                            >
                                <Typography sx={{ fontStyle: 'italic' }}>
                                    Hyperspectral Image Segmentation For Paint Analysis
                                </Typography>
                            </Link>
                            <Typography>
                                My Bachelors degree is in Biomedical Engineering (Electronics), in
                                which I learned about Biomedical electronics, Systems & Control
                                engineering, Digital/Analogue electronics, and Microcontroller
                                programming.
                            </Typography>
                        </Container>
                        <Container
                            ref={hobbyRef}
                            sx={{
                                flexDirection: 'column',
                                width: '100%'
                            }}
                        >
                            <Typography variant="subtitle" sx={{ marginBottom: '20px' }}>
                                Hobbies
                            </Typography>
                            <Typography>
                                I am an avid anime watcher. My favourite all time anime is Naruto,
                                still following One Piece and also enjoy recently created animes.
                            </Typography>
                            <Typography>
                                I also enjoy AAA video game titles, competitive online games such as
                                PUBG (although getting older does not help with reaction speed).
                            </Typography>
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
