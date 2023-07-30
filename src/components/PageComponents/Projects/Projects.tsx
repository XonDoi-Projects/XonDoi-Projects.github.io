import { CSSProperties, FunctionComponent } from 'react'
import { Project, ProjectCard } from './ProjectCard'
import { Container } from '../../LayoutComponents'

export interface ProjectsProps {
    sx?: CSSProperties
    projects: Project[]
}

export const Projects: FunctionComponent<ProjectsProps> = (props) => {
    return (
        <Container
            sx={{
                flex: 1,
                flexDirection: 'column',
                height: '100%',
                width: '85%',
                ...props.sx
            }}
        >
            {props.projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </Container>
    )
}
