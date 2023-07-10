import { FunctionComponent, createRef, useCallback, useEffect, useRef, useState } from 'react'
import { Accordian, Container } from '../LayoutComponents'
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

    const [scrollTo, setScrollTo] = useState<number | undefined>(mobile.mobile ? undefined : 0)

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
    }, [aboutRef, educationRef, hobbyRef, mobile.mobile, scrollTo])

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
                paddingLeft: mobile.mobile ? undefined : '110px'
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
                                    fontFamily: '"Montserrat", sans-serif',
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
                            <Typography variant="subtitle" sx={{ marginBottom: '15px' }}>
                                <big>E</big>xperience
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
                            <Typography variant="subtitle" sx={{ marginBottom: '15px' }}>
                                <big>E</big>ducation
                            </Typography>
                            <Typography>
                                I earned a Master’s Degree in Electrical Engineering, specializing
                                in Image and Signal Processing. My thesis focused on using
                                Hyperspectral image segmentation and signal classification to
                                analyze paintings to identify the exact pigment mixtures used to
                                create them. My algorithm for pigment identification allowed for the
                                effective restoration of artwork without using destructive
                                analytical methods. This led to a{' '}
                                <Link
                                    href="https://ieeexplore.ieee.org/document/9506558"
                                    target="_blank"
                                    style={{
                                        display: 'inline-flex',
                                        textDecorationColor: light
                                            ? colors.light.primary
                                            : colors.dark.primary,
                                        textUnderlineOffset: '3px',
                                        fontWeight: 'bold',
                                        color: light ? colors.light.primary : colors.dark.primary
                                    }}
                                >
                                    publication
                                </Link>{' '}
                                that I successfully presented at the 2021 International Conference
                                on Image Processing (ICIP). Outside of my thesis, I also studied AI,
                                Machine Learning, Python, C, and C++.
                            </Typography>
                        </Container>
                        <Container
                            ref={hobbyRef}
                            sx={{
                                flexDirection: 'column',
                                width: '100%'
                            }}
                        >
                            <Typography variant="subtitle" sx={{ marginBottom: '15px' }}>
                                <big>H</big>obbies
                            </Typography>
                            <Typography>
                                I was born and raised on the warm Mediterranean island of Malta, so
                                I am still learning how to cope with the snow in the states. I have
                                always loved football - or rather soccer - and I am a big Juventus
                                fan. Currently, I am (unsuccessfully) trying to teach myself how to
                                play tennis.
                            </Typography>
                            <Typography>
                                In my free time I like to watch anime (my current watchlist is
                                below), TV shows, and play PC games, although recently I have been
                                exploring PS5 gameplay. You can come to me for corny jokes, and a
                                nice cup of lemon tea.
                            </Typography>
                            <Accordian
                                title="Favorite Anime"
                                data={[
                                    '1. Naruto',
                                    '2. One Piece',
                                    '3. My Hero Academia',
                                    '4. Attack on Titan',
                                    '5. Demon Slayer'
                                ]}
                            />
                            <Container sx={{ height: '20px' }} />
                            <Accordian
                                title="Favorite TV Shows"
                                data={[
                                    '1. Band of Brothers',
                                    '2. Black Sails',
                                    '3. Vikings',
                                    '4. The Boys',
                                    '5. Peaky Blinders'
                                ]}
                            />
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
