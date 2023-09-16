import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

export const seasonsSlice = createSlice({
  name: 'seasons',
  initialState: {
    value: [],
  },
  reducers: {
    addSeasons: (state, action) => {
      state.value = action.payload
    },
    dellSeasons: (state) => {
      state.value = []
    },
  },
})


export const { addSeasons, dellSeasons } = seasonsSlice.actions

export default seasonsSlice.reducer
