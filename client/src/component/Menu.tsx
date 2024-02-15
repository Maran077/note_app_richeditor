import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../utilities/redux/hooks";
import { getUser } from "../utilities/query/userQuery";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setUserInRedux } from "../utilities/redux/user";
import Button from "./Button";
import { Link } from "react-router-dom";

type Props = {};

function Menu({}: Props) {
  const token = Cookies.get("token");
  const { isUserLogin, userProfile } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const openGoogleAuth = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

  const { data, status } = useQuery({
    queryKey: [token],
    queryFn: () => getUser(token),
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token_from_search = searchParams.get("token");
    const token_from_cookie = Cookies.get("token");

    if (!token_from_search && !token_from_cookie) return;
    if (token_from_search)
      Cookies.set("token", token_from_search, { expires: 7 });
    searchParams.delete("token");
    history.replaceState(
      {},
      "",
      `${location.pathname}?${searchParams.toString()}`,
    );

    if (!data?.success) return;
    dispatch(
      setUserInRedux({
        isUserLogin: true,
        name: data.user.userName,
        profile: data.user.userProfile,
      }),
    );
  }, [status]);

  return (
    <nav className="flex h-menu items-center justify-between bg-color-thirty px-5 py-3">
      <Link to="/">
        <img
          className="size-10 rounded-full "
          src="https://img.freepik.com/free-vector/notebook-pencil-hand-drawn-style_1284-1212.jpg?size=338&ext=jpg&ga=GA1.1.1264180380.1678956544&semt=ais"
        />
      </Link>
      
      {isUserLogin ? (
        <div className="flex items-center gap-2">
          <img
            className="size-10 rounded-full"
            src={userProfile.profile}
            alt={userProfile.name}
          />
          <p className="text-[1.4rem] font-[500] text-white">
            {userProfile.name}
          </p>
        </div>
      ) : (
        <div onClick={openGoogleAuth}>
          <Button buttonName="Login" />
        </div>
      )}
    </nav>
  );
}

export default Menu;
