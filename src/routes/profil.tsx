import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { routeMeta } from "@/lib/i18n/route-head";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: routeMeta("routes.profil.metaTitle", "routes.profil.metaDescription"),
  }),
  component: ProfilePage,
});
