import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/slices/authSlice'
import  categoryCourseReducer from '../features/slices/categorySlice'
import  fullCourseReducer  from '../features/slices/courseSlice'
import loadingReducer from '../features/slices/loadingSlice'

export const store = configureStore({
  reducer: {
    auth : authReducer,
    category_courses : categoryCourseReducer,
    full_course : fullCourseReducer,
    loading : loadingReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;