import {
    Action,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import cartReducer from '../redux/feature/counter/counterSlice';

export const store = configureStore({
    reducer: {
        counter: cartReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch