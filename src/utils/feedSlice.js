import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feedSlice",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
         return action.payload;   
        },
        removeuserFromFeed : (state, action) => {
            const newFeed = state.filter((f) => f._id !== action.payload)
            return newFeed;
        }
    }
});


export const {addFeed, removeuserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;
