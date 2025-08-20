

// loadingSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface loadingState {
    loading : boolean;
}

const initialState: loadingState = {
    loading : false,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
   reducers: {
    setLoading : (state , value : PayloadAction<boolean>) => {
        state.loading = value.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const {setLoading} = loadingSlice.actions

export default loadingSlice.reducer;
