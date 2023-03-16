import { configureStore } from "@reduxjs/toolkit";
import ArticleReducer from "../slice/article";
import AuthReducer from '../slice/auth'

export default configureStore ({
    reducer: {
        auth: AuthReducer,
        article: ArticleReducer
    },
    devTools: process.env.NODE_ENV !== "production"
})