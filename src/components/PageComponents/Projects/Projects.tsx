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
                height: 'fit-content',
                width: '85%',
                padding: '20px 0px',
                ...props.sx
            }}
        >
            {props.projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </Container>
    )
}
