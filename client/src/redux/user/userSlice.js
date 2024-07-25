import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentUser:null,
    error:null,
    loading:false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
        },
                                // Action is the data the user is getting from the database
        signInSucces : (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        }

    }
})

export const {signInStart, signInSucces, signInFailure} = userSlice.actions;

export default userSlice.reducer;