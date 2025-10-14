import { useUserInfoQuery } from "@/redux/feature/auth/auth.api";

function Me() {
  const { data } = useUserInfoQuery({});
  return (
    data
  );
}

export default Me;
