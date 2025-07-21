import type { StateCreator } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import type { GenerateRequest, GenerateResponse } from 'ollama';

const initializer: StateCreator<State, [], [["zustand/devtools", never]]> = devtools((set, get) => ({
  foo: 'bar',

  api: {

    initiateBrowser() {
      return () => {};
    },

    async testQuery() {
      const payload: GenerateRequest = {
        model: 'gemma3',
        prompt: 'Why is the sky blue?',
        stream: false,
      };
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return await response.json();
    },

  },
}), {
  name: 'ollama',
  anonymousActionType: 'anon-ollama-act',
});

const useStore = createWithEqualityFn<State>()(initializer);

export type State = {
  foo: string;

  api: {
    initiateBrowser(): () => void;
    testQuery(): Promise<GenerateResponse>;
  };
};

const useOllama = Object.assign(useStore, { api: useStore.getState().api });
export default useOllama;
