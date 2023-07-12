import { FunctionComponent, useRef, useState } from 'react'
import { Card, Container, FixedDiv } from '../LayoutComponents'
import { useDarkTheme } from '../Providers'
import { colors } from '../Colors'
import { Button } from './Button'
import { BiChat } from 'react-icons/bi'
import { ContactMeForm } from '../PageComponents'
import { useClickOutside } from '../hooks'

export interface ChatButtonProps {}

export const ChatButton: FunctionComponent<ChatButtonProps> = (props) => {
    const { light } = useDarkTheme()

    const [show, setShow] = useState(false)

    const popupRef = useRef<HTMLDivElement | null>(null)

    useClickOutside(popupRef, () => setShow(false))

    return (
        <FixedDiv
            sx={{
                bottom: '50px',
                right: '50px',
                width: '50px',
                height: '50px',
                boxShadow: `0 0px 20px  ${light ? colors.light.secondary : colors.dark.secondary}`,
                overflow: 'visible',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                zIndex: 1
            }}
        >
            <Button
                sx={{
                    width: '100%',
                    height: '100%',
                    padding: '0px',
                    borderRadius: '50%',
                    backgroundColor: light ? colors.light.background : colors.dark.background
                }}
                onClick={() => setShow(!show)}
            >
                <BiChat style={{ fontSize: '30px' }} />
            </Button>

            <Container
                ref={popupRef}
                sx={{
                    position: 'absolute',
                    bottom: '50px',
                    right: 0,
                    height: show ? '510px' : '0px',
                    opacity: show ? 1 : 0,
                    width: '300px',
                    transition: 'height 0.1s, opacity 0.5s',
                    transitionTimingFunction: 'ease-in',
                    zIndex: 2,
                    borderRadius: '50px',
                    overflow: show ? 'visible' : 'hidden'
                }}
            >
                <Card
                    sx={{
                        flexDirection: 'column',
                        padding: '20px',
                        width: '100%',
                        height: 'calc(100% - 40px)',
                        backgroundColor: light ? colors.light.background : colors.dark.background,
                        boxShadow: `0 0px 20px  ${
                            light ? colors.light.secondary : colors.dark.secondary
                        }`,
                        borderRadius: '50px'
                    }}
                >
                    <ContactMeForm />
                </Card>
            </Container>
        </FixedDiv>
    )
}
