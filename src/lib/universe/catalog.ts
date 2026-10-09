export type CelestialType = "planet" | "star" | "world";
export type WorldStatus = "ACTIVE" | "BUILDING" | "EXPLORING" | "TESTING" | "LAUNCHING" | "ARCHIVED";
export type WorldCategory = "travel" | "media" | "personal" | "creative" | "technology" | "research" | "house" | "client";

export type GalaxyWorld = {
  id: string;
  name: string;
  type: CelestialType;
  status: WorldStatus;
  category: WorldCategory;
  description: string;
  url: string;
  x: number;
  y: number;
  scale: number;
  color: string;
  children: string[];
  keywords: string[];
  label?: string;
};

export type GalaxyRelationship = {
  source: string;
  target: string;
  relationshipType: "PART OF" | "PART OF THE CLUSTER" | "IN THE VOID";
};

export const galaxyWorlds: GalaxyWorld[] = [
  { id: "haus", name: "fourtee2 haus", type: "planet", status: "ACTIVE", category: "house", description: "The house. A star cluster to one side, the family of planets ahead, and new worlds out in the void.", url: "/worlds/haus", x: 50, y: 14, scale: 1.12, color: "#e3af5d", children: ["cdxi", "fourtee2", "fleshsesh"], keywords: ["haus", "house", "origin", "organisation"] },
  { id: "cdxi", name: "cdxi", type: "star", status: "ACTIVE", category: "creative", description: "The star. Client work gathers around it and stays part of the cluster.", url: "/worlds/cdxi", x: 20, y: 46, scale: 2.3, color: "#c9b6ff", children: ["corporate clients", "outside the family"], keywords: ["cdxi", "star", "cluster", "clients"] },
  { id: "corporate", name: "corporate clients", label: "clients", type: "star", status: "ACTIVE", category: "client", description: "Client work. Part of the cluster, not a planet of its own. Origin Atlas sits here.", url: "/worlds/corporate", x: 9, y: 28, scale: 1.15, color: "#9eb6e8", children: ["origin atlas", "identity", "systems"], keywords: ["corporate", "clients", "cluster", "cdxi", "atlas"] },
  { id: "outside", name: "outside the family", label: "outside", type: "star", status: "ACTIVE", category: "client", description: "Work that is not a fourtee2 brand. Still part of the cluster.", url: "/worlds/outside", x: 11, y: 68, scale: 1.05, color: "#e4c48a", children: ["independent work", "collaborations"], keywords: ["outside", "cluster", "clients", "cdxi", "family"] },
  { id: "fourtee2", name: "fourtee2", type: "planet", status: "ACTIVE", category: "house", description: "The family. These are planets: travel, media, ritual, digital and labs.", url: "/worlds/fourtee2", x: 48, y: 42, scale: 1.02, color: "#efe7d2", children: ["fourtee2travel", "fourtee2media", "4[you]2", "fourtee2digital", "fourtee2 labs"], keywords: ["fourtee2", "family", "planets", "brands"] },
  { id: "travel", name: "fourtee2travel", type: "planet", status: "ACTIVE", category: "travel", description: "A one-stop travel intelligence world for routes, stays and every travel priority.", url: "/travel", x: 33, y: 26, scale: 0.8, color: "#e3af5d", children: ["route intelligence", "field notes", "signal board"], keywords: ["travel", "routes", "flights", "stays", "value", "luxury"] },
  { id: "fourtee2media", name: "fourtee2media", label: "media", type: "planet", status: "ACTIVE", category: "media", description: "The media field. Fourtee blue, a signal mark, and the projects that broadcast from the house.", url: "/worlds/fourtee2media", x: 60, y: 22, scale: 0.86, color: "#0055FF", children: ["4[music]2", "The Others in the Room"], keywords: ["media", "fourtee2media", "broadcast", "signal", "blue"] },
  { id: "music", name: "4[music]2", type: "planet", status: "ACTIVE", category: "media", description: "A fourtee2media project. Selected transmissions, ambient listening modes and a living frequency field.", url: "/music", x: 72, y: 30, scale: 0.7, color: "#3B6FFF", children: ["selected playlist", "frequency field", "signal queue"], keywords: ["music", "sound", "playlist", "media", "frequency", "fourtee2media"] },
  { id: "others", name: "The Others in the Room", label: "others", type: "planet", status: "ACTIVE", category: "media", description: "A fourtee2media project. The room, the voices, and the people who stay in it.", url: "/worlds/others", x: 48, y: 28, scale: 0.64, color: "#7EB6FF", children: ["the room", "voices", "episodes"], keywords: ["others", "room", "podcast", "media", "fourtee2media", "voices"] },
  { id: "you", name: "4[you]2", type: "planet", status: "BUILDING", category: "personal", description: "A personal world for ritual, care, energy and everyday performance.", url: "/you", x: 70, y: 42, scale: 0.76, color: "#bd77ed", children: ["ritual field", "care protocols", "performance signals"], keywords: ["you", "ritual", "care", "personal", "energy"] },
  { id: "fourtee2digital", name: "fourtee2digital", label: "digital", type: "planet", status: "ACTIVE", category: "technology", description: "Digital products and intelligent systems. Cinevo, the private library, lives here.", url: "/worlds/fourtee2digital", x: 32, y: 58, scale: 0.72, color: "#5ac4e8", children: ["cinevo", "products", "AI systems"], keywords: ["technology", "digital", "AI", "products", "fourtee2digital", "cinevo"] },
  { id: "cinevo", name: "cinevo", type: "planet", status: "BUILDING", category: "technology", description: "A fourtee2digital project. A private library, shared on your terms.", url: "/worlds/cinevo", x: 22, y: 76, scale: 0.58, color: "#54c9ec", children: ["server", "library", "profiles"], keywords: ["media", "server", "technology", "library", "fourtee2digital"] },
  { id: "fourtee2labs", name: "fourtee2 labs", label: "labs", type: "planet", status: "EXPLORING", category: "research", description: "Research, prototypes and experiments at the edge of the fourtee2 field.", url: "/worlds/fourtee2labs", x: 64, y: 60, scale: 0.72, color: "#eab75e", children: ["prototypes", "research", "experiments"], keywords: ["research", "labs", "AI", "experiments"] },
  { id: "origin-atlas", name: "origin atlas", label: "atlas", type: "star", status: "EXPLORING", category: "client", description: "A cdxi client project. An atlas of origin, pattern, systems and the routes between them.", url: "/worlds/origin-atlas", x: 22, y: 16, scale: 0.58, color: "#dfb15c", children: ["atlas", "research index", "field mapping"], keywords: ["atlas", "mapping", "origins", "cdxi", "clients", "cluster"] },
  { id: "fleshsesh", name: "fleshsesh", type: "world", status: "ACTIVE", category: "creative", description: "A new world, out in the void. Academy, the meat app and sinorgy models are forming with it.", url: "/worlds/fleshsesh", x: 86, y: 38, scale: 0.9, color: "#e47ebc", children: ["academy", "meat app", "sinorgy models"], keywords: ["fleshsesh", "void", "new world", "culture"] },
  { id: "academy", name: "academy", type: "world", status: "ACTIVE", category: "creative", description: "A new world in the void. The fleshsesh academy: study, presence and showing up.", url: "/worlds/academy", x: 78, y: 18, scale: 0.66, color: "#f0a0c8", children: ["study", "sessions", "practice"], keywords: ["academy", "fleshsesh", "void", "education"] },
  { id: "meat", name: "meat app", label: "meat", type: "world", status: "BUILDING", category: "creative", description: "A new world in the void. The app for training, sessions and the body in practice.", url: "/worlds/meat", x: 93, y: 56, scale: 0.64, color: "#d4655a", children: ["sessions", "training", "log"], keywords: ["meat", "app", "fleshsesh", "void"] },
  { id: "sinorgy-models", name: "sinorgy models", label: "sinorgy", type: "world", status: "BUILDING", category: "creative", description: "A new world in the void. Talent and visual culture, held with fleshsesh.", url: "/worlds/sinorgy-models", x: 76, y: 68, scale: 0.66, color: "#dd7fc6", children: ["talent", "visual culture", "collaboration"], keywords: ["sinorgy", "models", "void", "fleshsesh"] },
];

export const galaxyRelationships: GalaxyRelationship[] = [
  { source: "cdxi", target: "haus", relationshipType: "PART OF" },
  { source: "fourtee2", target: "haus", relationshipType: "PART OF" },
  { source: "fleshsesh", target: "haus", relationshipType: "IN THE VOID" },
  { source: "corporate", target: "cdxi", relationshipType: "PART OF THE CLUSTER" },
  { source: "outside", target: "cdxi", relationshipType: "PART OF THE CLUSTER" },
  { source: "travel", target: "fourtee2", relationshipType: "PART OF" },
  { source: "fourtee2media", target: "fourtee2", relationshipType: "PART OF" },
  { source: "music", target: "fourtee2media", relationshipType: "PART OF" },
  { source: "others", target: "fourtee2media", relationshipType: "PART OF" },
  { source: "you", target: "fourtee2", relationshipType: "PART OF" },
  { source: "fourtee2digital", target: "fourtee2", relationshipType: "PART OF" },
  { source: "cinevo", target: "fourtee2digital", relationshipType: "PART OF" },
  { source: "fourtee2labs", target: "fourtee2", relationshipType: "PART OF" },
  { source: "origin-atlas", target: "corporate", relationshipType: "PART OF THE CLUSTER" },
  { source: "academy", target: "fleshsesh", relationshipType: "IN THE VOID" },
  { source: "meat", target: "fleshsesh", relationshipType: "IN THE VOID" },
  { source: "sinorgy-models", target: "fleshsesh", relationshipType: "IN THE VOID" },
];

export type JourneyId = "cluster" | "family" | "void";

export const journeys: { id: JourneyId; title: string; line: string; stops: string[] }[] = [
  { id: "cluster", title: "THE CLUSTER", line: "A star, and the client work around it.", stops: ["haus", "cdxi", "corporate", "origin-atlas", "outside"] },
  { id: "family", title: "THE FAMILY", line: "The planets that carry the name.", stops: ["haus", "fourtee2", "fourtee2media", "music", "others", "travel", "you", "fourtee2digital", "cinevo", "fourtee2labs"] },
  { id: "void", title: "THE VOID", line: "New worlds, still forming.", stops: ["haus", "fleshsesh", "academy", "meat", "sinorgy-models"] },
];

export function journeyById(id: JourneyId | undefined) {
  return journeys.find((journey) => journey.id === id);
}

export const currentMissions = [
  { worldId: "haus", status: "ACTIVE", detail: "Cluster, family, and the void" },
  { worldId: "cdxi", status: "ACTIVE", detail: "Star of the client cluster" },
  { worldId: "fleshsesh", status: "ACTIVE", detail: "New worlds, out in the void" },
  { worldId: "travel", status: "ACTIVE", detail: "Travel intelligence and route discovery" },
] as const;

export function findWorld(id: string) {
  return galaxyWorlds.find((world) => world.id === id);
}

export function searchWorlds(query: string) {
  const term = query.trim().toLowerCase();
  if (!term) return galaxyWorlds;
  return galaxyWorlds.filter((world) =>
    [world.name, world.label, world.description, world.category, world.status, fieldTitle[worldField(world.id)], ...world.keywords].join(" ").toLowerCase().includes(term),
  );
}

export function parentWorld(id: string) {
  const link = galaxyRelationships.find((item) => item.source === id);
  return link ? findWorld(link.target) : undefined;
}

export function worldDepth(id: string) {
  if (id === "haus") return 0;
  const parent = parentWorld(id);
  return !parent || parent.id === "haus" ? 1 : 2;
}

export function worldField(id: string): "house" | "cluster" | "family" | "void" {
  if (id === "haus") return "house";
  if (id === "cdxi" || id === "corporate" || id === "outside" || id === "origin-atlas") return "cluster";
  if (id === "fleshsesh" || id === "academy" || id === "meat" || id === "sinorgy-models") return "void";
  return "family";
}

export const fieldOrder = ["house", "cluster", "family", "void"] as const;

export const fieldTitle: Record<(typeof fieldOrder)[number], string> = {
  house: "HOUSE",
  cluster: "THE CLUSTER",
  family: "THE FAMILY",
  void: "THE VOID",
};

export function worldLabel(world: GalaxyWorld) {
  return world.label ?? world.name;
}

export function isWordmark(name: string) {
  return name !== "fourtee2media" && (name.toLowerCase().includes("fourtee2") || name.startsWith("4["));
}

export type WorldMaterial = {
  fieldNote: string;
  observation: string;
};

export const worldMaterials: Record<string, WorldMaterial> = {
  haus: { fieldNote: "The house holds three kinds of body. A cluster, a family of planets, and new worlds in the void.", observation: "One house. Three fields." },
  fourtee2: { fieldNote: "The family of planets that carry the fourtee2 name. Media has its own field underneath.", observation: "Travel, media, ritual, digital, labs." },
  travel: { fieldNote: "Route intelligence begins with a human preference, then resolves the world around it.", observation: "Routes reframed through price, place and pace." },
  fourtee2media: { fieldNote: "The media brand of the house. Fourtee blue on carbon or off-white, and a signal that marks the broadcast.", observation: "Sound and rooms. Both projects live here." },
  music: { fieldNote: "A fourtee2media project. A living listening field for transmissions that keep the night in motion.", observation: "Frequency, held by the media field." },
  others: { fieldNote: "A fourtee2media project. The Others in the Room: voices, presence, and whoever stays after the noise.", observation: "A room is a broadcast with the door shut." },
  you: { fieldNote: "A quieter system for restoring attention, energy and the rituals that hold a day together.", observation: "The body is a planet with its own weather." },
  cinevo: { fieldNote: "A fourtee2digital project. A private library that stays close to its owner.", observation: "Memory becomes a system when it can be returned to." },
  cdxi: { fieldNote: "A star. Client work gathers here and stays part of the cluster.", observation: "Close work. Not a planet." },
  corporate: { fieldNote: "Organisations that hire the practice. The work stays with the client.", observation: "Part of the cluster." },
  outside: { fieldNote: "Projects that do not wear the fourtee2 name. They still belong to the cluster.", observation: "Outside the family. Still in the cluster." },
  fleshsesh: { fieldNote: "A new world forming in the void, with the academy, the meat app and sinorgy.", observation: "Not yet a planet. Already a world." },
  academy: { fieldNote: "The teaching arm of fleshsesh. Sessions, study and the practice of presence.", observation: "A school is a slow orbit." },
  meat: { fieldNote: "The app for the work of the body. Sessions logged, training kept close.", observation: "The practice needs a place to live." },
  fourtee2digital: { fieldNote: "Digital products and intelligent systems. Cinevo reports here.", observation: "The library lives inside the digital field." },
  fourtee2labs: { fieldNote: "A boundary field for prototypes, research and the futures worth making tangible.", observation: "An experiment is a question allowed to acquire form." },
  "origin-atlas": { fieldNote: "A cdxi client project, held with the other client work.", observation: "Every system leaves a trace of where it started." },
  "sinorgy-models": { fieldNote: "Talent and visual culture, held in the void with fleshsesh.", observation: "A presence can carry an entire atmosphere." },
};

export type WorldSystem = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  detail: string;
};

export const worldSystems: Record<string, WorldSystem[]> = {
  travel: [
    { id: "route-engine", title: "Route Engine", description: "Real-time pathfinding across terrestrial and orbital nodes.", actionLabel: "SIMULATE", detail: "Resolving optimal vectors for 1,400+ destinations." },
    { id: "signal-board", title: "Signal Board", description: "A personal repository for saved discovery data on this device.", actionLabel: "ACCESS", detail: "Saved routes stay on this device until you clear them." },
  ],
  music: [
    { id: "frequency-mod", title: "Frequency Mod", description: "Adjust the spectral density of the current transmission.", actionLabel: "MODULATE", detail: "Current density: 0.84 spectral units." },
    { id: "queue-manager", title: "Queue Manager", description: "Manage the sequence of incoming audio signals.", actionLabel: "REORDER", detail: "22 tracks in manifest. Sequence held in the listening field." },
  ],
  fourtee2media: [
    { id: "signal", title: "Signal", description: "The broadcast mark. Three arcs, Fourtee blue, used beside the wordmark.", actionLabel: "HOLD", detail: "Icon clear space is the height of the mark." },
    { id: "projects", title: "Projects", description: "4[music]2 and The Others in the Room both report here.", actionLabel: "OPEN", detail: "Nothing in this field broadcasts under another name." },
  ],
  others: [
    { id: "room", title: "The Room", description: "A held space for the voices that stay.", actionLabel: "ENTER", detail: "A fourtee2media project. The door stays with the media field." },
    { id: "voices", title: "Voices", description: "Who is in the room, and who is only passing through.", actionLabel: "LISTEN", detail: "Episodes live with the project, not with the house." },
  ],
  you: [
    { id: "ritual-timer", title: "Ritual Timer", description: "Timed intervals for restoration and performance protocols.", actionLabel: "START", detail: "20-minute protocol suggested for the current field." },
    { id: "care-index", title: "Care Index", description: "A library of care signals for biological maintenance.", actionLabel: "BROWSE", detail: "14 active protocols for restoration." },
  ],
  cinevo: [
    { id: "server-status", title: "Server Status", description: "Real-time health of your personal media library.", actionLabel: "PING", detail: "Server online. Latency: 12ms. 4.2TB available." },
    { id: "sharing-key", title: "Sharing Key", description: "Generate temporary access keys for guest observers.", actionLabel: "GENERATE", detail: "New key valid for 24 hours." },
  ],
  haus: [
    { id: "branches", title: "Three Fields", description: "A star cluster, a family of planets, and new worlds in the void.", actionLabel: "READ", detail: "Nothing in the field sits outside the house." },
    { id: "governance", title: "House Rules", description: "The wordmark, the field, and what is allowed to carry the name.", actionLabel: "INSPECT", detail: "Righteous is locked to fourtee2. Branches keep their own names." },
  ],
  fourtee2: [
    { id: "family", title: "Family Index", description: "Travel, media, you, digital and labs.", actionLabel: "LIST", detail: "fourtee2media holds the broadcasts. fourtee2digital holds cinevo." },
    { id: "naming", title: "Naming", description: "What is allowed to wear fourtee2, and what must live elsewhere.", actionLabel: "READ", detail: "Outside work routes to cdxi. Culture routes to fleshsesh." },
  ],
  corporate: [
    { id: "roster", title: "Client Roster", description: "Active organisations, and Origin Atlas.", actionLabel: "OPEN", detail: "Origin Atlas reports here. Nothing on this roster is a fourtee2 product." },
    { id: "delivery", title: "Delivery", description: "How a client engagement moves from brief to field.", actionLabel: "INSPECT", detail: "Brief, system, handover. The client keeps the work." },
  ],
  outside: [
    { id: "ledger", title: "Outside Ledger", description: "Projects that are not part of the fourtee2 family.", actionLabel: "SCAN", detail: "If it does not carry the name, it is recorded here." },
    { id: "boundary", title: "Boundary", description: "The line between a family product and an outside project.", actionLabel: "READ", detail: "Family products report to fourtee2. Everything else reports to cdxi." },
  ],
  academy: [
    { id: "curriculum", title: "Curriculum", description: "Study paths inside the fleshsesh academy.", actionLabel: "BROWSE", detail: "Presence, performance and the long session." },
    { id: "enrolment", title: "Enrolment", description: "How someone enters the academy.", actionLabel: "OPEN", detail: "Application, then a first session." },
  ],
  meat: [
    { id: "session-log", title: "Session Log", description: "Training recorded in the meat app.", actionLabel: "VIEW", detail: "Each session is a signal. The log keeps the sequence." },
    { id: "build", title: "Build Status", description: "Where the app is in its current pass.", actionLabel: "PING", detail: "Building. Core loop is sessions, not a social feed." },
  ],
  cdxi: [
    { id: "venture-pipeline", title: "Venture Pipeline", description: "Active stages of current ideas and systems in motion.", actionLabel: "INSPECT", detail: "Corporate clients and outside-family work both report here." },
    { id: "brand-governance", title: "Brand Governance", description: "Strict visual and narrative rules for cdxi ventures.", actionLabel: "READ", detail: "Governance version 4.2. The fourtee2 wordmark stays with the family branch." },
  ],
  fleshsesh: [
    { id: "session-ledger", title: "Session Ledger", description: "History of presence and performance in the academy.", actionLabel: "VIEW", detail: "12 sessions completed. Performance rating: HIGH." },
    { id: "academy-access", title: "Academy Access", description: "Membership protocols for the fleshsesh culture world.", actionLabel: "VERIFY", detail: "Identity verified. All fields accessible." },
  ],
  fourtee2digital: [
    { id: "product-manifest", title: "Product Manifest", description: "Digital systems, and cinevo beneath them.", actionLabel: "OPEN", detail: "Cinevo is the private library. It reports to fourtee2digital." },
    { id: "ai-orchestrator", title: "AI Orchestrator", description: "Central management for distributed intelligent systems.", actionLabel: "MONITOR", detail: "4 nodes active. Average response: 420ms." },
  ],
  fourtee2labs: [
    { id: "prototype-bay", title: "Prototype Bay", description: "Live status of experimental interfaces and hardware.", actionLabel: "ENTER", detail: "3 active prototypes undergoing stress testing." },
    { id: "research-feed", title: "Research Feed", description: "Raw signal data from edge-case experiments.", actionLabel: "STREAM", detail: "The feed stays inside fourtee2 labs." },
  ],
  "origin-atlas": [
    { id: "map-layer", title: "Map Layer", description: "Toggle between historical and future system routes.", actionLabel: "TOGGLE", detail: "Currently viewing: ORIGIN MAP (Historical)." },
    { id: "pattern-match", title: "Pattern Match", description: "Identify recurring structures across the client work.", actionLabel: "SCAN", detail: "Held with cdxi clients, part of the cluster." },
  ],
  "sinorgy-models": [
    { id: "talent-index", title: "Talent Index", description: "Active profiles of collaborators and practitioners.", actionLabel: "SEARCH", detail: "Held with fleshsesh, in the void." },
    { id: "collab-portal", title: "Collab Portal", description: "Secure channel for project-specific communication.", actionLabel: "OPEN", detail: "3 active project threads." },
  ],
};

export type Airport = { code: string; city: string; airport: string; country: string };

export const airports: Airport[] = [
  { code: "PER", city: "Perth", airport: "Perth Airport", country: "Australia" },
  { code: "SYD", city: "Sydney", airport: "Kingsford Smith", country: "Australia" },
  { code: "MEL", city: "Melbourne", airport: "Tullamarine", country: "Australia" },
  { code: "BNE", city: "Brisbane", airport: "Brisbane Airport", country: "Australia" },
  { code: "ADL", city: "Adelaide", airport: "Adelaide Airport", country: "Australia" },
  { code: "AKL", city: "Auckland", airport: "Auckland Airport", country: "New Zealand" },
  { code: "DPS", city: "Bali", airport: "Ngurah Rai", country: "Indonesia" },
  { code: "SIN", city: "Singapore", airport: "Changi", country: "Singapore" },
  { code: "NRT", city: "Tokyo", airport: "Narita", country: "Japan" },
  { code: "HND", city: "Tokyo", airport: "Haneda", country: "Japan" },
  { code: "DXB", city: "Dubai", airport: "Dubai International", country: "United Arab Emirates" },
  { code: "DOH", city: "Doha", airport: "Hamad International", country: "Qatar" },
  { code: "LHR", city: "London", airport: "Heathrow", country: "United Kingdom" },
  { code: "CDG", city: "Paris", airport: "Charles de Gaulle", country: "France" },
  { code: "FCO", city: "Rome", airport: "Fiumicino", country: "Italy" },
  { code: "LIS", city: "Lisbon", airport: "Humberto Delgado", country: "Portugal" },
  { code: "LAX", city: "Los Angeles", airport: "Los Angeles International", country: "United States" },
  { code: "JFK", city: "New York", airport: "John F. Kennedy International", country: "United States" },
  { code: "SFO", city: "San Francisco", airport: "San Francisco International", country: "United States" },
];

export function airportValue(airport: Airport) {
  return `${airport.city} (${airport.code})`;
}

export function searchAirports(query: string, limit = 6) {
  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? airports.filter((airport) => `${airport.code} ${airport.city} ${airport.airport} ${airport.country}`.toLowerCase().includes(normalized))
    : airports;
  return results.slice(0, limit);
}

export const selectedPlaylist = {
  id: "b5889cb5-5682-4bb9-bf1b-407891ea5df9",
  title: "The Best of 4[music]2",
  tracks: [
    { id: "e40c616b-623c-4531-b524-3ebf9f170224", title: "STILL HERE.", detail: "Ethereal Pop" },
    { id: "64fdc961-6984-4ba8-affc-ebabd3746c56", title: "Under Pressure", detail: "Pop" },
    { id: "952e60e2-16a7-4d17-8878-95bcd4b01f3c", title: "LIGHTER", detail: "Ethereal Pop" },
    { id: "d94f8cd0-7ff3-4ae0-bc65-271bb04763bd", title: "Insheepnia {Red Sky Mix)", detail: "Electronic" },
    { id: "731d3240-467b-4610-9a89-47bcf70fcdc6", title: "You're Not The Problem", detail: "Electronic Dance" },
    { id: "88714ae4-e628-4fa9-8bfa-6cf290cc6e75", title: "A.D.I.D.A.S in My Head", detail: "Nu-Metal Pop" },
    { id: "dd98fc48-88fa-4959-9e93-18b52257f1ec", title: "the rush.", detail: "Industrial-Rock" },
    { id: "f92d7715-47c6-46d0-9d6d-dd5510ceb5fd", title: "Cant Get You Off My Leash", detail: "Disco Trance" },
    { id: "5a67fcef-1511-4e23-a3d9-6a91d0b56e67", title: "Pressure Room", detail: "Industrial" },
    { id: "311dd8ab-41d9-4426-9e39-72e84e53665f", title: "We Rise Like Giants", detail: "Arena-Pop" },
    { id: "19c9806a-d180-4f2a-bfbb-09ac9cf9959c", title: "The Legend of Matty", detail: "Dark" },
    { id: "2704810c-3527-42ba-a6b2-f94e6aee5b2f", title: "the rush. (adam & lillth)", detail: "Mashup" },
    { id: "11304099-b932-4357-916e-d08fb47977d3", title: "The Edge of Eden", detail: "Modern Pop-Rock" },
    { id: "f2b47125-0a82-4125-9dcd-d50de6121898", title: "Edge of Eden (encore)", detail: "Pop-Rock" },
    { id: "7ec3fe57-8849-4ce4-b1f0-2208c68e4341", title: "Red Light Cam", detail: "Cinematic Electro-Pop" },
    { id: "31c34b01-2d75-44b1-a0f4-6bf86f0f3cc4", title: "The Longest Lie", detail: "Live Arena Pop" },
    { id: "0e598062-4ef5-4a03-8ef5-1e741f2412c2", title: "Holding out for Shannon", detail: "Eurodance" },
    { id: "e2f07301-835a-423e-9316-fedb9c2be613", title: "Wild Garden", detail: "Pop-Rock" },
    { id: "4eab18ea-da9e-4b74-a6c6-dd927def1014", title: "Where Are You Now", detail: "Pop Rock" },
    { id: "0e4c41f3-18b6-4313-8e45-b6206f332cfb", title: "Where Are You Now (Remastered)", detail: "Pop Rock" },
    { id: "805154ee-3d76-4fc5-855d-e190b244fd00", title: "Pressure Room (Club Mix)", detail: "House" },
    { id: "ae30acf0-3162-4cdd-9496-eb77ab5d695a", title: "Shattered Truths", detail: "Indie" },
  ],
} as const;

export type PlaylistTrack = (typeof selectedPlaylist.tracks)[number];

export function formatPlaybackTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remain = Math.floor(seconds % 60);
  return `${minutes}:${String(remain).padStart(2, "0")}`;
}

export type PortalKey = "travel" | "music" | "you";

export const portals = {
  travel: {
    key: "travel" as const,
    wordmark: "fourtee2travel",
    eyebrow: "TRANSMISSION 01 / TERRAIN FIELD",
    designation: "WORLD / INTELLIGENCE / ARRIVAL",
    headline: "Any world. Your way.",
    image: "/portals/travel.jpg",
    intro: "fourtee2travel is the one-stop travel destination for every journey in the universe. Name the place, set the dates, decide what matters most — and let the field resolve the route around you.",
    note: "Cheapest. Best value. Most luxurious. The route begins with your definition of worth.",
    orbit: "THE WHOLE WORLD / YOUR SIGNAL",
    axisTitle: "Travel intelligence",
    axes: [
      { code: "A / 01", title: "Price radar", description: "Find the lowest viable fare, stay and transfer combination for the journey." },
      { code: "A / 02", title: "Value engine", description: "Balance price, location, comfort and time so the trip gives more than it takes." },
      { code: "A / 03", title: "Luxury field", description: "Prioritise the stay, seat and small details that make the arrival exceptional." },
    ],
    logTitle: "Intelligence log / departure sequence",
    log: [
      { sequence: "01", title: "Set the signal", detail: "Choose the destination, timing and outcome that will make this journey worth taking." },
      { sequence: "02", title: "Scan the field", detail: "Compare flights, stays and routes through the lens you chose — not a one-size-fits-all result." },
      { sequence: "03", title: "Move with certainty", detail: "Save the route that meets your standard, then keep the journey close on your signal board." },
    ],
    status: "FIELD OPEN / ROUTES IN FORMATION",
    index: "01",
  },
  music: {
    key: "music" as const,
    wordmark: "4[music]2",
    eyebrow: "TRANSMISSION 02 / FREQUENCY FIELD",
    designation: "SOUND / MEMORY / MOTION",
    headline: "Choose your frequency. Keep it close.",
    image: "/portals/music.jpg",
    intro: "4[music]2 is an ambient index for the music that holds a moment in place. A sequence for the road after dark, the room before people arrive, and the day when the signal is low.",
    note: "No noise. Just the tracks that alter the atmosphere.",
    orbit: "THE SOUND IS THE COORDINATE",
    axisTitle: "Frequency selection",
    axes: [
      { code: "B / 01", title: "Calibrate", description: "Start with tempo, light and the weather outside the window." },
      { code: "B / 02", title: "Sequence", description: "Let the next track arrive like a change in terrain." },
      { code: "B / 03", title: "Repeat", description: "Keep the frequencies that become part of the memory." },
    ],
    logTitle: "Signal queue / listening field",
    log: [
      { sequence: "01", title: "Night drive", detail: "Low horizon, late lanes, a pulse with room to breathe." },
      { sequence: "02", title: "Soft arrival", detail: "For keys on the table and the light that stays on after midnight." },
      { sequence: "03", title: "Altitude", detail: "For any moment that needs its edges taken away." },
    ],
    status: "FIELD OPEN / SEQUENCES IN ORBIT",
    index: "02",
  },
  you: {
    key: "you" as const,
    wordmark: "4[you]2",
    eyebrow: "TRANSMISSION 03 / PERSONAL FIELD",
    designation: "RITUAL / FORM / ENERGY",
    headline: "Hold the signal. Move differently.",
    image: "/portals/you.jpg",
    intro: "4[you]2 is a personal field for the small systems that alter how you arrive. A considered collection of ritual, recovery and form — built for energy with a point of view.",
    note: "The personal field is in orbit. Keep your coordinates close.",
    orbit: "RITUAL IS A FORM OF SIGNAL",
    axisTitle: "Personal protocol",
    axes: [
      { code: "C / 01", title: "Prepare", description: "Start with the details that set the day into motion." },
      { code: "C / 02", title: "Perform", description: "Carry only what supports your energy and your attention." },
      { code: "C / 03", title: "Recover", description: "Return to the rituals that make the next day possible." },
    ],
    logTitle: "Protocol log / personal orbit",
    log: [
      { sequence: "01", title: "First layer", detail: "Hair, skin and the first deliberate act of the day." },
      { sequence: "02", title: "Midfield", detail: "Form, focus and the cue that brings the energy back." },
      { sequence: "03", title: "Return state", detail: "The quiet protocol for taking the field back down." },
    ],
    status: "FIELD IN ORBIT / PROTOCOL READY",
    index: "03",
  },
};

export const destinations = [
  { id: "perth", number: "01", name: "Perth", location: "WA / AU", lat: -31.9535, lng: 115.857, mapX: 78, mapY: 72, note: "A long westward light. Start at the river, then let the coast alter the route." },
  { id: "tokyo", number: "02", name: "Tokyo", location: "KANTO / JP", lat: 35.6762, lng: 139.6503, mapX: 84, mapY: 36, note: "Follow the quiet alleys after the last train. Keep the first coffee unplanned." },
  { id: "lisbon", number: "03", name: "Lisbon", location: "LISBOA / PT", lat: 38.7223, lng: -9.1393, mapX: 38, mapY: 40, note: "Look for the hill with the late tables. Let the city decide when to descend." },
];

export const travelPriorities = [
  { id: "lowest", number: "01", label: "CHEAPEST", title: "Lowest viable fare", description: "Keep the route lean. The field prioritises the most economical combination of fare, stay and transfer.", metric: "PRICE / FIRST" },
  { id: "value", number: "02", label: "BEST VALUE", title: "Worth more than it costs", description: "Balance location, timing, comfort and price to find the journey that returns the most for every dollar.", metric: "RETURN / FIRST" },
  { id: "luxury", number: "03", label: "LUXURY", title: "The elevated route", description: "Put exceptional stays, thoughtful service and effortless movement at the centre of the travel field.", metric: "EXPERIENCE / FIRST" },
] as const;

export const ritualPhases = [
  { id: "prepare", label: "PREPARE", seconds: 4 * 60, cue: "Set the room. One deliberate first act." },
  { id: "perform", label: "PERFORM", seconds: 12 * 60, cue: "Carry only what supports attention." },
  { id: "recover", label: "RECOVER", seconds: 4 * 60, cue: "Bring the field back down." },
] as const;
