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

    const [scrollPosition, setScrollPosition] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [touchVelocity, setTouchVelocity] = useState(0)
    const requestRef = useRef<number>()

    useEffect(() => {
        if (scrollTo === 0) {
            aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (scrollTo === 1) {
            educationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (scrollTo === 2) {
            hobbyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [mobile, scrollTo])

    const updateScrollPosition = useCallback(() => {
        const bannerTop = bannerRef.current?.getBoundingClientRect().top
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
        } else if (mobile && size && bannerTop !== undefined) {
            const { innerHeight } = window

            if (
                aboutTop &&
                aboutBottom &&
                ((aboutTop < innerHeight / 4 && aboutTop >= 0) ||
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
            } else if (bannerTop && bannerTop > -100) {
                setScrollTo(undefined)
                setShowMobile(false)
            }
        }
    }, [mobile, size])

    //----------------- Mobile Momentum Scrolling Logic ------------------------

    const animateScroll = useCallback(() => {
        if (scrollPosition) {
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
            } else {
                setScrollPosition(0)
            }
        }
    }, [scrollPosition, touchEnd, touchStart, touchVelocity, updateScrollPosition])

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStart(e.touches[0].clientY)
        setScrollPosition(0)
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

                                if (mobile) {
                                    setShowMobile(true)
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
                                Despite my nontraditional background in Web Development, I have
                                acquired comprehensive knowledge and expertise in a range of
                                technologies, including React, Typescript, and Javascript. During my
                                tenure in this field, I have honed my ability to write abstracted
                                and optimized code.
                            </Typography>
                            <Typography
                                sx={{
                                    marginRight: mobile ? '30px' : '0px'
                                }}
                            >
                                At Sector Eleven Ltd., I collaborated with a team of three
                                individuals, primarily functioning as a Front-end Developer. As part
                                of the team, I successfully delivered multiple B2C and B2B projects
                                by integrating project-specific features and building complex
                                components, such as a recursive selector. I played a major role in
                                the development of an in-house component library that allowed for
                                seamless customization across projects.
                            </Typography>
                            <Typography
                                sx={{
                                    marginRight: mobile ? '30px' : '0px'
                                }}
                            >
                                By leveraging this custom component library, my team achieved a
                                remarkable 65% increase in project development efficiency, leading
                                to expedited timelines and enhanced productivity. This
                                accomplishment stands as a testament to my ability to deliver
                                tangible results and drive successful project outcomes.
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
                                I was born and raised on the sunny, Mediterranean, island of Malta,
                                so it is safe to say I was not fully prepared for my first winter in
                                Chicagoland. Although I am still getting used to the cold, I can now
                                truly appreciate the beauty of fresh-fallen snow. Football (or
                                soccer, <i>I guess</i>) is one of my passions, and I am die-hard
                                Juventus fan. My current goal is to teach myself how to play tennis,
                                but let’s just say I won’t be giving up my career in Web Development
                                any time soon.
                            </Typography>
                            <Typography
                                sx={{
                                    marginRight: mobile ? '30px' : '0px'
                                }}
                            >
                                In my downtime, I like to watch TV and anime - I have been actively
                                keeping up with One Piece since I was 15, so you <i>know</i> I am
                                committed! I also am an avid PC gamer, although lately I have been
                                exploring more PS5 gameplay. If you want to team-up on PUBG, are in
                                the mood for a corny joke, or just want a good cup of tea, I am your
                                guy.
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
                                sx={{ marginRight: mobile ? '30px' : '0px', marginBottom: '20px' }}
                            />
                            <Accordian
                                title="Favorite TV Shows"
                                data={[
                                    '1. Band of Brothers',
                                    '2. Black Sails',
                                    '3. Vikings',
                                    '4. The Boys',
                                    '5. Peaky Blinders'
                                ]}
                                sx={{ marginRight: mobile ? '30px' : '0px', marginBottom: '20px' }}
                            />
                            <Accordian
                                title="Favorite Games"
                                data={[
                                    '1. PUBG',
                                    '2. God of War',
                                    '3. The Last of Us',
                                    '4. Rocket League',
                                    '5. OG Pokemon'
                                ]}
                                sx={{ marginRight: mobile ? '30px' : '0px', marginBottom: '20px' }}
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
