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
    prompt: "Open web-agents subnet page. Analyze liquidity and price and then go to their github and summarize it a bit.",
    url: "https://taostats.io",
    icon: faChartColumn,
  },
  {
    title: "Summarize top-3 subnets’ GitHub",
    prompt: "For the top 3 subnets in terms of price go to their githubs and summarize what the subnet does.",
    url: "https://taomarketcap.com",
    icon: faBrain,
  },
  {
    title: "Snapshot dTao market metrics",
    prompt: "Go to metrics section and summarize the state of dtao market",
    url: "https://tao.app",
    icon: faChartLine,
  },
  {
    title: "Analyze subnet 36 APR and validators",
    prompt: "Tell me for subnet 36 web agents which is apr for 30d and which are the best validators to stake with. ",
    url: "https://taoyield.com",
    icon: faMap,
  }
];

export const generalPrompts = [
  {
    title: "Solve Captcha",
    prompt: "Solve the captcha",
    url: "https://captcha.com/demos/features/captcha-demo.aspx",
    icon: faCartShopping,
  },
  {
    title: "Find the Cheapest Flight",
    prompt: "Find the cheapest flight from New York to London for next week",
    url: "https://kayak.com",
    icon: faBox,
  },
  {
    title: "Get Me the Top Rated Laptop",
    prompt: "Search for laptop, sort by best rating, and give me the price of the first result",
    url: "https://amazon.com",
    icon: faMagnifyingGlass,
  },
  {
    title: "Explore Top Tech News",
    prompt: "Summarize the main points from the top 3 research articles on AI ethics published this year.",
    url: "https://arxiv.org",
    icon: faNewspaper,
  }
];
