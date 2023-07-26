import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";

const router = createBrowserRouter(AppRouter);

export const JournalApp = () => {
  return (
    <>
      <AppTheme>
        <RouterProvider router={router} />
      </AppTheme>
    </>
  );
};
