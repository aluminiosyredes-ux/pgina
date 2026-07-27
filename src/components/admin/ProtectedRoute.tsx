import { Redirect } from "wouter";
import { getSession } from "../../lib/auth";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const session = getSession();
  if (!session) {
    return <Redirect to="/admin" />;
  }
  return <>{children}</>;
}
