import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";

interface RootState {
  auth: {
    token: string | null;
  };
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      let token = state?.auth?.token;

      if (!token && typeof window !== "undefined") {
        token =
          localStorage.getItem("token") || localStorage.getItem("accessToken");
      }

      if (token && token !== "null" && token !== "undefined" && token.trim() !== "" && !headers.has("Authorization")) {
        const authValue = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
        headers.set("Authorization", authValue);
      }
      return headers;
    },
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 30,
  keepUnusedDataFor: 300,
  endpoints: () => ({}),
  tagTypes: [
    "auth",
    "profile",
    "content",
    "review",
    "blog",
    "newsletter",
    "faq",
    "contact",
    "privacy",
    "terms",
    "about",
    "support",
    "payment-methods",
    "multiDayTours",
    "booking",
    "notification",
    "dashboard",
    "client",
    "transfers",
    "vehicles",
    "stopages",
    "dayTrips",
    "memory",
    "navigation",
  ],
});
