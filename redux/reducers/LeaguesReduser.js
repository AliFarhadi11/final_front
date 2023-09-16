import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

export const leaguesSlice = createSlice({
  name: 'leagues',
  initialState: {
    value: [ ],
  },
  reducers: {
    addLeagues: (state, action) => {
      state.value =[{id: 'All', league: 'All', top_league:true} , ...action.payload]
    },
    dellLeagues: (state) => {
      state.value = []
    },
  },
})


export const { addLeagues, dellLeagues } = leaguesSlice.actions

export default leaguesSlice.reducer
