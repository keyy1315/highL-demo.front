"use client";

import { useErrorStore } from "@/stores/useErrorStore";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8081",
    timeout: 10000,
});

api.interceptors.request.use(
    (response) => {
        return response;
    },
    (error) => {
        const showError = useErrorStore.getState().showError;

        console.log("🚨 Axios 에러 발생:", error); 

        if(error.response) {
            showError(error.response.data.message);
        } else if(error.request) {
            showError("서버에 연결할 수 없습니다.");
        } else {
            showError("오류가 발생했습니다.");
        }
        return Promise.reject(error);
    }
);