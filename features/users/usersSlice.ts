import { User } from '@/interfaces'
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface UsersState {
  data: User[],
  loading: boolean,
  error: string
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: ''
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', ()=>{
  return axios
  .get('http://localhost:3000/api/users')
  .then((response)=>{
    return response.data
    // return response.data.map((user : User)=>{
    //   return {...user, dob : new Date(user.dob)}
    // })
  })
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.data.push(action.payload)
    },
    deleteUser: (state, action: PayloadAction<User>) => {
      state.data = state.data.filter((user)=>{
        return user.email != action.payload.email
      })
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.data = action.payload
      state.loading = false
    })
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false,
      state.error = 'Something went wrong'
    })
  }
})

// Action creators are generated for each case reducer function
export const { addUser, deleteUser } = usersSlice.actions

export default usersSlice.reducer