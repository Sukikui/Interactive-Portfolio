import type { RepositoryGroup, RepositoryReference } from "./types";

export const projectRepositories = {
  ptiLdmVae: { owner: "Sukikui", name: "PTI-LDM-VAE" },
  genesis: { owner: "creatis-myriad", name: "GENESIS" },
  nervousSensors: { owner: "sensors-inl", name: "Nervous-Sensors" },
  nervousAnalytics: { owner: "sensors-inl", name: "Nervous-Analytics" },
  mineVerify: { owner: "Sukikui", name: "MineVerify" },
  biomeMap: { owner: "Sukikui", name: "BiomeMap" },
  playerCoordsApi: { owner: "Sukikui", name: "PlayerCoordsAPI" },
  visionHub: { owner: "Sukikui", name: "Vision-Hub" },
  esp32VisionNode: { owner: "Sukikui", name: "ESP32-Vision-Node" },
  esp32CamSignRecognition: {
    owner: "Sukikui",
    name: "ESP32-CAM-Sign-Recognition",
  },
  pmcPlan: { owner: "Sukikui", name: "PMC-Plan" },
  gpaCalculator: { owner: "Sukikui", name: "GPA-Calculator" },
  interactivePortfolio: { owner: "Sukikui", name: "Interactive-Portfolio" },
} satisfies Record<string, RepositoryReference>;

export const projectGroups = [
  {
    title: "Featured above",
    repositories: [
      projectRepositories.ptiLdmVae,
      projectRepositories.genesis,
      projectRepositories.nervousSensors,
      projectRepositories.nervousAnalytics,
    ],
  },
  {
    title: "Minecraft",
    repositories: [
      projectRepositories.mineVerify,
      projectRepositories.biomeMap,
      projectRepositories.playerCoordsApi,
    ],
  },
  {
    title: "Embedded Software",
    repositories: [
      projectRepositories.visionHub,
      projectRepositories.esp32VisionNode,
      projectRepositories.esp32CamSignRecognition,
    ],
  },
  {
    title: "Web & Others",
    repositories: [
      projectRepositories.pmcPlan,
      projectRepositories.gpaCalculator,
      projectRepositories.interactivePortfolio,
    ],
  },
] satisfies readonly RepositoryGroup[];
