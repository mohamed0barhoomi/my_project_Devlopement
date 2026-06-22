import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





const get_vol = createAsyncThunk("/get_user_vol",async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/user/get_vol", {headers: {token: token,}});

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response.data.mssg);
    }
  }
);
const reserver_vol = createAsyncThunk("/reserver_user_vol",async ({id,class_type}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`/user/reserver/${id}`,{class_type}, {headers: {token: token,}});
      return res.data;

    } catch (err) {
      return rejectWithValue(err.response.data.mssg);
    }
  }
);


const vol_reducer=createSlice({
    name:"vol",
    initialState:{
        error:null,
        is_loading:false,
        list_vol:[]
        
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(get_vol.pending,(state)=>{
            state.is_loading=true
            state.error=null
        })
       builder.addCase(get_vol.fulfilled, (state, action) => {
        state.is_loading = false;
        state.error = null;
        state.list_vol = action.payload.vol
         });
        builder.addCase(get_vol.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })
        builder.addCase(reserver_vol.pending,(state)=>{
            state.is_loading=true
            state.error=null
        })
        builder.addCase(reserver_vol.fulfilled,(state,action)=>{
        state.error=null
        state.is_loading=false
        
        })
        builder.addCase(reserver_vol.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })
    }
})

export default vol_reducer.reducer
export {get_vol,reserver_vol}