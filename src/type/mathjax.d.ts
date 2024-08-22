// mathjax.d.ts

declare global {
  interface Window {
    MathJax?: {
      Hub: {
        Config(config: MathJaxConfigOptions): void
        Queue(tasks: any[]): void
      }
    }
  }
}

export declare function initMathjaxConfig(): void
export declare function MathQueue(elementId: string): void

export declare const isMathjaxConfig: boolean

export default {
  isMathjaxConfig,
  initMathjaxConfig,
  MathQueue
}
