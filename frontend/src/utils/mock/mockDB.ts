import { faAws, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faMap } from "@fortawesome/free-solid-svg-icons";

export const DB = {
  messages: [
    {
      role: "user",
      content: "Hey, can you check the server status?",
    },
    {
      role: "assistant",
      thinking: "Selecting dates for weekend stay",
      content:
        "Sure! I just checked the server, and everything is running smoothly. No downtime or performance issues detected. Let me know if you need a more detailed report on server logs or resource usage.",
      action: [
        "Navigating to Hipcamp for campsite",
        'Entering "Joshua Tree" for search',
        "Selecting broader area, Joshua Tree",
        "Entering dates for Joshua Tree trip",
        "Selecting dates for weekend stay",
      ],
      status: "success",
    },
  ],
};

export const websites = [
  {
    title: "Google Search",
    url: "https://google.com",
    icon: faGoogle,
  },
  {
    title: "Amazon Web Service",
    url: "https://aws.amazon.com/",
    icon: faAws,
  },
  {
    title: "Google Maps",
    url: "https://maps.google.com",
    icon: faMap,
  },
];
