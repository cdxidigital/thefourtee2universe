import { createFileRoute } from "@tanstack/react-router";
import { PortalView } from "@/components/universe/PortalView";

export const Route = createFileRoute("/you")({
  component: () => <PortalView portal="you" />,
});
