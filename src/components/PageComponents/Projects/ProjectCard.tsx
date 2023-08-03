import { colors } from '@/components/Colors'
import { Card, Container } from '@/components/LayoutComponents'
import { Typography } from '@/components/LayoutComponents/Typography'
import { useSize, useDarkTheme } from '@/components/Providers'
import { keyframes } from '@emotion/react'
import Link from 'next/link'
import { CSSProperties, FunctionComponent, useState } from 'react'

export interface Project {
    title: string
    description: string
    link?: string
}
export interface ProjectCardProps {
    sx?: CSSProperties
    project: Project
}

const scaleUp = keyframes({
    '0%': { transform: 'scale(1)', transformOrigin: 'center' },
    '100%': { transform: 'scale(1.1)', transformOrigin: 'center' }
})

const scaleDown = keyframes({
    '100%': { transform: 'scale(1)', transformOrigin: 'center' },
    '0%': { transform: 'scale(1.1)', transformOrigin: 'center' }
})

export const ProjectCard: FunctionComponent<ProjectCardProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()
    const [hover, setHover] = useState<boolean>()
    return (
        <Card
            sx={{
                flex: 1,
                position: 'relative',
                width: '100%',
                height: 'fit-content',
                border: 'solid',
                borderWidth: '1px',
                borderColor: light ? colors.light.accent : colors.dark.accent,
                boxSizing: 'border-box',
                justifyContent: 'center',
                alignItems: 'center',
                margin: mobile.mobile ? '0px 0px 20px 0px ' : '20px 0px',
                animation: `${hover ? scaleUp : hover !== undefined ? scaleDown : undefined}`,
                animationDuration: '0.1s',
                animationDirection: 'normal',
                animationTimingFunction: 'ease-in',
                animationFillMode: 'forwards',
                ...props.sx
            }}
        >
            {props.project.link ? (
                <Link href={props.project.link} style={{ width: '100%', textDecoration: 'none' }}>
                    <Container
                        sx={{
                            flexDirection: 'column',
                            flex: 1,
                            width: '100%',
                            height: 'fit-content',
                            padding: '20px',
                            overflow: 'auto'
                        }}
                        hidescrollBar
                        onMouseEnter={(e) => {
                            e.preventDefault()
                            setHover(true)
                        }}
                        onMouseLeave={(e) => {
                            e.preventDefault()
                            setHover(false)
                        }}
                    >
                        <Typography
                            variant="subtitle"
                            sx={{ fontSize: '30px', marginTop: '10px', marginBottom: '10px' }}
                        >
                            {props.project.title}
                        </Typography>
                        <Typography variant="body" sx={{ flex: 1 }}>
                            {props.project.description}
                        </Typography>
                    </Container>
                </Link>
            ) : (
                <Container
                    sx={{
                        flexDirection: 'column',
                        flex: 1,
                        width: '100%',
                        height: 'fit-content',
                        padding: '20px',
                        overflow: 'auto'
                    }}
                    hidescrollBar
                    onMouseEnter={(e) => {
                        e.preventDefault()
                        setHover(true)
                    }}
                    onMouseLeave={(e) => {
                        e.preventDefault()
                        setHover(false)
                    }}
                >
                    <Typography
                        variant="subtitle"
                        sx={{ fontSize: '30px', marginTop: '10px', marginBottom: '10px' }}
                    >
                        {props.project.title}
                    </Typography>
                    <Typography variant="body" sx={{ flex: 1 }}>
                        {props.project.description}
                    </Typography>
                </Container>
            )}
        </Card>
    )
}
