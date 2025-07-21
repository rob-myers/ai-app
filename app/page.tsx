"use client";

import Image from "next/image";
import styles from './page.module.css';
import Ollama from './ollama';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <Ollama />
      </div>
    </QueryClientProvider>
  );
}
