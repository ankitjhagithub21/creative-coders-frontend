import { createSlice } from '@reduxjs/toolkit'



export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:null,
    isLoggedIn:false
    
  },

  reducers: {
    storeTokenInLs: (state,action) => {
        localStorage.setItem('token',action.payload)
        state.isLoggedIn = true
    },
    logoutUser:(state)=>{
        localStorage.removeItem('token')
        state.isLoggedIn = false
        state.user = null
        
    },
    setUser:(state,action)=>{
      state.user = action.payload
      state.isLoggedIn = true
    }
   
  },
})


export const { storeTokenInLs , logoutUser,isLoggedIn,setUser } = authSlice.actions

export default authSlice.reducer