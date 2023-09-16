import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

export const contorlersSlice = createSlice({
  name: 'contorlers',
  initialState: {
    value: {
    systems_view: 'module',
    rating_data_length: 0,
      rating_data_pages: 0,
      rating_data_current_pages: 1,
      rating_data_start_item: 0,
      rating_data_end_item: 18,

      finding_data_length: 0,
      finding_data_pages: 0,
      finding_data_current_pages: 1,
      finding_data_start_item: 0,
      finding_data_end_item: 18,
      snackbar:{
        state:false,
        message:'',
        severity:'info',
      },
      player_selected_for_info:null,
      season_selected_for_info:'',
      pictures:{
        slides:[],
        signin:[],
        signup:[],
        wallpaper:[],
      },
      lang: 'en',
      theme_mode: 'light',

    },
  },
  reducers: {
    addContorlers: (state, action) => {
      state.value = { ...state.value, ...action.payload, }
    },
    dellContorlers: (state) => {
      state.value = {
        systems_view: 'module',
        rating_data_length: 0,
        rating_data_pages: 0,
        rating_data_current_pages: 1,
        rating_data_start_item: 0,
        rating_data_end_item: 18,

        finding_data_length: 0,
        finding_data_pages: 0,
        finding_data_current_pages: 1,
        finding_data_start_item: 0,
        finding_data_end_item: 18,

        info_data_length: 0,
        info_data_pages: 0,
        info_data_current_pages: 1,
        info_data_start_item: 0,
        info_data_end_item: 18,
        snackbar:{
          state:false,
          message:'',
          severity:'info',
        },
        player_selected_for_info:{},
        season_selected_for_info:'',
        pictures:{
          slides:[],
          signin:[],
          signup:[],
          wallpaper:[],
        },

    
        }
    },
  },
})


export const { addContorlers, dellContorlers } = contorlersSlice.actions

export default contorlersSlice.reducer
