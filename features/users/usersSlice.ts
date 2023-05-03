import { User } from '@/interfaces'
import { AnyAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UsersState {
  value: User[]
}

const initialState: UsersState = {
  value: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.value.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser } = usersSlice.actions

export default usersSlice.reducer