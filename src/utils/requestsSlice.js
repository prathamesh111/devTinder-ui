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
        },
        emptyReqUsers: (state, actions) => {
            return null
        }
    }
});


export const {addRequests, removeFromRequests, emptyReqUsers} = requestsSlice.actions;
export default requestsSlice.reducer;
