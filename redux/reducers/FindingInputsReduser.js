import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

export const findingInputsSlice = createSlice({
  name: 'inputs_finding',
  initialState: {
    value: {
      position: 'FW', league: 'All', club: { id: 'All', club: 'All' },
      min_age: 10, max_age: 50, season: '', Nation: { code: "All", tag: "All", label: "All" },
      "wint": 5, "warl": 5, "wast": 5, "wblk": 5,
      "wtkl": 5, "wcri": 5, "wdrb": 5, "wpk": 5, "wcrs": 5,
      "wpass": 5, "wtch": 5, "wclr": 5, "wprs": 5, "wrec": 5,
      "wgls": 5, "wsh": 5, "wfls": 5,position_detail:'All'

    },
  },
  reducers: {
    addFindingInputs: (state, action) => {
      state.value = { ...state.value, ...action.payload, }
    },
    dellFindingInputs: (state) => {
      state.value = {
        position: 'FW', league: 'All', club: { id: 'All', club: 'All' },
        min_age: 10, max_age: 50, season: '', Nation: { code: "All", tag: "All", label: "All" },
        "wint": 5, "warl": 5, "wast": 2, "wblk": 5,
        "wtkl": 5, "wcri": 5, "wdrb": 5, "wpk": 5, "wcrs": 5,
        "wpass": 5, "wtch": 5, "wclr": 5, "wprs": 5, "wrec": 5,
        "wgls": 5, "wsh": 5, "wfls": 5,position_detail:'All'
  
      }
    },
  },
})


export const { addFindingInputs, dellFindingInputs } = findingInputsSlice.actions

export default findingInputsSlice.reducer
