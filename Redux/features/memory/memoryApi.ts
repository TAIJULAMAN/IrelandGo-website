import { baseApi } from "../baseApi";

export interface IMemoryItem {
  id: string;
  title?: string;
  description?: string;
  image: string[] | string;
  createdAt?: string;
  updatedAt?: string;
}

interface IGetAllMemoriesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
  data: IMemoryItem[];
}

const memoryApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllMemories: builder.query<IGetAllMemoriesResponse, { search?: string; minDate?: string; maxDate?: string; limit?: number; page?: number } | void>({
      query: (params) => ({
        url: "memories",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["memory"],
    }),
    getSingleMemory: builder.query<{ success: boolean; message: string; data: IMemoryItem }, string>({
      query: (id) => ({
        url: `memories/${id}`,
        method: "GET",
      }),
      providesTags: ["memory"],
    }),
  }),
});


export const { useGetAllMemoriesQuery, useGetSingleMemoryQuery } = memoryApi;
