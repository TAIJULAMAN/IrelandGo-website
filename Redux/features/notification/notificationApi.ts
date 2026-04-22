import { baseApi } from "../baseApi";

export interface INotification {
  id: string;
  receiverId: string;
  partnerId: string | null;
  title: string;
  message: string | null;
  body: string;
  serviceTypes: string | null;
  bookingId: string;
  read: boolean;
  isClicked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface INotificationResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
  };
  data: INotification[];
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query<INotificationResponse, void>({
      query: () => ({
        url: "notifications/my-notifications",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    markNotificationAsRead: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `notifications/mark-as-read/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
    markNotificationAsUnread: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `notifications/mark-as-unread/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
    markAllAsRead: builder.mutation<void, void>({
      query: () => ({
        url: "notifications/mark-all-as-read",
        method: "PATCH",
        // body: { isRead: true },
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkNotificationAsUnreadMutation,
  useMarkAllAsReadMutation,
} = notificationApi;
