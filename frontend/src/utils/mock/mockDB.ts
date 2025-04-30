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
    title: "Check Autoppia on Taomarketcap",
    prompt: "Go to taomarketcap.com, find the web-agents subnet in subnet section. Tell me the current price and summarize info from their GitHub.",
    icon: faChartColumn,
  },
  {
    title: "Summarize TAO Market on tao.app",
    prompt: "Go to tao.app and summarize the current state of the Bittensor financial market.",
    icon: faBrain,
  },
  {
    title: "Compare TAO Yields",
    prompt: "Go to taoyield.com and compare yields for Root 0 and Subnet 36.",
    icon: faChartLine,
  },
  {
    title: "Explore New Subnets",
    prompt: "Go to taostats.io, find recently launched Bittensor subnets and summarize their purpose and performance.",
    icon: faMap,
  }
]

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
]
