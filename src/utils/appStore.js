import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice"
import { configureStore } from '@reduxjs/toolkit'

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections : connectionsReducer
  },
})


export default appStore;