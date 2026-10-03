import { createFileRoute } from "@tanstack/react-router";
import { WorldView } from "@/components/universe/WorldView";

export const Route = createFileRoute("/worlds/$slug")({
  component: WorldPage,
});

function WorldPage() {
  const { slug } = Route.useParams();
  return <WorldView slug={slug} />;
}
