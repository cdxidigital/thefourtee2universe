import { createFileRoute } from "@tanstack/react-router";
import { HomeUniverse } from "@/components/universe/HomeUniverse";
import { type JourneyId } from "@/lib/universe/catalog";

const journeyIds: JourneyId[] = ["cluster", "family", "void"];

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const journey = journeyIds.find((id) => id === search.journey);
    return {
      galaxy: search.galaxy === 1 || search.galaxy === "1" ? (1 as const) : undefined,
      ...(journey ? { journey } : {}),
    };
  },
  component: HomePage,
});

function HomePage() {
  const { galaxy, journey } = Route.useSearch();
  return <HomeUniverse entered={galaxy === 1} journey={journey} />;
}
