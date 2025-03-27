import { Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";

// This defines the props that will be passed to the wrapped component.
type WithAuthProps = object;

export default function withAuth<T extends WithAuthProps>(
  Component: React.FC<T>
) {
  return function WithAuth(props: PropsWithChildren<T>) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user && !isLoading) {
        router.push("/signin"); // Redirect to sign-in page if not authenticated
      }
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [user, isLoading]);

    if (isLoading || (!user && !isLoading)) {
      return (
        <div className="w-screen h-screen flex items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
          <p className="text-2xl">Loading...</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
