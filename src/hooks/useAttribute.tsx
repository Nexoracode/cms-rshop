import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAttributeGroup = () => {
  return useQuery({
    queryKey: ["all-attribute-group"],
    queryFn: () =>
      fetcher({
        route: "/attribute-group",
        isActiveToast: false,
      }),
  });
};