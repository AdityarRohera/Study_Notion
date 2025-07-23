import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface categoryCourseState {
    categoryCourses : object[] | null;
    someMoreCourses : object[] | null;
    topSellingCourses : object[] | null;
    isLoading : boolean;
}

const initialState: categoryCourseState = {
    categoryCourses : null,
    someMoreCourses : null,
    topSellingCourses : null,
    isLoading : false
}

export const categoryCourseSlice = createSlice({
  name: 'category_courses',
  initialState,
  reducers: {

    setCategoryCourses : (state , value) => {
        state.categoryCourses = value.payload.categoryCourses,
        state.someMoreCourses = value.payload.someMoreCourses,
        state.topSellingCourses = value.payload.topSellingCourses
    },

    setIsLoading : (state , value) => {
        state.isLoading = value.payload
    },

    isLoading : state => {state.isLoading},

    getCategoryCourses : state => {state.categoryCourses},

    getSomeMoreCourses : state => {state.someMoreCourses},

    getTopSellingCourses : state => {state.topSellingCourses}

  },
})

// Action creators are generated for each case reducer function
export const {setCategoryCourses , getCategoryCourses , getSomeMoreCourses , getTopSellingCourses , setIsLoading , isLoading} = categoryCourseSlice.actions;

export default categoryCourseSlice.reducer;