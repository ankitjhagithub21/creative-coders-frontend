export const getContact = async() => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/contact`)
    const data = await res.json()
    return data
}