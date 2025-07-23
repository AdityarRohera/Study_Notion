import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/slices/authSlice'
import  categoryCourseReducer from '../features/slices/categorySlice'

export const store = configureStore({
  reducer: {
    auth : authReducer,
    category_courses : categoryCourseReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;