import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

export const clubsSlice = createSlice({
  name: 'clubs',
  initialState: {
    value: [{ id: 'All', club: 'All' }, ],
  },
  reducers: {
    addClubs: (state, action) => {
      state.value = [{id: 'All', club: 'All'} , ...action.payload]
    },
    dellClubs: (state) => {
      state.value = []
    },
  },
})


export const { addClubs, dellClubs } = clubsSlice.actions

export default clubsSlice.reducer
