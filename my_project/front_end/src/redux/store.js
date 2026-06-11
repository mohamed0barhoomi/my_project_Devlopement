import { configureStore } from "@reduxjs/toolkit";
import user_reducer from "./reducer/user_reducer"
import vol_reducer from "./reducer/vol_reducer"



export default configureStore({reducer:{user:user_reducer,vol:vol_reducer}})