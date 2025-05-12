import { faAws, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faGlobe,
  faMap,
  faChartColumn,
  faBrain,
  faChartLine,
  faCartShopping,
  faBox,
  faMagnifyingGlass,
  faNewspaper
} from "@fortawesome/free-solid-svg-icons";

export const websites = [
  {
    title: "Google Search",
    url: "https://google.com",
    icon: faGoogle,
  },
  {
    title: "Amazon Web Service",
    url: "https://aws.amazon.com",
    icon: faAws,
  },
  {
    title: "Google Maps",
    url: "https://maps.google.com",
    icon: faMap,
  },
  {
    title: "Autoppia",
    url: "https://autoppia.com",
    icon: faGlobe,
  },
];

export const bittensorPrompts = [
  {
    title: "Review Autoppia",
    prompt: "Go to taostats.com and open autoppia web-agents subnet page. Analyze liquidity and price and then go to their github and summarize it a bit.",
    icon: faChartColumn,
  },
  {
    title: "Summarize top-3 subnets’ GitHub",
    prompt: "Go to taomarketcap.com and for the top 3 subnets in terms of price go to their githubs and summarize what the subnet does.",
    icon: faBrain,
  },
  {
    title: "Snapshot dTao market metrics",
    prompt: "Go to tao.app metrics section and summarize the state of dtao market",
    icon: faChartLine,
  },
  {
    title: "Analyze subnet 36 APR and validators",
    prompt: "Go to taoyield.com and tell me for subnet 36 web agents which is apr for 30d and which are the best validators to stake with. ",
    icon: faMap,
  }
];

export const generalPrompts = [
  {
    title: "Compare Prices Across Online Stores",
    prompt: "Search for the cheapest price for a product, including shipping and stock availability.",
    icon: faCartShopping,
  },
  {
    title: "Track a Product on Amazon & eBay",
    prompt: "Tell me if this product is in stock and how much it costs on Amazon and eBay.",
    icon: faBox,
  },
  {
    title: "Quick Competitor Scan",
    prompt: "Find top 3 competitors for a product or company and summarize their features or offers.",
    icon: faMagnifyingGlass,
  },
  {
    title: "Get Trending Tech News",
    prompt: "Show me the top trending news in AI and tech from today.",
    icon: faNewspaper,
  }
];
