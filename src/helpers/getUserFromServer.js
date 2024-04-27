export const getUserFromServer = async(token) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/user`,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    const data = await res.json()
    return data
}