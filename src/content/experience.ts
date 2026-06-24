import bovoPredictReport from "@/assets/documents/report_bovopredict.pdf";
import creatisPoster from "@/assets/documents/creatis-poster.pdf";

import type { TimelineItemContent } from "./types";

export const experienceItems = [
  {
    period: "Oct 2025 — Jan 2026",
    duration: "4 months",
    kind: "Research Project",
    title: "Generative Deep Learning for Dental Prediction",
    subtitle: "Bovo Predict",
    location: "Lyon, France",
    supervisor: "Supervised by Dr. Thomas Grenier and Dr. Chantal Muller",
    highlights: [
      "Built a VAE + Latent Diffusion pipeline for dentate-to-edentulous CBCT slice generation",
      "Used self-supervised latent learning and diffusion denoising to guide anatomical reconstruction",
      "Designed Transformer-based multimodal conditioning for morphology metrics injection",
      "Developed t-SNE / UMAP latent space analysis and morphology-based evaluation tools",
    ],
    publications: [
      {
        venue:
          "Edentulous Image Prediction using Latent Diffusion Model and Variational Autoencoder",
        type: "Academic Report",
        url: bovoPredictReport,
      },
    ],
    repositories: [{ url: "https://github.com/Sukikui/PTI-LDM-VAE" }],
  },
  {
    period: "Feb 2025 — Jul 2025",
    duration: "6 months",
    kind: "Research Intern",
    title: "Graph ML & 3D Medical Image Analysis",
    subtitle: "CREATIS",
    location: "Lyon, France",
    supervisor:
      "Supervised by Dr. Odyssée Merveille, Dr. Nathan Painchaud and Prof. Olivier Bernard",
    highlights: [
      "Researched and trained GNN architectures for pulmonary embolism risk stratification",
      "Built PyTorch Geometric vascular graph datasets from segmentation-derived 3D anatomy",
      "Trained and compared nnU-Net 3D segmentation models for cardiac ventricle analysis",
      "Collaborated with clinicians on model validation and outlier case analysis",
    ],
    publications: [
      { venue: "MICCAI", year: "2026", type: "Conference", status: "submission" },
      {
        venue: "LABEX PRIMES",
        year: "2025",
        type: "Poster",
        url: creatisPoster,
      },
      {
        venue: "Introduction to Graph Neural Networks",
        year: "",
        type: "Blog Post",
        url: "https://creatis-myriad.github.io/tutorials/2025-03-28-tutorial-graph-neural-networks.html",
      },
    ],
    repositories: [{ url: "https://github.com/creatis-myriad/GENESIS" }],
  },
  {
    period: "Feb 2024 — Jul 2024",
    duration: "6 months",
    kind: "Research Intern",
    title: "Real-Time Deep Learning for Noisy Time-Series",
    subtitle: "Institut des Nanotechnologies de Lyon",
    location: "Lyon, France",
    supervisor: "Supervised by Dr. Bertrand Massot",
    highlights: [
      "Researched robust real-time ECG / EDA peak detection methods for physiological VR monitoring",
      "Implemented ECG localization pipelines combining U-Net, LSTM and wavelet-based models",
      "Developed modular Python packages for BLE sensor acquisition and signal analytics",
    ],
    publications: [
      {
        venue: "IEEE VRW",
        year: "2025",
        type: "Workshop",
        url: "https://ieeexplore.ieee.org/document/10972783",
      },
    ],
    repositories: [
      { url: "https://github.com/sensors-inl/Nervous-Sensors" },
      { url: "https://github.com/sensors-inl/Nervous-Analytics" },
    ],
  },
  {
    period: "Oct 2023 — Jan 2024",
    duration: "4 months",
    kind: "Technical Project",
    title: "Embedded Computer Vision for Autonomous Drone Control",
    subtitle: "INSA Lyon",
    location: "Lyon, France",
    supervisor: "Supervised by Dr. Jean-François Mogniotte",
    highlights: [
      "Designed a dual-ESP32 drone architecture with onboard CNN gesture recognition",
      "Developed real-time C / C++ firmware for sensor acquisition and SPI / I2C communication",
      "Implemented Kalman filtering for altitude estimation using ToF, barometer and IMU sensors",
      "Designed a custom drone PCB and monitoring dashboard for hardware debugging",
    ],
  },
  {
    period: "Apr 2022 — Jul 2022",
    duration: "4 months",
    kind: "R&D Intern",
    title: "Embedded Systems",
    subtitle: "Institut Jean Lamour",
    location: "Nancy, France",
    highlights: [
      "Developed STM32 serial communication modules in C / C++",
      "Controlled an acoustic levitation device with configurable PWM",
      "Built a Python API for device monitoring and wrote the documentation",
    ],
  },
  {
    period: "Sep 2021 — Apr 2022",
    duration: "8 months",
    kind: "Academic Tutor",
    title: "Mathematics & Applied Physics",
    subtitle: "Université de Lorraine",
    location: "Nancy, France",
    highlights: [
      "Teaching and support for first-year students",
      "Courses: complex analysis, electrostatics and electromagnetism",
    ],
  },
] satisfies readonly TimelineItemContent[];
