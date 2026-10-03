import { createFileRoute } from "@tanstack/react-router";
import { BoardView } from "@/components/universe/BoardView";

export const Route = createFileRoute("/board")({
  component: BoardView,
});
