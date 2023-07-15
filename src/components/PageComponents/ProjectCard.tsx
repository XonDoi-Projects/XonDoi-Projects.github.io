import { CSSProperties, FunctionComponent } from 'react'
import { Card, Container } from '../LayoutComponents'
import { useDarkTheme } from '../Providers'
import { colors } from '../Colors'
import { Typography } from '../LayoutComponents/Typography'

export interface Project {
    title: string
    description: string
}
export interface ProjectCardProps {
    sx?: CSSProperties
    project: Project
}

export const ProjectCard: FunctionComponent<ProjectCardProps> = (props) => {
    const { light } = useDarkTheme()
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
                marginBottom: '20px',
                ...props.sx
            }}
        >
            <Container
                sx={{
                    flexDirection: 'column',
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    padding: '20px'
                }}
            >
                <Typography variant="subtitle" sx={{ marginTop: '10px', marginBottom: '10px' }}>
                    {props.project.title}
                </Typography>
                <Typography variant="body" sx={{ flex: 1 }}>
                    {props.project.description}
                </Typography>
            </Container>
        </Card>
    )
}
