import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'
import dayjs from "dayjs";

export const infoInputsSlice = createSlice({
  name: 'inputs_information',
  initialState: {
    value: {
      position: { FW: true, DF: true, MF: true, GK: true }, league:  { id: 'All', league: 'All' }, club: { id: 'All', club: 'All' },
      Nation: { code: "All", tag: "All", label: "All" },
      int_caps: { have: true, nohave: true },
      market_value: [100, 1000],
      age: [10, 50], start_date: dayjs(""), end_date: dayjs(""),
      position_detail:'All', season: '',
    },
  },
  reducers: {
    addInfoInputs: (state, action) => {
      state.value = { ...state.value, ...action.payload, }
    },
    dellInfoInputs: (state) => {
      state.value = {
        position: { FW: true, DF: true, MF: true, GK: true }, league: { id: 'All', league: 'All' }, club: { id: 'All', club: 'All' },
        Nation: { code: "All", tag: "All", label: "All" },
        int_caps: { have: true, nohave: true },
        market_value: [100, 1000],
        age: [10, 50], start_date: dayjs(""), end_date: dayjs(""),
        position_detail:'All', season: ''

      }
    },
  },
})


export const { addInfoInputs, dellInfoInputs } = infoInputsSlice.actions

export default infoInputsSlice.reducer
