import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Series } from "../../models/series.interface";
import { seriesActionTypes } from './series.types';

const initialState: {
    loading: boolean;
    error: string;
    data: Series[]
} = {
    loading: false,
    error: '',
    data: []
}

export const recommendedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(seriesActionTypes.FETCH_RECOMMENDED_SERIES_REQUEST, (state) => {
            state.loading = true
        })
        .addCase(seriesActionTypes.FETCH_RECOMMENDED_SERIES_SUCCESS, (state, action: PayloadAction<Series[]>) => {
            state.error = ''
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(seriesActionTypes.LOAD_MORE_RECOMMENDED_SERIES_SUCCESS, (state, action: PayloadAction<Series[]>) => {
            state.error = ''
            state.data = [...state.data, ...action.payload];
            state.loading = false;
        })
        .addCase(seriesActionTypes.FETCH_RECOMMENDED_SERIES_FAILURE, (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.data = []
            state.loading = false;
        })
})