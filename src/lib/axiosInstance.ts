"use client";

import axios from "axios";

export const axiosInstance = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const memberId = localStorage.getItem(`${process.env.LOCAL_STORAGE_KEY}`);
          if (memberId) {
            originalRequest.headers["accessKey"] = memberId;

            return instance(originalRequest);
          }
        } catch (retryError) {
          console.error("Retry request failed:", retryError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
