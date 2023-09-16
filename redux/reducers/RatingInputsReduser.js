import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

export const ratingInputsSlice = createSlice({
  name: 'inputs_rating',
  initialState: {
    value: {
      position: 'FW', league: 'All', club: {id: 'All', club: 'All'},
      min_age: 10, max_age: 50, season: '',Nation:{ code: "All", tag: "All", label: "All" }
      ,position_detail:'All'
  },
  },
  reducers: {
    addRatingInputs: (state, action) => {
      state.value = { ...state.value, ...action.payload, }
    },
    dellRatingInputs: (state) => {
      state.value = {
        position: 'FW', league: 'All', club: {id: 'All', club: 'All'},
        min_age: 10, max_age: 50, season: '',Nation:{ code: "All", tag: "All", label: "All" }
        ,position_detail:'All'
    }
    },
  },
})


export const { addRatingInputs, dellRatingInputs } = ratingInputsSlice.actions

export default ratingInputsSlice.reducer
