import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./Slice/CounterSlice";


let store = configureStore({
    reducer:{
        counter : counterReducer
    }
})

export default store