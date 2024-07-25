import { configureStore } from '@reduxjs/toolkit';
// import {userSlice} from './user/userSlice';
// import {userSlice}from './user/userSlice'
// import userSlice from './user/userSlice'
import userReducer from './user/userSlice'

export const store = configureStore({
  reducer: {user: userReducer},
//   reducer: {user: userSlice},
  middleware:(getDefualtMiddleware) =>getDefualtMiddleware({
    serializableCheck:false,
  })
})