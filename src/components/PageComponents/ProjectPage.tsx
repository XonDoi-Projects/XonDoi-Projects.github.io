import { FunctionComponent, createRef, useCallback, useEffect, useRef, useState } from 'react'
import { Accordian, Container } from '../LayoutComponents'
import { useDarkTheme, useSize } from '../Providers'
import { Typography } from '../LayoutComponents/Typography'
import Link from 'next/link'
import { colors } from '../Colors'
import { BiRightArrowAlt } from 'react-icons/bi'
import { Button } from '../InputComponents'

// const navigation = [{ text: 'Experience' }, { text: 'Education' }, { text: 'Hobbies' }]

export interface ProjectPageProps {}

export const ProjectPage: FunctionComponent<ProjectPageProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()

    const [scrollTo, setScrollTo] = useState<number | undefined>(mobile.mobile ? undefined : 0)

    const parentRef = useRef<HTMLDivElement | null>(null)
    const projectRef = createRef<HTMLDivElement>()
    const educationRef = createRef<HTMLDivElement>()
    const hobbyRef = createRef<HTMLDivElement>()

    // useEffect(() => {
    //     if (scrollTo === 0) {
    //         projectRef.current?.scrollIntoView({ behavior: 'smooth' })
    //     } else if (scrollTo === 1) {
    //         educationRef.current?.scrollIntoView({ behavior: 'smooth' })
    //     } else if (scrollTo === 2) {
    //         hobbyRef.current?.scrollIntoView({ behavior: 'smooth' })
    //     }
    // }, [projectRef, educationRef, hobbyRef, mobile.mobile, scrollTo])

    const updateScrollPosition = useCallback(() => {
        if (
            parentRef.current &&
            hobbyRef.current &&
            projectRef.current &&
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
                hobbyRef.current?.scrollIntoView({ behavior: 'smooth' })
            } else if (
                educationRef.current?.getBoundingClientRect().top <=
                    parentRef.current?.getBoundingClientRect().bottom - 200 &&
                educationRef.current?.getBoundingClientRect().top >=
                    parentRef.current?.getBoundingClientRect().top
            ) {
                setScrollTo(1)
                educationRef.current?.scrollIntoView({ behavior: 'smooth' })
            } else if (
                projectRef.current?.getBoundingClientRect().top <=
                    parentRef.current?.getBoundingClientRect().bottom - 150 &&
                projectRef.current?.getBoundingClientRect().top + 100 >=
                    parentRef.current?.getBoundingClientRect().top
            ) {
                setScrollTo(0)
                projectRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
        } else if (mobile.mobile) {
            setScrollTo(undefined)
        }
    }, [projectRef, educationRef, hobbyRef, mobile.mobile])

    useEffect(() => {
        const element = document.getElementById('parentDetailsScroll')

        element?.removeEventListener('wheel', updateScrollPosition)
        element?.addEventListener('wheel', updateScrollPosition)

        return () => element?.removeEventListener('wheel', updateScrollPosition)
    }, [updateScrollPosition])

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
                        Projects
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: '28px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            margin: '0px',
                            textTransform: 'uppercase',
                            justifyContent: mobile.mobile ? 'center' : 'flex-start',
                            alignItems: 'center',
                            marginBottom: '10px',
                            marginLeft: mobile.mobile ? '0px' : '30px'
                        }}
                    >
                        Coming Soon...
                    </Typography>
                    {/* {navigation.map((nav, index) => (
                        <Button
                            key={index}
                            href={nav.text}
                            sx={{
                                flexDirection: 'row',
                                display: 'flex',
                                justifyContent: mobile.mobile ? 'center' : 'flex-start',
                                alignItems: 'center',
                                marginBottom: '10px',
                                marginLeft: mobile.mobile ? '0px' : '30px'
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
                    ))} */}
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
                        <Container />
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
