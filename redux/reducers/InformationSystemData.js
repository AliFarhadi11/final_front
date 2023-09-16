import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

export const informationSystemDataSlice = createSlice({
  name: 'info_data',
  initialState: {
    value: [],
  },
  reducers: {
    addInfoData: (state, action) => {
      state.value = action.payload
    },
    dellInfoData: (state) => {
      state.value = []
    },
  },
})


export const { addInfoData, dellInfoData } = informationSystemDataSlice.actions

export default informationSystemDataSlice.reducer
