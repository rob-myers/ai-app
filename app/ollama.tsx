"use client"

import React from 'react';
import useOllama from './ollama.store';
import { useQuery } from '@tanstack/react-query';

export default function Ollama() {

  const { data, status } = useQuery({
    queryKey: ['ollama-test'],
    queryFn: () => useOllama.api.testQuery(),
  });

  return (
    <div>
      <h2>Ollama {`(${status})`}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}