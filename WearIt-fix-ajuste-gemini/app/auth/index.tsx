import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Index() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/auth/login");
      } else {
        router.replace("/(tabs)/explore");
      }
    }
  }, [user, isLoading]);

  return null;
}
