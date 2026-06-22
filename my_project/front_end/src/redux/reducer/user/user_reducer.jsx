import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const login_user=createAsyncThunk("/user/login",async(data,{ rejectWithValue })=>{
    try{
        const res = await axios.post("/user/login",data)
        return res.data
    }
    catch(err){
        return rejectWithValue(err.response.data.mssg)
    }
})
const register_user = createAsyncThunk("/user/register",async(data,{rejectWithValue})=>{
    try{
        const res = await axios.post("/user/register",data)
        return res.data
    }
    catch(err){
        return rejectWithValue(err.response.data.mssg)
    }
})
 


const get_history= createAsyncThunk("/user/get_history",async(_,{rejectWithValue})=>{
      try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/user/historique", {headers: {token: token,}});
      return res.data;

    } catch (err) {
      return rejectWithValue(err.response.data.mssg);
    }
  
})

const delete_history = createAsyncThunk("/user/delete_history",async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete("/user/delete_history", {data:id,headers: {token: token,}});
      return res.data;

    } catch (err) {
      return rejectWithValue(err.response.data.mssg);
    }
  }
);







const conserve = createAsyncThunk("/user/conserve",async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token",token)
      const res = await axios.get("/user/conserve", {headers: {token: token,}});
      console.log("res conserve",res.data)
      return res.data;

    } catch (err) {
      return rejectWithValue(err.response.data.mssg);
    }
  }
);








const user_reducer = createSlice({
    name:"user",
    initialState:{
        error:null,
        is_loading:false,
        admin:localStorage.getItem("admin") || null,
        token:localStorage.getItem("token") || null ,
        isauth:Boolean(localStorage.getItem("isAuth")) || null,
        user:JSON.parse(localStorage.getItem("user")) || null,
        history:null,
    },
    reducers:{
        logout:(state)=>{
            state.token=null;
            state.isauth=false;
            state.user=null;
            state.admin=null;
            localStorage.removeItem("token");
            localStorage.removeItem("isAuth");
            localStorage.removeItem("user");

        }
    },
    extraReducers: (builder) => {
    builder.addCase(register_user.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      builder.addCase(register_user.fulfilled, (state, action) => {
        state.error = null;
        state.is_loading = false;
        state.isauth = true;
        state.token = action.payload.token;
        state.user=action.payload.user
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("isAuth", "true");
      })
      builder.addCase(register_user.rejected, (state, action) => {
        state.error = action.payload;
        state.is_loading = false;
        state.isauth = false;
      })


      //login part

      builder.addCase(login_user.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      builder.addCase(login_user.fulfilled, (state, action) => {
        state.error = null;
        state.is_loading = false;
        state.isauth = true;
        state.admin=action.payload.admin
        state.token = action.payload.token;
        state.user=action.payload.user
        if(action.payload.admin) localStorage.setItem("admin",action.payload.admin)
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("isAuth", "true");
      })
      builder.addCase(login_user.rejected, (state, action) => {
        state.error = action.payload;
        state.is_loading = false;
      });

      // get history 
      builder.addCase(get_history.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      builder.addCase(get_history.fulfilled, (state, action) => {
        state.error = null;
        state.is_loading = false;
        // state.isauth = true;
        state.history=action.payload.historique
      })
      builder.addCase(get_history.rejected, (state, action) => {
        state.error = action.payload;
        state.is_loading = false;
      })

      //delete history
      builder.addCase(delete_history.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      builder.addCase(delete_history.fulfilled, (state, action) => {
        state.error = null;
        state.is_loading = false;
        // state.isauth = true;
      })
      builder.addCase(delete_history.rejected, (state, action) => {
        state.error = action.payload;
        state.is_loading = false;
        // state.isauth = false;
      })
      //conserve user
      builder.addCase(conserve.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      builder.addCase(conserve.fulfilled, (state, action) => {
        state.error = null;
        state.is_loading = false;
        state.isauth = true;
        state.user=action.payload
      })
      builder.addCase(conserve.rejected, (state, action) => {
        state.error = action.payload;
        state.is_loading = false;
        // state.isauth = false;
      })
}
    })
    export default user_reducer.reducer
    export {login_user,register_user,get_history,delete_history,conserve}
    export const {logout}= user_reducer.actions