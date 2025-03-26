import { Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component: React.FC) {
  return function WithAuth() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user && !isLoading) {
        router.push("/signin"); // Redirect to sign-in page if not authenticated
      }
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [user, isLoading]);

    if (isLoading) {
      return <Loader2 className="size-4 animate-spin" />; // Or show a loading spinner
    }

    return <Component />;
  };
}
