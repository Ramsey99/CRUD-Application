import { useRouter } from "next/router";
import Header from "../header/header";
import Footer from "../footer/footer";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const hideHeaderRoutes = [
    "/auth/login",
    "/auth/registration",
    "/",
    "/auth/verifyOtp",
    "/auth/updatePassword",
  ];
  const shouldShowHeader = !hideHeaderRoutes.includes(router.pathname);
  const hideFooterRoutes = ["/auth/profile"];
  const shouldShowFooter = !hideFooterRoutes.includes(router.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <main>{children}</main>
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default Wrapper;
