import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/Redux/hooks";
import { logout as reduxLogout } from "@/Redux/Slice/authSlice";
import { toast } from "sonner";

export const useLogout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = (redirectTo: string = "/auth/login") => {
        dispatch(reduxLogout());
        toast.success("Logged out successfully");
        router.push(redirectTo);
    };

    return handleLogout;
};
