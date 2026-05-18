import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { isValidSectorId, type SectorId } from "@/lib/sectors";

export const Route = createFileRoute("/secteur/$sectorId")({
  beforeLoad: ({ params }) => {
    if (!isValidSectorId(params.sectorId)) {
      throw notFound();
    }
    throw redirect({
      to: "/",
      search: { tab: "secteurs", sector: params.sectorId as SectorId },
    });
  },
});
