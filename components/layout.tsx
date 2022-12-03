import Header from "./header";
import { FaFacebook } from "react-icons/fa";

type LayoutProps = {
  user?: any;
  loading?: boolean;
  children: React.ReactNode;
};

const Layout = ({ user, loading = false, children }: LayoutProps) => {
  return (
    <>
      <Header user={user} loading={loading} />
      <main>
        <div className="container dark:bg-black">{children}</div>
      </main>
    </>
  );
};

export default Layout;
