import { configureStore } from '@reduxjs/toolkit';

import { shazamCoreApi } from './services/ShazamCore';

export const Store = configureStore({
  //this is boilerPlate code for all the redux application
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});