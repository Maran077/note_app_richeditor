import Cookies from "js-cookie";

export const getUser = async (token: string | undefined) => {
  if (!token) return;
  const res = await fetch(
    `http://localhost:3000/profile?token=${Cookies.get("token")}`,
  );
  const data = await res.json();
  return data
};
