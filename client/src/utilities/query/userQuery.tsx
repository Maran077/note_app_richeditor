import Cookies from "js-cookie";
import { Server } from "../Server";

export const getUser = async (token: string | undefined) => {
  if (!token) return;
  const res = await fetch(
    `${Server}/profile?token=${Cookies.get("token")}`,
  );
  const data = await res.json();
  return data
};
