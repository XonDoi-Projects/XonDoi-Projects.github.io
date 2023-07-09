import { FunctionComponent, createRef, useEffect, useState } from 'react'
import { Container } from '../LayoutComponents'
import { Typography } from '../LayoutComponents/Typography'
import { Skill } from './Skill'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { Button } from '../InputComponents'
import { useSize } from '../Providers'

export interface SkillsShowcaseProps {
    skills: { src: string; alt: string }[]
}

export const SkillsShowcase: FunctionComponent<SkillsShowcaseProps> = (props) => {
    const [scrollIntoView, setScrollIntoView] = useState<number>()
    const mobile = useSize()
    const skillsShowcaseRef = createRef<HTMLDivElement>()

    const [skillsShowcaseWidth, setSkillsShowcaseWidth] = useState(0)

    useEffect(() => {
        if (skillsShowcaseRef.current) {
            setSkillsShowcaseWidth(skillsShowcaseRef.current.getBoundingClientRect().width)
        }
    }, [mobile, skillsShowcaseRef])

    return (
        <Container
            ref={skillsShowcaseRef}
            sx={{
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Typography variant="title">Technology Stack</Typography>
            <Container sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Container
                    sx={{
                        position: 'absolute',
                        flexDirection: 'row',
                        width: skillsShowcaseWidth,
                        height: '200px',
                        overflowX: 'auto',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    hidescrollBar
                >
                    <Button
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            opacity: !scrollIntoView ? 0.5 : 1,
                            padding: '0px',
                            zIndex: 1,
                            background: 'transparent'
                        }}
                        onClick={() =>
                            setScrollIntoView(
                                scrollIntoView ? scrollIntoView - 1 : props.skills.length - 1
                            )
                        }
                        disabled={scrollIntoView === 0}
                    >
                        <BiChevronLeft style={{ fontSize: '30px' }} />
                    </Button>
                    <Button
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            opacity: scrollIntoView === props.skills.length - 1 ? 0.5 : 1,
                            padding: '0px',
                            zIndex: 1,
                            background: 'transparent'
                        }}
                        onClick={() => setScrollIntoView(scrollIntoView ? scrollIntoView + 1 : 1)}
                        disabled={scrollIntoView === props.skills.length - 1}
                    >
                        <BiChevronRight
                            style={{ fontSize: '30px', backgroundColor: 'transparent' }}
                        />
                    </Button>
                </Container>
                <Container
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '200px',
                        overflowX: 'auto',
                        overflowY: 'hidden'
                    }}
                    hidescrollBar
                >
                    {props.skills.map((skill, index) => (
                        <Skill
                            key={index}
                            src={skill.src}
                            alt={skill.alt}
                            scrollIntoViewPointer={index === scrollIntoView}
                            parentWidth={skillsShowcaseWidth}
                        />
                    ))}
                </Container>
            </Container>
        </Container>
    )
}
