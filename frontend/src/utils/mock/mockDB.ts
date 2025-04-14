import { faAws, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faGlobe,
  faMap,
  faChartColumn,
  faBrain,
  faChartLine
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

export const examplePrompts = [
  {
    title: "Check Autoppia on Taomarketcap",
    prompt: "Go to taomarketcap.com, find the Autoppia subnet section. Tell me the current price and summarize info from their GitHub.",
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
    prompt: "Find recently launched Bittensor subnets and summarize their purpose and performance.",
    icon: faMap,
  }
]
