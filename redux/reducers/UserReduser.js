import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'
import { decodeToken } from '../../components/utility/decodeToken'

const localuser = () => {
  let user ={}
  if (typeof window !== 'undefined') {
      if (localStorage.getItem('access_token')) {
        user = decodeToken(localStorage.getItem('access_token')).payload
        return user
    } else
        return user
} else
    return user
}


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {},
  },
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload
    },
    dellUser: (state) => {
      state.value = {}
    },
  },
})


export const { addUser, dellUser } = userSlice.actions

export default userSlice.reducer
