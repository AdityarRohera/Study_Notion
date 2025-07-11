import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

interface MyToken {
  userId : object,
  role : string
}

export interface auth {
  token: string | null;
  user : MyToken | null;
}

const initialState: auth = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  user: null,
}

export const tokenSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken : (state , value) => {state.token = value.payload}
  },
})

// Action creators are generated for each case reducer function
export const {setToken} = tokenSlice.actions

export default tokenSlice.reducer