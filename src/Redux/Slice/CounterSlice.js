import { createSlice } from "@reduxjs/toolkit";

let initialState={ count:0 , userName:"Ali"}

let counterSlice = createSlice({
    name:"Counter",
    initialState,
    reducers:{
        increase:(state, action)=>{
            console.log({action});

            state.count +=1
        },
        decrease:(state , action )=>{
            console.log({action});
            state.count -= action.payload

        }
    }
})

export let counterReducer = counterSlice.reducer
 export let { increase , decrease , increaseBy10 } = counterSlice.actions