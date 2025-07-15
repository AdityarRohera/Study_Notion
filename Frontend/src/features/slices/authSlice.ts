import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface authState {
    user : any;
    token : string | null;
    isAuthenticated: boolean;
    loading : boolean;
}

const initialState: authState = {
    user :  null,
    token : localStorage.getItem('token') ? localStorage.getItem('token') : null,
    isAuthenticated : false,
    loading : false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setUser : (state , value) => {
        state.user = value.payload.user;
        state.token = value.payload.token;
        state.isAuthenticated = value.payload.isAuthenticated;
    },

    setLoading : (state , value: PayloadAction<boolean>) => {
        state.loading = value.payload;
    },

    setLogout : state => {
        state.token = null;
        state.isAuthenticated = false;
    },

  },
})

// Action creators are generated for each case reducer function
export const {setUser , setLoading , setLogout} = authSlice.actions

export default authSlice.reducer;