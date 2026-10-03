import { createFileRoute } from "@tanstack/react-router";
import { PortalView } from "@/components/universe/PortalView";

export const Route = createFileRoute("/music")({
  component: () => <PortalView portal="music" />,
});
