import type { SkillGroup } from "./types";

export const skillGroups = [
  {
    title: "AI/ML",
    skills: [
      "PyTorch",
      "PyTorch Lightning",
      "PyTorch Geometric",
      "TensorFlow / Keras",
      "scikit-learn",
      "MONAI",
      "nnU-Net",
      "OpenCV",
      "Ultralytics",
      "Hydra",
      "Weights & Biases",
    ],
  },
  {
    title: "Languages",
    skills: ["Python", "MATLAB", "C", "C++", "VHDL", "Java", "C#", "SQL", "Bash"],
  },
  {
    title: "Python Ecosystem",
    skills: [
      "NumPy",
      "pandas",
      "Jupyter",
      "Plotly",
      "uv",
      "Poetry",
      "conda",
      "pytest",
      "Ruff",
      "pre-commit",
    ],
  },
  {
    title: "Embedded Systems",
    skills: ["STM32 HAL", "ESP-IDF", "Raspberry Pi OS", "RTOS", "PlatformIO", "TensorFlow Lite"],
  },
  {
    title: "Software & Tools",
    skills: ["Linux", "Docker", "CUDA", "Slurm", "Git", "GitHub Actions", "GitLab CI"],
  },
] satisfies readonly SkillGroup[];
