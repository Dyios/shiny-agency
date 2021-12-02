import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './context'

export function useTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return { theme, toggleTheme }
}

export function useFetch(url) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url) return
        async function fetchData() {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
            }
            catch (error) {
                console.error(error)
                setError(true)
            }
            finally {
                setLoading(false)
            }

        }
        setLoading(true)
        fetchData()
    }, [url])

    return { isLoading, data, error }
}