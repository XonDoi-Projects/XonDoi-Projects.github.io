import React from 'react'

export const GlobalStyle = () => (
    <style
        dangerouslySetInnerHTML={{
            __html: `
            body {
                overflow: hidden;
                margin: 0px;
                padding: 0px;
            }
        `
        }}
    />
)
