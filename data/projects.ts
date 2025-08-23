import { StaticImageData } from "next/image";

import SummarizerImage from "@/public/images/projects/t5_summarizer.webp";
import CognizerImage from "@/public/images/projects/cognizer.webp";
import TravelAgencyImage from "@/public/images/projects/travel.webp";
import liveLocation from "@/public/images/projects/tracker.webp";
import FuzzyYtIcon from "@/public/images/projects/fuzzy-yt.webp";
import Portfolio from "@/public/images/projects/portfolio.webp";

export type ProjectType = {
  title: string;
  description: string;
  license: string;
  image: string | StaticImageData;
  year: string;
  technologies: string[];
  tags: string[];
  githubRepo?: string;
  demoLink?: string;
};

const ProjectsList: ProjectType[] = [
  {
    title: "Personal Portfolio",
    description:
      "This is my personal portfolio website. It is a website that showcases my projects, skills, and experience. It also allows users to contact me.",
    image: Portfolio,
    year: "2024",
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "TailwindCSS",
      "Shadcn/ui",
      "Framer Motion",
      "Sanity",
      "PostHog",
      "CloudFlare",
    ],
    tags: ["Web Development"],
    githubRepo: "https://github.com/MadushaS/portfolio-nextjs",
    demoLink: "https://madusha.dev/",
    license: "MIT",
  },
  {
    title: "Placeholder",
    description: "This is a placeholder project for future additions.",
    year: "2024",
    image: Portfolio,
    technologies: ["Coming Soon"],
    tags: ["Coming Soon"],
    license: "MIT",
  },
  {
    title: "Alzheimer's Disease Prediction",
    description: "EffientNet-b0 & Bio_CliniclBERT cross attention multi-modal ensemble model to predict Alzheimer's disease from MRI scans and clinical text data.",
    year: "2025",
    image: SummarizerImage,
    technologies: [
      "Python",
      "PyTorch",
      "EfficientNet",
      "Bio_CliniclBERT",
      "OASIS-3",
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
    ],
    tags: ["AI", "Machine Learning Multi-Modal Modal", "Deep Learning", "NLP", "Computer Vision"],
    githubRepo: "",
    license: "MIT",
  },
  {
    title: "Pearl Routes",
    description:
      "Hassle-free travel discovery for Sri Lanka. Discover destinations, plan trips, and explore the island with ease. Built with Next.js and hosted on Vercel.",
    image: TravelAgencyImage,
    year: "2025",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "Vercel",
      "Sentry",
      "PostHog",
      "Sanity",
    ],
    tags: ["Travel", "Web Development", "Sri Lanka"],
    demoLink: "https://pearlroutes.lk",
    license: "Proprietary",
  },
  {
    title: "AI Text Summarizer (Cogniezer)",
    description:
      "A suite for text and audio summarization. Includes a T5-based model fine-tuned for abstractive summarization and a FastAPI REST API (Cogniezer) for summarizing audio clips using Azure Text-to-Speech. Developed for academic and practical NLP tasks.",
    image: CognizerImage,
    year: "2023",
    technologies: [
      "T5-base",
      "TensorFlow",
      "PyTorch",
      "Python",
      "Hugging Face",
      "Kaggle",
      "FastAPI",
      "Azure Text-to-Speech",
      "Docker",
    ],
    tags: ["Text Summarization", "Speech to Text", "NLP", "AI", "REST API"],
    githubRepo: "https://github.com/InsiderCloud/Cogniezer-Backend",
    demoLink: "https://huggingface.co/madushakv/t5_xsum_samsum_billsum_cnn_dailymail",
    license: "MIT",
  },
  {
    title: "Live GPS Tracker",
    description:
      "This is a GPS tracker that allows users to track the location of their vehicles in real-time. It also allows users to view the route taken by the vehicle and the speed at which it is traveling.",
    image: liveLocation,
    year: "2023",
    technologies: ["React", "TailwidnCSS", "Supabase", "kinde Auth", "OpenMap"],
    tags: ["GeoLocation", "Database", "Web Development"],
    githubRepo: "https://github.com/MadushaS/vehicle-tracking",
    demoLink: "https://tracker.madusha.dev/",
    license: "MIT",
  },
];

export { ProjectsList };
