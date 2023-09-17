import { colors } from '@/components/Colors'
import { Button } from '@/components/InputComponents'
import { Container } from '@/components/LayoutComponents'
import { Typography } from '@/components/LayoutComponents/Typography'
import { useSize, useDarkTheme } from '@/components/Providers'
import { FunctionComponent, createRef, useEffect, useRef, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { ISkill } from '../MainPage'
import { SkillMobile } from './SkillMobile'
import { SkillDesktop } from './SkillDesktop'

export interface SkillsShowcaseProps {
    skills: ISkill[]
}

export const SkillsShowcase: FunctionComponent<SkillsShowcaseProps> = (props) => {
    const [scrollIntoView, setScrollIntoView] = useState<number>()
    const mobile = useSize()
    const { light } = useDarkTheme()
    const skillsShowcaseRef = createRef<HTMLDivElement>()
    const skillsRef = useRef<HTMLDivElement>(null)
    const requestRef = useRef<number>()

    const [skillsShowcaseWidth, setSkillsShowcaseWidth] = useState(0)

    const [touchStart, setTouchStart] = useState(0)

    useEffect(() => {
        if (skillsShowcaseRef.current) {
            setSkillsShowcaseWidth(skillsShowcaseRef.current.getBoundingClientRect().width)
        }
    }, [mobile, skillsRef, skillsShowcaseRef])

    //----------------- Mobile Momentum Scrolling Logic ------------------------

    const updateScrollPosition = () => {
        let elementScroll = skillsRef.current?.scrollLeft
        let scrollPos = Math.round((elementScroll || 0) / skillsShowcaseWidth)
        setScrollIntoView(scrollPos)
    }

    const animateScroll = (currentPosition: number, touchEnd?: number) => {
        let delta: number

        updateScrollPosition()

        if (touchEnd) {
            delta = touchStart - touchEnd
        } else {
            delta = touchStart - currentPosition
        }

        if (Math.abs(delta) > 0.1) {
            requestRef.current = requestAnimationFrame(() =>
                animateScroll(currentPosition + delta * 0.2)
            )
        }
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStart(e.touches[0].clientX)
        cancelAnimationFrame(requestRef.current as number)
    }

    const handleTouchMove = () => {
        updateScrollPosition()
    }

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (Math.abs(touchStart - e.changedTouches[0].clientX) > 10) {
            requestRef.current = requestAnimationFrame(() =>
                animateScroll(touchStart - e.changedTouches[0].clientX, e.changedTouches[0].clientX)
            )
        }
    }

    //---------------------------- End ---------------------------------

    return (
        <Container
            ref={skillsShowcaseRef}
            sx={{
                flexDirection: 'column',
                width: mobile.mobile ? '100%' : (200 / 2 + 20) * 4 + 'px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px'
            }}
        >
            <Typography
                variant="subtitle"
                sx={{
                    fontSize: '32px',
                    color: light ? colors.light.accent : colors.dark.accent,
                    textAlign: 'center',
                    margin: '0px'
                }}
            >
                Technology Stack
            </Typography>
            {mobile.mobile ? (
                <Container sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Container
                        sx={{
                            position: 'absolute',
                            flexDirection: 'row',
                            zIndex: 1,
                            top: '50%',
                            left: 0,
                            transform: 'translateY(-50%)',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            sx={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                opacity: !scrollIntoView ? 0.5 : 1,
                                padding: '0px',
                                zIndex: 1,
                                backgroundColor: 'transparent'
                            }}
                            onClick={() =>
                                setScrollIntoView(
                                    scrollIntoView ? scrollIntoView - 1 : props.skills.length - 1
                                )
                            }
                            disabled={!scrollIntoView}
                        >
                            <BiChevronLeft
                                style={{ fontSize: '40px', backgroundColor: 'transparent' }}
                            />
                        </Button>
                    </Container>
                    <Container
                        sx={{
                            position: 'absolute',
                            flexDirection: 'row',
                            zIndex: 1,
                            top: '50%',
                            right: 0,
                            transform: 'translateY(-50%)',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            sx={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                opacity: scrollIntoView === props.skills.length - 1 ? 0.5 : 1,
                                padding: '0px',
                                zIndex: 1,
                                backgroundColor: 'transparent'
                            }}
                            onClick={() =>
                                setScrollIntoView(scrollIntoView ? scrollIntoView + 1 : 1)
                            }
                            disabled={scrollIntoView === props.skills.length - 1}
                        >
                            <BiChevronRight
                                style={{ fontSize: '40px', backgroundColor: 'transparent' }}
                            />
                        </Button>
                    </Container>
                    <Container
                        ref={skillsRef}
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '200px',
                            overflowX: 'auto',
                            overflowY: 'hidden'
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onTouchMove={handleTouchMove}
                        hidescrollBar
                    >
                        {props.skills.map((skill, index) => (
                            <SkillMobile
                                key={index}
                                src={skill.src}
                                alt={skill.alt}
                                link={skill.link}
                                scrollIntoViewPointer={index === scrollIntoView}
                                parentWidth={skillsShowcaseWidth}
                            />
                        ))}
                    </Container>
                </Container>
            ) : (
                <Container
                    sx={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Container
                        sx={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            flex: 1,
                            width: '100%',
                            height: '200px',
                            gap: '30px',
                            justifyContent: 'space-between',
                            alignContent: 'center'
                        }}
                    >
                        {props.skills.map((skill, index) => (
                            <Container
                                key={index}
                                sx={{
                                    width: skillsShowcaseWidth / 4 - 40 + 'px',
                                    height: skillsShowcaseWidth / 4 - 40 + 'px',
                                    minWidth: '50px',
                                    minHeight: '50px'
                                }}
                            >
                                <SkillDesktop
                                    src={skill.src}
                                    alt={skill.alt}
                                    link={skill.link}
                                    scrollIntoViewPointer={index === scrollIntoView}
                                    parentWidth={skillsShowcaseWidth}
                                />
                            </Container>
                        ))}
                    </Container>
                </Container>
            )}
        </Container>
    )
}
