import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import Loader from "../Loader/Loader";

import { toastOptions } from "../../shared/toastOptions/toastOptions";

const SharedLayout = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Toaster toastOptions={toastOptions} />
    </div>
  );
};

export default SharedLayout;
