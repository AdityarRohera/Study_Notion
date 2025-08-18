import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface fullCourseState {
    AboutCourse : object | null;
    courseContent : object[] | null;
    courseSection : object[] | null;
}

const initialState: fullCourseState = {
    AboutCourse : null,
    courseContent : null,
    courseSection : null,
}

export const fullCourseSlice = createSlice({
  name: 'full_course',
  initialState,
  reducers: {

    setFullCourse: (state, action) => {
        state.AboutCourse = action.payload.AboutCourse;
        state.courseContent = action.payload.courseContent;
        state.courseSection = action.payload.courseSection;
    },

  },
})

// Action creators are generated for each case reducer function
export const {setFullCourse} = fullCourseSlice.actions;

export default fullCourseSlice.reducer;