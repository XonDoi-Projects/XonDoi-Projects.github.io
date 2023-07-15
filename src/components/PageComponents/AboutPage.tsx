import {
    FunctionComponent,
    TouchEventHandler,
    createRef,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import { Accordian, Container } from '../LayoutComponents'
import { useDarkTheme, useSize } from '../Providers'
import { Typography } from '../LayoutComponents/Typography'
import Link from 'next/link'
import { colors } from '../Colors'
import { BiRightArrowAlt } from 'react-icons/bi'
import { Button } from '../InputComponents'
import { AboutMobileOverlay } from '../LayoutComponents/AboutMobileOverlay'

const navigation = [{ text: 'Experience' }, { text: 'Education' }, { text: 'Hobbies' }]

export interface AboutPageProps {}

export const AboutPage: FunctionComponent<AboutPageProps> = (props) => {
    const { mobile, size } = useSize()
    const { light } = useDarkTheme()

    const [scrollTo, setScrollTo] = useState<number | undefined>(mobile ? undefined : 0)

    const bannerRef = useRef<HTMLDivElement | null>(null)
    const parentRef = useRef<HTMLDivElement | null>(null)
    const aboutRef = useRef<HTMLDivElement | null>(null)
    const educationRef = useRef<HTMLDivElement | null>(null)
    const hobbyRef = useRef<HTMLDivElement | null>(null)

    const [showMobile, setShowMobile] = useState(false)

    const [_, setScrollPosition] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [touchVelocity, setTouchVelocity] = useState(0)
    const requestRef = useRef<number>()

    useEffect(() => {
        // if (!mobile) {
        if (scrollTo === 0) {
            aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (scrollTo === 1) {
            educationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (scrollTo === 2) {
            hobbyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        // }
    }, [mobile, scrollTo])

    const updateScrollPosition = useCallback(() => {
        const bannerBottom = bannerRef.current?.getBoundingClientRect().bottom
        const parentBottom = parentRef.current?.getBoundingClientRect().bottom
        const parentTop = parentRef.current?.getBoundingClientRect().top
        const aboutTop = aboutRef.current?.getBoundingClientRect().top
        const aboutBottom = aboutRef.current?.getBoundingClientRect().bottom
        const educationTop = educationRef.current?.getBoundingClientRect().top
        const educationBottom = aboutRef.current?.getBoundingClientRect().bottom
        const hobbyTop = hobbyRef.current?.getBoundingClientRect().top
        const hobbyBottom = aboutRef.current?.getBoundingClientRect().bottom

        if (!mobile && size) {
            if (
                aboutTop &&
                parentBottom &&
                parentTop &&
                aboutTop <= parentBottom - 150 &&
                aboutTop + 100 >= parentTop
            ) {
                setScrollTo(0)
            } else if (
                educationTop &&
                parentTop &&
                parentBottom &&
                educationTop <= parentBottom - 200 &&
                educationTop >= parentTop
            ) {
                setScrollTo(1)
            } else if (
                hobbyTop &&
                parentBottom &&
                parentTop &&
                hobbyTop <= parentBottom - 100 &&
                hobbyTop >= parentTop
            ) {
                setScrollTo(2)
            }
        } else if (mobile && size && bannerBottom !== undefined) {
            const { innerHeight } = window

            if (
                aboutTop &&
                aboutBottom &&
                ((aboutTop < innerHeight / 2 && aboutTop >= 0) ||
                    (aboutBottom > innerHeight / 2 && aboutBottom <= innerHeight))
            ) {
                setShowMobile(true)
                setScrollTo(0)
            } else if (
                educationTop &&
                educationBottom &&
                ((educationTop < innerHeight / 2 && educationTop >= 0) ||
                    (educationBottom > innerHeight / 2 && educationBottom <= innerHeight))
            ) {
                setShowMobile(true)
                setScrollTo(1)
            } else if (
                hobbyTop &&
                hobbyBottom &&
                ((hobbyTop < innerHeight / 2 && hobbyTop >= 0) ||
                    (hobbyBottom > innerHeight / 2 && hobbyBottom <= innerHeight))
            ) {
                setShowMobile(true)
                setScrollTo(2)
            } else if (bannerBottom && bannerBottom > innerHeight / 4) {
                setScrollTo(undefined)
                setShowMobile(false)
            }
        }
    }, [mobile, size])

    //----------------- Mobile Momentum Scrolling Logic ------------------------

    const animateScroll = () => {
        updateScrollPosition()
        setScrollPosition((prevPosition) => {
            const currentPosition = touchEnd
            const delta = touchStart - currentPosition
            setTouchVelocity(delta)
            setTouchStart(currentPosition)

            return prevPosition + delta
        })

        if (Math.abs(touchVelocity) > 0.1) {
            requestRef.current = requestAnimationFrame(animateScroll)
        }
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStart(e.touches[0].clientY)
        cancelAnimationFrame(requestRef.current as number)
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        updateScrollPosition()
        setScrollPosition((prevPosition) => {
            const currentPosition = e.touches[0].clientY
            const delta = touchStart - currentPosition
            setTouchVelocity(delta)
            setTouchStart(currentPosition)

            return prevPosition + delta
        })
    }

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.changedTouches[0].clientY)
        requestRef.current = requestAnimationFrame(animateScroll)
    }

    //---------------------------- End ---------------------------------

    return (
        <Container
            sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}
            hidescrollBar
            onWheel={updateScrollPosition}
            onTouchMove={(e) => setTimeout(() => handleTouchMove(e), 100)}
            onTouchStart={(e) => setTimeout(() => handleTouchStart(e), 100)}
            onTouchEnd={(e) => setTimeout(() => handleTouchEnd(e), 100)}
        >
            <Container
                sx={{
                    flexDirection: mobile ? 'column' : 'row',
                    width: mobile ? size?.width : '100%',
                    height: mobile ? '100%' : '100%'
                }}
            >
                <Container
                    ref={bannerRef}
                    sx={{
                        width: mobile ? '100%' : '35%',
                        height: mobile ? 'fit-content' : '100vh',
                        padding: '30px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: mobile ? 'center' : 'flex-start',
                        backgroundColor: light ? colors.light.accent : colors.dark.accent
                    }}
                >
                    <Typography
                        variant="supertitle"
                        sx={{
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            marginLeft: mobile ? '0px' : '20px'
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
                                justifyContent: mobile ? 'center' : 'flex-start',
                                alignItems: 'center',
                                marginBottom: '10px',
                                marginLeft: mobile ? '0px' : '15px'
                            }}
                            onClick={() => {
                                if (index === 2) {
                                    setScrollTo(2)
                                    hobbyRef.current?.scrollIntoView({ behavior: 'smooth' })
                                } else if (index === 1) {
                                    setScrollTo(1)
                                    educationRef.current?.scrollIntoView({ behavior: 'smooth' })
                                } else {
                                    setScrollTo(0)
                                    aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
                                }
                            }}
                            swapHover
                        >
                            <Typography
                                variant="linker"
                                sx={{
                                    fontFamily: '"Montserrat", sans-serif',
                                    fontSize: scrollTo === index && !mobile ? '28px' : '22px',
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
                                    fontSize: scrollTo === index && !mobile ? '28px' : '22px'
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
                        width: mobile ? '100%' : '55%',
                        height: mobile ? 'fit-content' : '100vh',
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
                            width: mobile ? '100%' : '70%',
                            height: mobile ? '100%' : '70%',
                            overflowY: mobile ? 'hidden' : 'auto',
                            overflowX: 'hidden'
                        }}
                        hidescrollBar
                    >
                        <Container
                            ref={aboutRef}
                            sx={{
                                flexDirection: 'column',
                                width: '100%'
                            }}
                        >
                            <Typography
                                variant="subtitle"
                                sx={{ marginTop: '62px', marginBottom: '15px' }}
                            >
                                <big>E</big>xperience
                            </Typography>
                            <Typography
                                sx={{
                                    marginRight: mobile ? '30px' : '0px'
                                }}
                            >
                                I am flexible and can adapt to newer technologies because I am a
                                fast-learner. Despite my background not initially being in Front-end
                                Web Development, I was able to learn technologies such as React,
                                Typescript, Javascript, HTML, CSS and others. Moreover, in over a
                                year of work experience in this field, I learned to write such code
                                in a way that is abstracted, readble and optimized. This site was
                                built using custom-built, reusable components on NextJs framework,
                                with React, Typescript, and Styled Components.
                            </Typography>
                            <Typography
                                sx={{
                                    marginRight: mobile ? '30px' : '0px'
                                }}
                            >
                                At Sector Eleven Ltd. I worked on the Front-End aspect of multiple
                                B2C and B2B projects with a team of 3 (1 Back-End 1 Full-Stack and 1
                                Front-End). This would typically involve the creation of the site
                                components, feature integration, api calls to the backend-end
                                server, data visualization (tables, autocompletes) with querying and
                                pagination, and feature testing.
                            </Typography>
                            <Typography
                                sx={{
                                    marginRight: mobile ? '30px' : '0px'
                                }}
                            >
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
                                width: '100%'
                            }}
                        >
                            <Typography
                                variant="subtitle"
                                sx={{ marginTop: '62px', marginBottom: '15px' }}
                            >
                                <big>E</big>ducation
                            </Typography>
                            <Typography
                                sx={{
                                    marginRight: mobile ? '30px' : '0px'
                                }}
                            >
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
                                on Image Processing (ICIP) in Alaska. Outside of my thesis, I also
                                studied AI, Machine Learning, Python, C, and C++.
                            </Typography>
                        </Container>
                        <Container
                            ref={hobbyRef}
                            sx={{
                                flexDirection: 'column',
                                width: '100%'
                            }}
                        >
                            <Typography
                                variant="subtitle"
                                sx={{ marginTop: '62px', marginBottom: '15px' }}
                            >
                                <big>H</big>obbies
                            </Typography>
                            <Typography
                                sx={{
                                    marginRight: mobile ? '30px' : '0px'
                                }}
                            >
                                I was born and raised on the warm Mediterranean island of Malta, so
                                I am still learning how to cope with the snow in the states. I have
                                always loved football - or rather soccer - and I am a big Juventus
                                fan. Currently, I am (unsuccessfully) trying to teach myself how to
                                play tennis.
                            </Typography>
                            <Typography
                                sx={{
                                    marginRight: mobile ? '30px' : '0px'
                                }}
                            >
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
                                sx={{ marginRight: mobile ? '30px' : '0px' }}
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
                                sx={{ marginRight: mobile ? '30px' : '0px' }}
                            />
                        </Container>
                    </Container>
                </Container>
            </Container>
            <AboutMobileOverlay
                show={mobile && showMobile && scrollTo !== undefined ? true : false}
                showIndex={scrollTo}
                setShowIndex={setScrollTo}
            />
        </Container>
    )
}
