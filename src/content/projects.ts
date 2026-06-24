import type { RepositoryGroup } from "./types";

export const projectGroups = [
  {
    title: "Featured above",
    repositories: [
      { owner: "Sukikui", name: "PTI-LDM-VAE" },
      { owner: "creatis-myriad", name: "GENESIS" },
      { owner: "sensors-inl", name: "Nervous-Sensors" },
      { owner: "sensors-inl", name: "Nervous-Analytics" },
    ],
  },
  {
    title: "Minecraft",
    repositories: [
      { owner: "Sukikui", name: "MineVerify" },
      { owner: "Sukikui", name: "BiomeMap" },
      { owner: "Sukikui", name: "PlayerCoordsAPI" },
    ],
  },
  {
    title: "Embedded Software",
    repositories: [
      { owner: "Sukikui", name: "Vision-Hub" },
      { owner: "Sukikui", name: "ESP32-Vision-Node" },
      { owner: "Sukikui", name: "ESP32-CAM-Sign-Recognition" },
    ],
  },
  {
    title: "Web & Others",
    repositories: [
      { owner: "Sukikui", name: "PMC-Plan" },
      { owner: "Sukikui", name: "GPA-Calculator" },
      { owner: "Sukikui", name: "interactive-portfolio" },
    ],
  },
] satisfies readonly RepositoryGroup[];
