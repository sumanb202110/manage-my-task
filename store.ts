import { configureStore } from '@reduxjs/toolkit'
import usernameReducer from './features/username/usernameSlice'
import usersReducer from './features/users/usersSlice'

export const store = configureStore({
  reducer: {
    username: usernameReducer,
    users: usersReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch