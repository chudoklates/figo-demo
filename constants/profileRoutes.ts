import {
  ArticleOutlined,
  BookmarkBorderOutlined,
  ChatBubbleOutline,
  CheckCircleOutline,
  CreditCard,
  Home,
  // LockOutlined,
  Logout,
  // People,
  // Person,
  Settings,
  StarOutline,
} from "@mui/icons-material";

export const PROFILE_ROUTES = [
  {
    label: "Übersicht",
    path: "/app/dashboard",
    icon: Home,
  },
  // {
  //   label: "Profil bearbeiten",
  //   path: "/app/profile",
  //   icon: Person,
  // },
  {
    label: "Persönliche Daten",
    path: "/app/personal-info",
    icon: ArticleOutlined,
  },
  {
    label: "Buchungen",
    path: "/app/buchungen",
    icon: BookmarkBorderOutlined,
  },
  {
    label: "Interessen",
    path: "/app/interessen",
    icon: StarOutline,
  },
  // {
  //   label: "Freunde",
  //   path: "/app/friends",
  //   icon: People,
  // },
  {
    label: "Ihr Abos & Karten",
    path: "/app/mitgliedschaft",
    icon: CheckCircleOutline,
  },
  // {
  //   label: "Privatsphäre",
  //   path: "/app/account-privacy",
  //   icon: LockOutlined,
  // },
  {
    label: "Zahlungen",
    path: "/app/zahlungen",
    icon: CreditCard,
  },
  {
    label: "Konto Verwaltung",
    path: "/app/konto-einstellungen",
    icon: Settings,
  },
  {
    label: "Hilfe",
    path: "/faq",
    icon: ChatBubbleOutline,
  },
];
