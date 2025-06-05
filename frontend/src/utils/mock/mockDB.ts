import { faAmazon, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faGlobe,
  faMap,
  faChartSimple,
  faCartShopping,
  faShield,
  faDollar,
  faWallet,
  faDatabase,
  faTicket,
  faPaw
} from "@fortawesome/free-solid-svg-icons";

export const websites = [
  {
    title: "Amazon",
    url: "https://amazon.com",
    icon: faAmazon,
  },
  {
    title: "Autoppia",
    url: "https://autoppia.com",
    icon: faGlobe,
  },
  {
    title: "Autoppia Dashboard",
    url: "https://app.autoppia.com",
    icon: faGlobe,
  },
  {
    title: "Bitrefill",
    url: "https://www.bitrefill.com",
    icon: faGlobe,
  },
  {
    title: "Bittensor",
    url: "https://www.bittensor.ai",
    icon: faGlobe,
  },
  {
    title: "Google Search",
    url: "https://google.com",
    icon: faGoogle,
  },
  {
    title: "Google Maps",
    url: "https://maps.google.com",
    icon: faMap,
  },
  {
    title: "Pokemon Showdown",
    url: "https://pokemonshowdown.com",
    icon: faGlobe,
  },
  {
    title: "Tao App",
    url: "https://www.tao.app",
    icon: faGlobe,
  },
  {
    title: "Tao Stats",
    url: "https://taostats.io",
    icon: faGlobe,
  },
  {
    title: "Tao Yield",
    url: "https://www.taoyield.com",
    icon: faGlobe,
  },
];

export const bittensorPrompts = [
  {
    title: "Subnet36 Key Stats in Bittensor.ai",
    prompt: "Find subnet 36 page, go to detail page and tell me the Key alpha stats.",
    url: "https://www.bittensor.ai",
    icon: faChartSimple,
  },
  {
    title: "Top SN36 Validators by APY in Taoyield",
    prompt: "Which are the top 5 validators with more APY in a 30D period?",
    url: "https://www.taoyield.com",
    icon: faShield,
  },
  {
    title: "Ask Savant in Tao.app",
    prompt: "Ask the assistant which is the price of Autoppia and how much emissions they have.",
    url: "https://www.tao.app/assistant",
    icon: faDollar,
  },
  {
    title: "Portfolio Wallet Creation in Taostats",
    prompt: "Signup annonimously and create a new portfolio wallet for {ADDRESS} and tell me the balance and tao staked in root",
    url: "https://taostats.io",
    icon: faWallet,
  }
];

export const generalPrompts = [
  {
    title: "Amazon Full Checkout",
    prompt: "Search for a red shirt, add to cart, proceed to checkout, login and fill address.",
    url: "https://amazon.com",
    icon: faCartShopping,
  },
  {
    title: "Autoppia Platform Demo",
    prompt: "Edit the postgres database integration and change port to existing port + 1.",
    url: "https://app.autoppia.com",
    icon: faDatabase,
  },
  {
    title: "Bitrefill Steam $50 Coupon",
    prompt: "Find a Steam Coupon of 50 dollars and add to cart, then go to cart detail (do not change currency).",
    url: "https://www.bitrefill.com",
    icon: faTicket,
  },
  {
    title: "Pokemon Match",
    prompt: "Play 1 match of pokemon vs a random opponent.",
    url: "https://pokemonshowdown.com",
    icon: faPaw,
  }
];
