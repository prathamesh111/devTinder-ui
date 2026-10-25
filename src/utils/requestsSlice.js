import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requestsSlice",
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
         return action.payload;   
        },
        removeFromRequests : (state, action) => {
            const newReq = state.filter((request) => request._id !== action.payload)
            return newReq;
        }
    }
});


export const {addRequests, removeFromRequests} = requestsSlice.actions;
export default requestsSlice.reducer;
