export const getServices = async() => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/service`)
    const data = await res.json()
    return data
}