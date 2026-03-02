import { baseApi } from "../baseApi";

export interface ProfileData {
    id: string;
    fullName: string;
    email: string;
    profileImage: string;
    contactNumber: string;
    address: string | null;
    country: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProfileResponse {
    success: boolean;
    message: string;
    data: ProfileData;
}

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileResponse, void>({
            query: () => "users/my-profile",
            providesTags: ["profile"],
        }),
    }),
});

export const {
    useGetProfileQuery,
} = profileApi;
