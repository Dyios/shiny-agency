import React from 'react'
import Card from '../components/Card'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../utils/context'

describe('Test the card component', () => {
    it('should render the passed image from the props', async () => {
        render(
            <ThemeProvider>
                <Card picture={"testImage.png"} />
            </ThemeProvider>
        )
        const image = screen.getByRole('img')
        expect(image.src).toContain("testImage.png")
    })
    it('should render the passed title from the props', async () => {
        render(
            <ThemeProvider>
                <Card title={"Test Title"} />
            </ThemeProvider>
        )
        const title = screen.getByText("Test Title")
        expect(title).toBeTruthy()
    })
    it('should display favorite stars', async () => {
        render(
            <ThemeProvider>
                <Card title={"Test Title"} />
            </ThemeProvider>
        )
        const title = screen.getByText("Test Title")
        expect(title.textContent).not.toContain('⭐️')
        fireEvent.click(title)
        expect(title.textContent).toContain('⭐️')
    })
})