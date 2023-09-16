import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

export const PlayerReportSlice = createSlice({
  name: 'player_report',
  initialState: {
    value: [],
  },
  reducers: {
    addPlayerReport: (state, action) => {
      state.value = action.payload
    },
    dellPlayerReport: (state) => {
      state.value = []
    },
  },
})


export const { addPlayerReport, dellPlayerReport } = PlayerReportSlice.actions

export default PlayerReportSlice.reducer
