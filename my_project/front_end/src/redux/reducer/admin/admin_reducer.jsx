import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


const get_vol = createAsyncThunk("/get_admin_vol",async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/admin/get_vol");

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response.data.mssg);
    }
  }
);
const get_pilote = createAsyncThunk("/get_admin_pilote",async (_, { rejectWithValue }) => {
    try {
       const res = await axios.get("/admin/get_pilote");

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response.data.mssg);
    }
  }
);
const get_avion = createAsyncThunk("/get_admin_avion",async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/admin/get_avion");

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response.data.mssg);
    }
  }
);




// create
const create_pilote=createAsyncThunk("/create_pilote",async(data,{rejectWithValue})=>{
    try{
        const res = await axios.post("/admin/create_pilote",data)
        return res.data
    }
    catch (err) {
       return rejectWithValue(err.response.data.mssg);
   }
})

const create_avion=createAsyncThunk("/create_avion",async(data,{rejectWithValue})=>{
    try{
        const res = await axios.post("/admin/create_avion",data)
        return res.data
    }
    catch (err) {
       return rejectWithValue(err.response.data.mssg);
   }
})

const create_vol=createAsyncThunk("/create_vol",async(data,{rejectWithValue})=>{
    try{
        const res =await axios.post("/admin/create_vol",data)
        return res.data
    }
    catch (err) {
       return rejectWithValue(err.response.data.mssg);
   }
})





// delete 
const delete_vol = createAsyncThunk("./delete vol",async(id,{rejectWithValue})=>{
    try{
        const res=await axios.delete(`/admin/del_vol/${id}`)
        return res.data

    }
    catch(err){
        return rejectWithValue(err.response.data.mssg)
    }
})
const delete_avion = createAsyncThunk("./delete acion",async(id,{rejectWithValue})=>{
    try{
        const res=await axios.delete(`/admin/del_avion/${id}`)
        return res.data

    }
    catch(err){
        return rejectWithValue(err.response.data.mssg)
    }
})
const delete_pilote = createAsyncThunk("./delete pilote",async(id,{rejectWithValue})=>{
    try{
        const res=await axios.delete(`/admin/del_pilote/${id}`)
        return res.data

    }
    catch(err){
        return rejectWithValue(err.response.data.mssg)
    }
})


// update

const up_vol=createAsyncThunk("/admin/update_vol",async({data,id},{rejectWithValue})=>{
    try{
        const res =await axios.put(`/admin/up_vol/${id}`,data)
        return res.data

    }
    catch (err) {
      return rejectWithValue(err.response.data.mssg);
    }
})
const up_avion=createAsyncThunk("/admin/update_avion",async({data,id},{rejectWithValue})=>{
    try{
        const res =await axios.put(`/admin/up_avion/${id}`,data)
        return res.data
    }
    catch (err) {
      return rejectWithValue(err.response.data.mssg);
    }
})
const up_pilote=createAsyncThunk("/admin/update_pilote",async({data,id},{rejectWithValue})=>{
    try{
        const res =await axios.put(`/admin/up_pilote/${id}`,data)
        return res.data
    }
    catch (err) {
      return rejectWithValue(err.response.data.mssg);
    }
})



const admin_reducer=createSlice({
    name:"gestion_admin",
    initialState:{
        error:null,
        is_loading:false,
        isauth:Boolean(localStorage.getItem("isAuth")) || null,
        vol:[],
        pilote:[],
        avion:[]
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        //get
        builder.addCase(get_vol.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(get_vol.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
            state.vol=action.payload.vol
        })
        builder.addCase(get_vol.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })
        
        builder.addCase(get_pilote.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(get_pilote.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
            state.pilote=action.payload.pilote
        })
        builder.addCase(get_pilote.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })
        
        builder.addCase(get_avion.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(get_avion.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
            state.avion=action.payload.avion
        })
        builder.addCase(get_avion.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })



        //create 
        builder.addCase(create_pilote.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(create_pilote.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
        })
        builder.addCase(create_pilote.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })
        
        builder.addCase(create_vol.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(create_vol.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
     
        })
        builder.addCase(create_vol.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })
        
        builder.addCase(create_avion.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(create_avion.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
        })
        builder.addCase(create_avion.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })



        //delete
        builder.addCase(delete_vol.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(delete_vol.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
        })
        builder.addCase(delete_vol.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })
        
        builder.addCase(delete_avion.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(delete_avion.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
     
        })
        builder.addCase(delete_avion.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })
        
        builder.addCase(delete_pilote.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(delete_pilote.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
        })
        builder.addCase(delete_pilote.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })

        //update
         builder.addCase(up_vol.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(up_vol.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
        })
        builder.addCase(up_vol.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })
         builder.addCase(up_avion.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(up_avion.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
        })
        builder.addCase(up_avion.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })
         builder.addCase(up_pilote.pending,(state)=>{
            state.error=null
            state.is_loading=true
        })
        builder.addCase(up_pilote.fulfilled,(state,action)=>{
            state.is_loading=false
            state.error=null
        })
        builder.addCase(up_pilote.rejected,(state,action)=>{
            state.is_loading=false
            state.error=action.payload
        })

    }
    

})
export default admin_reducer.reducer
export {get_vol,get_pilote,get_avion,
      create_pilote,create_avion,create_vol,
    delete_vol,delete_avion,delete_pilote,
    up_vol,up_avion,up_pilote};