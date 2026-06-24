import type { SplitSection } from "./types";

export const overviewSection = {
  type: "split",
  columns: [
    {
      id: "presentation",
      navLabel: "Presentation",
      index: "01",
      title: "Presentation",
      icon: "user",
      contentType: "prose",
      paragraphs: [
        "Engineer graduated recently, I am passionate about ML and Computer Vision, I am looking to work on state-of-the-art AI models driving concrete applications in the real world.",
        "Having always wanted to understand intelligent systems, I began and pursued my studies for 5 years in the field of Electrical Engineering. I quickly became passionate about and self-taught in Computer Vision, which allowed me to start a drone project embedding a real-time AI model on my personal time, and which I then continued as part of my curriculum at INSA Lyon.",
        "Eager to discover varied architectures and applications of Machine Learning in demanding environments, with the opportunity to contribute to publications, I decided to multiply my experiences in laboratories, notably in the medical and biomedical fields. This allowed me to learn to understand, adapt and implement quickly and rigorously recent models from specialized AI conferences and journals.",
        "In parallel, I code a lot in my free time: embedded software in C/C++, Python tools, Java projects around Minecraft including network communications, APIs and server tools. I also enjoy doing some web development from time to time, as you can see with this very website. I invite you to consult my GitHub, which reflects my attachment to clean, documented projects integrating good CI/CD practices.",
      ],
    },
    {
      id: "research",
      navLabel: "Interests",
      index: "02",
      title: "Interests",
      icon: "research",
      contentType: "bullets",
      items: [
        {
          title: "Computer Vision",
          description: "detection, segmentation, tracking and 3D understanding.",
        },
        {
          title: "Medical & biomedical imaging",
          description: "adapting state-of-the-art models to clinical data and constraints.",
        },
        {
          title: "Real-time & embedded AI",
          description: "efficient inference on edge devices, drones and robotics.",
        },
        {
          title: "Foundation & multimodal models",
          description:
            "leveraging large pretrained vision and vision-language models for downstream tasks.",
        },
        {
          title: "Reliable ML engineering",
          description: "reproducible pipelines, rigorous evaluation and clean MLOps practices.",
        },
      ],
    },
  ],
} satisfies SplitSection;
