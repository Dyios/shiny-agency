import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { waitFor, screen } from '@testing-library/react'
import { formatJobList, formatQueryParams } from '../pages/Results'
import { render } from '../utils/test'

import Results from '../pages/Results'

describe('La fonction formatJobList', () => {
    test('ajoute une virgule à un item', () => {
        const expectedState = 'item2,'
        expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
    })
    test('ne met pas de virgule pour le dernier élément', () => {
        const expectedState = 'item3'
        expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
    })
})

describe('Function formatQueryParams', () => {
    it('should handle true and false as answer', () => {
        const testParams = { 1: true, 2: false }
        expect(formatQueryParams(testParams)).toEqual('a1=true&a2=false')
    })
    it('should handle empty object', () => {
        const testParams = {}
        expect(formatQueryParams(testParams)).toEqual('')
    })
})

const resultsData = [{ "title": "backend", "description": "Le backend consiste en la partie émergée de l'iceberg : ce qui permet de faire tourner une application mais qui n'est pas visible par l'utilisateur" }, { "title": "seo", "description": "Le SEO est en charge du référencement web d'une page" }]

const server = setupServer(
    // On précise ici l'url qu'il faudra "intercepter"
    rest.get('http://localhost:8000/results', (req, res, ctx) => {
        // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
        return res(ctx.json({ resultsData: resultsData }))
    })
)

it('Should render without crash', async () => {
    render(<Results />)
    expect(screen.getByTestId('loader')).toBeTruthy()

    it('Should display results', async () => {
        render(<Results />)

        await waitFor(() => {
            expect(screen.getByText('backend')).toBeTruthy()
            expect(screen.getByText('seo')).toBeTruthy()
        })
    })
})

// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())