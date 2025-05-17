import "./globals.css";

import type { Metadata } from "next";

import type { PropsWithChildren } from "@/core/types/common";
import { RootLayout } from "@/modules/root-layout";

export const metadata: Metadata = {
  title: "Waleed",
  description:
    "Full Stack Developer specializing in modern web technologies. Building scalable applications with React, Node.js, and cloud technologies.",
  keywords: [
    "Full Stack Developer",
    "Web Development",
    "React",
    "Node.js",
    "Next.js",
    "Tailwind CSS",
    "Shadcn UI",
    "JavaScript",
    "TypeScript",
    "Golang",
    "Next.js",
    "RAG",
    "AI",
    "LLM",
    "AI Agent",
    "AI Agentic",
    "AI Agentic Development",
    "AI Agentic Development",
    "Portfolio",
  ],
  authors: [{ name: "Waleed" }],
  openGraph: {
    title: "Waleed | Full Stack Developer",
    description:
      "Full Stack Developer specializing in modern web technologies. Building scalable applications with React, Node.js, and cloud technologies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waleed | Full Stack Developer",
    description:
      "Full Stack Developer specializing in modern web technologies. Building scalable applications with React, Node.js, and cloud technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return <RootLayout>{children}</RootLayout>;
}
