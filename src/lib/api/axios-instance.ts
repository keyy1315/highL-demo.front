"use client";

import { useErrorStore } from "@/stores/useErrorStore";
import axios from "axios";

export const api = axios.create({
    baseURL: "/api",
    timeout: 300000,
});

api.interceptors.request.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("🚨 Axios 에러 발생:", error);

        const showError = useErrorStore.getState().showError;

        if(error.response) {
            showError(error.response.data.message, error.response.data.errorCode);
        } else if(error.request) {
            console.log("error.request in interceptor.request: ", error.request);
            showError("서버에 연결할 수 없습니다.", "INTERNAL_SERVER_ERROR");
        } else {
            console.log("error.response in interceptor.request: ", error);
            showError("오류가 발생했습니다.", "INTERNAL_SERVER_ERROR");
        }
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const showError = useErrorStore.getState().showError;

        if(error.response) {
            showError(error.response.data.message, error.response.data.errorCode);
        } else if(error.request) {
            console.log("error.request in interceptor.response: ", error.request);
            showError("서버에 연결할 수 없습니다.", "INTERNAL_SERVER_ERROR");
        } else {
            console.log("error.response in interceptor.response: ", error); 
            showError("오류가 발생했습니다.", "INTERNAL_SERVER_ERROR");
        }
        return Promise.reject(error);
    }
);
