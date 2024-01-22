import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    personalInfo:[],
    submit:false,
    country:""
}

export const formSlice = createSlice({
    name:'personalInfo',
    initialState,
    reducers:{
        addPersonalInfo : (state,action)=>{
            const info = {
                id:nanoid(),
                data:action.payload
            }
            state.personalInfo.push(info);
        },
        addAddressInfo : (state,action)=>{
            const merged = {...state.personalInfo[state.personalInfo.length-1].data,...action.payload}
            state.personalInfo[state.personalInfo.length-1].data = merged;
        },
        isSubmit : (state,action)=>{
            state.submit = action.payload
        },
        countryAdd : (state,action)=>{
            state.country = action.payload;
        }
    }
})

export const {addPersonalInfo,addAddressInfo,isSubmit,countryAdd} = formSlice.actions;
export default formSlice.reducer;