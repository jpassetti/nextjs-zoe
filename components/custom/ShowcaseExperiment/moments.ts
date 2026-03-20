export type ShowcaseItem = {
  id: string;
  title: string;
  hook: string;
  pitch: string;
  happyEnding: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  visual: {
    accent1: string;
    accent2: string;
  };
};

export const showcaseMoments: ShowcaseItem[] = [
  {
    id: "founder-shift",
    title: "I was the technical founder. Now I'm the CEO.",
    hook:
      "You can feel the company outgrowing your old operating style. You are still pulled into product details while decisions stack up around you and the team is waiting for direction.",
    pitch:
      "Irini partners with you as an objective outside voice so you can step out of constant firefighting, strengthen your senior leadership team, and redesign how leadership works as the company scales.",
    happyEnding:
      "You lead at the altitude your company now needs, your leadership team takes fuller ownership, and growth is no longer bottlenecked through you.",
    primaryCTA: {
      label: "Explore this Moment",
      href: "#",
    },
    secondaryCTA: {
      label: "About Irini",
      href: "#",
    },
    visual: {
      accent1: "#b67f5f",
      accent2: "#325576",
    },
  },
  {
    id: "first-time-manager",
    title: "I was promoted to manager, and now everything feels heavier.",
    hook:
      "You were promoted because you are exceptional at execution, but now every week feels heavier: people issues, competing priorities, and decisions with bigger consequences.",
    pitch:
      "Irini helps you grow into leadership without becoming a different person. Her coaching is empowering, not directive, so you build judgment, boundaries, and people-leadership capacity that match your new scope.",
    happyEnding:
      "You communicate with more authority, delegate with confidence, and create a healthier pace for yourself and your team.",
    primaryCTA: {
      label: "Explore this Moment",
      href: "#",
    },
    secondaryCTA: {
      label: "Work with Irini",
      href: "#",
    },
    visual: {
      accent1: "#2a5d67",
      accent2: "#8f6d9e",
    },
  },
  {
    id: "team-misalignment",
    title: "We keep revisiting the same leadership issues.",
    hook:
      "You keep having the same executive conversations, but alignment does not hold. Cross-functional friction increases and strategic momentum keeps slipping.",
    pitch:
      "Irini helps your leadership team see what is really happening in the human system, clarify decision pathways, and build practical alignment habits that can keep pace with growth.",
    happyEnding:
      "Your team aligns faster, decision rights become clear, and execution improves across departments without constant escalation.",
    primaryCTA: {
      label: "Explore this Moment",
      href: "#",
    },
    secondaryCTA: {
      label: "Case Study",
      href: "#",
    },
    visual: {
      accent1: "#3d5f99",
      accent2: "#738f5b",
    },
  },
  {
    id: "executive-departures",
    title: "After key departures, leadership feels unstable.",
    hook:
      "After key departures, you are carrying instability on top of normal growth pressure. Accountability feels blurry, confidence drops, and everyone is watching leadership for signals.",
    pitch:
      "Irini gives you objective, stabilizing partnership in the moments where overreaction is costly. Together, you clarify interim structure, reconnect priorities, and help leaders respond with composure.",
    happyEnding:
      "Trust starts to rebuild, leadership coherence returns, and your next organizational structure is designed intentionally instead of by emergency.",
    primaryCTA: {
      label: "Explore this Moment",
      href: "#",
    },
    secondaryCTA: {
      label: "Work with Irini",
      href: "#",
    },
    visual: {
      accent1: "#5b5e86",
      accent2: "#9b7449",
    },
  },
  {
    id: "technical-expert",
    title: "I'm known for technical depth, but I want broader influence.",
    hook:
      "You are respected for technical depth, but you want broader influence across budget, sales, and strategic decisions. Role changes and organizational churn have made that path unclear.",
    pitch:
      "Irini helps you translate expertise into leadership impact through structured reflection, aligned goal-setting, and responsive coaching that adapts as the organization changes.",
    happyEnding:
      "You become more proactive, expand your influence beyond technical execution, and step into a stronger, more visible leadership identity.",
    primaryCTA: {
      label: "Explore this Moment",
      href: "#",
    },
    secondaryCTA: {
      label: "Service Page",
      href: "#",
    },
    visual: {
      accent1: "#46707e",
      accent2: "#8e5f6e",
    },
  },
];
