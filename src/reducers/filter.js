import {createAction} from "@reduxjs/toolkit";
import {SET_FILTER} from "./actions";

const initialFilterState = {statusFilter: "All", typeFilter: "All"};

export const setFilterAction = createAction(SET_FILTER, function prepare(filter) {
    return {payload: filter};
});

export const filterReducer = (state = initialFilterState, action) => {
    switch(action.type) {
        case SET_FILTER:
            return {...state, ...action.payload};
        default:
            return state;
    }
};