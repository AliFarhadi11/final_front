import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

export const playerFindingSlice = createSlice({
  name: 'player_finding',
  initialState: {
    value: [],
  },
  reducers: {
    addPlayerFinding: (state, action) => {
      state.value = action.payload
    },
    dellPlayerFinding: (state) => {
      state.value = []
    },
  },
})


export const { addPlayerFinding, dellPlayerFinding } = playerFindingSlice.actions

export default playerFindingSlice.reducer
