import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { waitFor, screen } from '@testing-library/react'
import { render } from '../utils/test'

import Freelances from '../pages/Freelances'
import { ThemeProvider } from '../utils/context'

const freelancersMockedData = [
    {
        name: 'Harry Potter',
        job: 'Magicien frontend',
        picture: '',
    },
    {
        name: 'Hermione Granger',
        job: 'Magicienne fullstack',
        picture: '',
    },
]

const server = setupServer(
    // On précise ici l'url qu'il faudra "intercepter"
    rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
        // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
        return res(ctx.json({ freelancersList: freelancersMockedData }))
    })
)

test('Should render without crash', async () => {
    render(<Freelances />)
    expect(screen.getByTestId('loader')).toBeTruthy()

    it('Should display freelancers names', async () => {
        render(
            <ThemeProvider>
                <Freelances />
            </ThemeProvider>
        )
        
        await waitFor(() => {
            expect(screen.getByText('Harry Potter')).toBeTruthy()
            expect(screen.getByText('Hermione Granger')).toBeTruthy()
        })
    })
})

// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())