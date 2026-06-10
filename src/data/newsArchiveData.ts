export interface LudoMatchStat {
  label: string;
  home: string | number;
  away: string | number;
}

export interface LudoNewsItem {
  id: string;
  division: "LudoLeague" | "Ludo4Schools" | "BOTK" | "all";
  category: string;
  timestamp: string;
  title: string;
  summary: string;
  urgency: "breaking" | "editorial" | "live" | "archive";
  gridSize: string;
  score?: { home: string; away: string; homeScore: number; awayScore: number };
  liveStats?: LudoMatchStat[];
  dossierMetrics?: string[];
}

export const LUDO_NEWS_DATABASE: LudoNewsItem[] = [
  {
    id: "ludo-news-01",
    division: "BOTK",
    category: "Battle of the Kasis // Grand Finals Live",
    timestamp: "10.06.2026 // Round 4 // Tick 42'",
    title: "Soweto Ludo Giants vs Alexandra Masters",
    summary: "A spectacular double-token blockade manipulation on the shared main orbital track triggers a massive late-stage capture sequence. High-intensity positional pressure shifts bracket supremacy.",
    urgency: "live",
    gridSize: "md:col-span-2 md:row-span-2 bg-black border-2 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.15)]",
    score: { home: "SOW", away: "ALX", homeScore: 3, awayScore: 2 },
    liveStats: [
      { label: "Tokens Captured", home: 8, away: 5 },
      { label: "Locked Base Releases", home: 4, away: 3 },
      { label: "Consecutive Sixes", home: 1, away: 2 },
      { label: "Blockades Formed", home: 3, away: 1 }
    ],
    dossierMetrics: ["Target: BOTK National Cup", "Referees: 3 Certified Judges", "Attendance: 1,400+ Live"]
  },
  {
    id: "ludo-news-02",
    division: "LudoLeague",
    category: "Mamelodi Circuit",
    timestamp: "09.06.2026",
    title: "Township carpentry workshops upgrade board manufacturing metrics",
    summary: "Strategic deployment of heavy-duty 6mm MDF routing matrices increases localized production speed. Directly expanding circular economic cash flow inside local carpentry networks.",
    urgency: "editorial",
    gridSize: "md:col-span-1 md:row-span-1 bg-neutral-950 border border-neutral-900"
  },
  {
    id: "ludo-news-03",
    division: "Ludo4Schools",
    category: "Syllabus Expansion",
    timestamp: "08.06.2026",
    title: "15 New Gauteng schools integrate cognitive math blueprints",
    summary: "Pioneering curriculum add-on leverages physical board counting vectors to sharpen rapid mental summation, probability assessment, and spatial geometry paths in classrooms.",
    urgency: "editorial",
    gridSize: "md:col-span-1 md:row-span-1 bg-neutral-950 border border-neutral-900"
  },
  {
    id: "ludo-news-04",
    division: "LudoLeague",
    category: "Ecosystem Review",
    timestamp: "07.06.2026",
    title: "Nedbank transactional pipeline automates club entry verification",
    summary: "An analytical breakdown of decentralized digital payment architectures. Automated database matching secures ledger profiles, optimizing registration workflows.",
    urgency: "archive",
    gridSize: "md:col-span-3 md:row-span-1 bg-black border border-neutral-900"
  }
];

export const MOCK_LUDO_ARCHIVES: LudoNewsItem[] = [
  { id: "ludo-arch-01", division: "LudoLeague", category: "AFCON 2023", timestamp: "12.10.2023", title: "Thabo 'The Dice' Nkosi clinches continental tournament crown", summary: "Alexandra Club master technician secures absolute board control with a historic 9-1 match record, utilizing advanced choke-point containment trajectories.", urgency: "archive", gridSize: "", dossierMetrics: ["Record: 9 Wins // 1 Loss", "Tournament: AFCON Cup", "Board Spec: 6mm Lacquer Premium"] },
  { id: "ludo-arch-02", division: "BOTK", category: "Soweto Bracket", timestamp: "24.09.2024", title: "Orlando Masters enforce touch-is-a-move dispute resolution", summary: "Official adjudicators issue strict enforcement vectors regarding token manipulation protocols to maintain competitive integrity inside grassroots hubs.", urgency: "archive", gridSize: "", dossierMetrics: ["Rulings Enforced: 4", "Adjudication Tier: Certified Judges", "Dispute Category: Touch-Move"] },
  { id: "ludo-arch-03", division: "LudoLeague", category: "Pretoria Circuit", timestamp: "15.08.2025", title: "Mamelodi United secures undefeated weekly fixture array", summary: "Defensive perimeter chokepoints restrict opponent trajectory variations, setting a league record for the lowest average token returns of the fiscal cycle.", urgency: "archive", gridSize: "", dossierMetrics: ["Win Streak: 8 Matches", "Average Captures: 14", "Points Generated: 24"] },
  { id: "ludo-arch-04", division: "Ludo4Schools", category: "Math Clinic", timestamp: "04.05.2025", title: "Mamelodi primary schools chart rapid spatial summation metrics", summary: "Data tracking confirms a 22% uplift in spatial coordinate math reasoning following a 12-week structured physical Ludo clinic implementation.", urgency: "archive", gridSize: "", dossierMetrics: ["Sample Size: 450 Students", "Metric Delta: +22% Logic Lift", "Funding: Corporate CSI Grant"] }
];
