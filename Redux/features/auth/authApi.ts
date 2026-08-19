import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => {
        console.log("Data being sent to the API:", data);
        return {
          url: "users",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    logIn: builder.mutation({
      query: (data) => {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        let token = "";
        if (typeof window !== "undefined") {
          token = sessionStorage.getItem("resetToken") || "";
        }
        return {
          url: "auth/reset-password",
          method: "POST",
          body: data,
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        };
      },
      invalidatesTags: ["auth"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "auth/change-password",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;

export default authApi;
