import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UsernameState {
  value: string
}

const initialState: UsernameState = {
  value: "Test user",
}

export const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUsername } = usernameSlice.actions

export default usernameSlice.reducer