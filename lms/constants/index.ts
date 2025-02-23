import {
  Command,
  AudioWaveform,
  Sparkles,
  Home,
  Inbox,
  Trash2,
  MessageCircleQuestion,
  Building2,
  Film,
  BarChart,
  Layers,
  Users,
  BellRing,
  Layout,
  Compass
} from "lucide-react";

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
export const APP_URL = `${process.env.NEXT_PUBLIC_APP_URL}`;
export const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/#" },
  { name: "Policy", href: "/#" },
  { name: "FAQ", href: "/#fyq" },
];
export const userRoutes = [
  {
    title: "Dashboard",
    url: "/user",
    icon: Layout,
    isActive: false,
    items: [
      {
        title: "/",
        url: "/user",
      },
    ],
  },
  {
    title: "Browse",
    url: "/courses",
    icon: Compass,
    isActive: true,
    items: [
      {
        title: "/",
        url: "/courses",
      },
    ],
  },
];
export const teacherRoutes = [
  {
    title: "Courses",
    url: "/teacher/courses",
    icon: Film,
    isActive: true,
    items: [
      {
        title: "/",
        url: "/teacher/courses",
      },
    ],
  },
  {
    title: "Analytics",
    url: "/teacher/analytics",
    icon: BarChart,
    items: [
      {
        title: "/",
        url: "/teacher/analytics",
      },
    ],
  },
];
export const adminRoutes = [
  {
    title: "Courses",
    url: "/admin/courses",
    icon: Film,
    isActive: true,
    items: [
      {
        title: "/",
        url: "/admin/courses",
      },
    ],
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart,
    items: [
      {
        title: "/",
        url: "/admin/analytics",
      },
    ],
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Layers,
    items: [
      {
        title: "/",
        url: "/admin/categories",
      },
    ],
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
    items: [
      {
        title: "/",
        url: "/admin/users",
      },
    ],
  },
  {
    title: "Teachers",
    url: "/admin/teachers",
    icon: Users,
    items: [
      {
        title: "/",
        url: "/admin/teachers",
      },
    ],
  },
  {
    title: "Applications",
    url: "/admin/applications",
    icon: Users,
    items: [
      {
        title: "/",
        url: "/admin/applications",
      },
    ],
  },
  {
    title: "Companies",
    url: "/admin/companies",
    icon: Building2,
    items: [
      {
        title: "/",
        url: "/admin/companies",
      },
    ],
  },
  {
    title: "Notifications",
    url: "/admin/notifications",
    icon: BellRing,
    items: [
      {
        title: "/",
        url: "/admin/notifications",
      },
    ],
  },
];

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Ask AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  navPrimary: [],
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
      emoji: "💪",
    },
    {
      name: "Book Notes & Reading List",
      url: "#",
      emoji: "📚",
    },
    {
      name: "Sustainable Gardening Tips & Plant Care",
      url: "#",
      emoji: "🌱",
    },
    {
      name: "Language Learning Progress & Resources",
      url: "#",
      emoji: "🗣️",
    },
    {
      name: "Home Renovation Ideas & Budget Tracker",
      url: "#",
      emoji: "🏠",
    },
    {
      name: "Personal Finance & Investment Portfolio",
      url: "#",
      emoji: "💰",
    },
    {
      name: "Movie & TV Show Watchlist with Reviews",
      url: "#",
      emoji: "🎬",
    },
    {
      name: "Daily Habit Tracker & Goal Setting",
      url: "#",
      emoji: "✅",
    },
  ],
  workspaces: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔",
        },
        {
          name: "Health & Wellness Tracker",
          url: "#",
          emoji: "🍏",
        },
        {
          name: "Personal Growth & Learning Goals",
          url: "#",
          emoji: "🌟",
        },
      ],
    },
    {
      name: "Professional Development",
      emoji: "💼",
      pages: [
        {
          name: "Career Objectives & Milestones",
          url: "#",
          emoji: "🎯",
        },
        {
          name: "Skill Acquisition & Training Log",
          url: "#",
          emoji: "🧠",
        },
        {
          name: "Networking Contacts & Events",
          url: "#",
          emoji: "🤝",
        },
      ],
    },
    {
      name: "Creative Projects",
      emoji: "🎨",
      pages: [
        {
          name: "Writing Ideas & Story Outlines",
          url: "#",
          emoji: "✍️",
        },
        {
          name: "Art & Design Portfolio",
          url: "#",
          emoji: "🖼️",
        },
        {
          name: "Music Composition & Practice Log",
          url: "#",
          emoji: "🎵",
        },
      ],
    },
    {
      name: "Home Management",
      emoji: "🏡",
      pages: [
        {
          name: "Household Budget & Expense Tracking",
          url: "#",
          emoji: "💰",
        },
        {
          name: "Home Maintenance Schedule & Tasks",
          url: "#",
          emoji: "🔧",
        },
        {
          name: "Family Calendar & Event Planning",
          url: "#",
          emoji: "📅",
        },
      ],
    },
    {
      name: "Travel & Adventure",
      emoji: "🧳",
      pages: [
        {
          name: "Trip Planning & Itineraries",
          url: "#",
          emoji: "🗺️",
        },
        {
          name: "Travel Bucket List & Inspiration",
          url: "#",
          emoji: "🌎",
        },
        {
          name: "Travel Journal & Photo Gallery",
          url: "#",
          emoji: "📸",
        },
      ],
    },
  ],
};
