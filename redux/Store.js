import { configureStore } from '@reduxjs/toolkit'
import leaguesSlice from './reducers/LeaguesReduser'
import playerRatingSlice from './reducers/PlayerRatingReduser'
import playerFindingSlice from './reducers/PlayerFindingReduser'
import seasonsSlice from './reducers/SeasonsReduser'
import clubsSlice from './reducers/ClubsReduser'
import ratingInputsSlice from './reducers/RatingInputsReduser'
import findingInputsSlice from './reducers/FindingInputsReduser'
import contorlersSlice from './reducers/ContorlersReduser'
import userSlice from './reducers/UserReduser'
import infoInputsSlice from './reducers/InfoInputsReduser'
import informationSystemDataSlice from './reducers/InformationSystemData'
import PlayerReportSlice from './reducers/PlayerReportReduser'

export default configureStore({
  reducer: {
    player_rating: playerRatingSlice,
    player_finding: playerFindingSlice,
    leagues: leaguesSlice,
    seasons: seasonsSlice,
    clubs: clubsSlice,
    inputs_rating: ratingInputsSlice,
    inputs_finding: findingInputsSlice,
    contorlers: contorlersSlice,
    user: userSlice,
    info_data: informationSystemDataSlice,
    inputs_information: infoInputsSlice,
    player_report: PlayerReportSlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),


})

