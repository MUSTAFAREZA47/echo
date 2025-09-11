import { AuthLayout } from "@/modules/auth/ui/components/layouts/auth-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
  <AuthLayout>
    {children}
    </AuthLayout>
  )
};

export default Layout;