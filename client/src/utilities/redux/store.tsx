import { configureStore } from '@reduxjs/toolkit'
import { userSlice  } from './user'
import { noteSlice } from './notes'


export const store = configureStore({
    reducer: {
        user:userSlice.reducer,
        notes:noteSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



