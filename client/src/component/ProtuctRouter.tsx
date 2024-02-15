import { ReactNode } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../utilities/redux/hooks";

type Props = {
  path: string;
  element: ReactNode;
};

function ProtuctRouter({ path, element }: Props) {
  const { isUserLogin } = useAppSelector((state) => state.user);

  if (!isUserLogin) return <Navigate to="/" replace={true} />;
  return (

      <Route path={path} element={element} />
  );
}

export default ProtuctRouter;
