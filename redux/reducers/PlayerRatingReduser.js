import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

export const playerRatingSlice = createSlice({
  name: 'player_rating',
  initialState: {
    value: [],
  },
  reducers: {
    addPlayerRating: (state, action) => {
      state.value = action.payload
    },
    dellPlayerRating: (state) => {
      state.value = []
    },
  },
})


export const { addPlayerRating, dellPlayerRating } = playerRatingSlice.actions

export default playerRatingSlice.reducer
