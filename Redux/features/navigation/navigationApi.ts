import { baseApi } from "../baseApi";

export interface INavigationRouteItem {
  id: string;
  name: string;
  label: string;
  path: string;
  icon?: string | null;
  targetApp: string;
  group?: string;
  order: number;
  isActive: boolean;
}

export const navigationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWebsiteNavigationRoutes: builder.query<{ success: boolean; data: INavigationRouteItem[] }, { targetApp?: string; isActive?: boolean } | void>({
      query: (params) => ({
        url: "/navigation-routes/get-all-navigation-routes",
        method: "GET",
        params: params || { targetApp: "WEBSITE", isActive: true },
      }),
      providesTags: ["navigation"],
    }),
  }),
});

export const { useGetWebsiteNavigationRoutesQuery } = navigationApi;
