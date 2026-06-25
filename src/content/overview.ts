import type { SplitSection } from "./types";

export const overviewSection = {
  type: "split",
  columns: [
    {
      id: "presentation",
      navLabel: "Presentation",
      index: "02",
      title: "Presentation",
      icon: "user",
      contentType: "prose",
      paragraphs: [
        "Engineer graduated recently, I am passionate about ML and Computer Vision, I am looking to work on state-of-the-art AI models driving concrete applications in the real world.",
        "Having always wanted to understand intelligent systems, I began and pursued my studies for 5 years in the field of Electrical Engineering. I quickly became passionate about and self-taught in Computer Vision, which allowed me to start a drone project embedding a real-time AI model on my personal time, and which I then continued as part of my curriculum at INSA Lyon.",
        "Eager to discover varied architectures and applications of Machine Learning in demanding environments, with the opportunity to contribute to publications, I decided to multiply my experiences in laboratories, notably in the medical and biomedical fields. This allowed me to learn to understand, adapt and implement quickly and rigorously recent models from specialized AI conferences and journals.",
        "In parallel, I code a lot in my free time: embedded software in C/C++, Python tools, Java projects around Minecraft including network communications, APIs and server tools. I also enjoy doing some web development from time to time, as you can see with this very website. I invite you to consult my projects below, which reflects my attachment to clean, documented projects integrating good CI/CD practices.",
      ],
    },
    {
      id: "research",
      navLabel: "Interests",
      index: "03",
      title: "Interests",
      icon: "research",
      contentType: "bullets",
      items: [
        {
          title: "What kind of ML do I want to work on?",
          description:
            "Vision models based on self-supervised, multimodal and latent representation learning, especially when these representations can support both image reconstruction and downstream perception tasks such as segmentation or tracking.",
        },
        {
          title: "Which applications motivate me most?",
          description:
            "Medical imaging, satellite imagery and embedded perception for autonomous systems such as drones. I am especially interested in cases where visual data is 3D, noisy or incomplete, and where models must operate under real-time, compute, hardware or acquisition constraints.",
        },
        {
          title: "Beyond ML, what do I enjoy building?",
          description:
            "Because I have spent years building side projects and open-source codebases, I genuinely enjoy turning technical ideas into clean, maintainable software, by implementing CI/CD, documentation and automation. I am also interested in OSINT-oriented work when it involves connecting scattered information and turning it into reliable tools.",
        },
      ],
    },
  ],
} satisfies SplitSection;
