import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/api/service/authService";
import type { User } from "@/types/User";

export const useLoginMutation = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setToken(data.access_token);
      setUser({
        user_id: data.user_id,
        email: data.email,
        role: data.role,
        region_id: data.region_id,
      });
    },
  });
};

export const useUserQuery = (enabled = true) => {
  const token = useAuthStore((state) => state.token);

  return useQuery<User, Error>({
    queryKey: ["me"],
    queryFn: () => authService.getMe(token || ""),
    enabled: !!token && enabled,
    staleTime: 100 * 60 * 5,
    retry: 1,
  });
};

export const useLogoutMutation = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      queryClient.clear(); // react-query 캐시도 초기화
    },
  });
};
