import type { TimelineItemContent } from "./types";

export const educationItems = [
  {
    anchorId: "education-msc-ml-medical-imaging",
    period: "Feb 2025 — Mar 2026",
    subtitle: "Centrale Lyon · Université Lyon 1",
    location: "Lyon, France",
    title: "MSc in Machine Learning and Medical Imaging",
    alternateTitle: "Master 2",
    highlights: [
      "Completed alongside my final year at INSA Lyon",
      "Ranked 2nd in cohort — GPA 3.90 / 4.00",
    ],
    courses: [
      "Machine Learning",
      "Inverse Problems",
      "Image Segmentation",
      "Filtering and Registration",
      "Magnetic Resonance Imaging",
      "Bibliography",
    ],
  },
  {
    anchorId: "education-insa-lyon",
    period: "Sep 2022 — Mar 2026",
    subtitle: "INSA Lyon",
    location: "Lyon, France",
    title: "MSc in Electrical Engineering",
    alternateTitle: "Diplôme d'Ingénieur",
    highlights: [
      "Major in Deep Learning, Image & Signal Processing — GPA 4.00 / 4.00",
      "Ranked in the top 10% of cohort — overall GPA 3.76 / 4.00",
    ],
    courses: [
      "Image Processing and Analysis",
      "Image Deep Learning",
      "Image Reconstruction",
      "Estimation, Learning and Decision",
      "Operations Research and Optimization",
      "Signal Analysis and Modeling",
      "Digital Processors: CPU and GPU",
      "2D/3D Optical Acquisition",
      "Real-Time Computer Engineering",
      "Advanced Control",
    ],
  },
  {
    anchorId: "education-tohoku-university",
    period: "Sep 2024 — Dec 2024",
    subtitle: "Tōhoku University",
    location: "Sendai, Japan",
    title: "Exchange Semester",
    highlights: [
      "Completed the Intensive Japanese Language Program",
      "Mentored bachelor students on Computer Vision projects",
    ],
  },
  {
    anchorId: "education-iut-nancy-brabois",
    period: "Sep 2020 — Jul 2022",
    subtitle: "IUT Nancy-Brabois, Université de Lorraine",
    location: "Nancy, France",
    title: "University Diploma of Technology in Electrical Engineering",
    alternateTitle: "Diplôme Universitaire de Technologie",
    highlights: [
      "Major in Multitasking & Object-Oriented Programming — GPA 4.00 / 4.00",
      "Ranked 1st in cohort, with Highest Honors — overall GPA 3.89 / 4.00",
    ],
  },
] satisfies readonly TimelineItemContent[];
