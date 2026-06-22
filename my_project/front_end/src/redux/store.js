import { configureStore } from "@reduxjs/toolkit";
import user_reducer from "./reducer/user/user_reducer"
import vol_reducer from "./reducer/user/vol_reducer"
import admin_reducer from "./reducer/admin/admin_reducer"


export default configureStore({reducer:{user:user_reducer,vol:vol_reducer,admin:admin_reducer}})