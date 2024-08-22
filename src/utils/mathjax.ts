interface MathJaxConfigOptions {
  showProcessingMessages?: boolean
  messageStyle?: string
  jax?: string[]
  tex2jax?: {
    inlineMath: [string[], string[]]
    displayMath: [string[], string[]]
    skipTags: string[]
  }
  'HTML-CSS'?: {
    availableFonts?: string[]
    showMathMenu?: boolean
  }
}

let isMathjaxConfig: boolean = false

export const initMathjaxConfig = (): void => {
  if (!window.MathJax) {
    return
  }
  window.MathJax.Hub.Config({
    showProcessingMessages: false,
    messageStyle: 'none',
    jax: ['input/TeX', 'output/HTML-CSS'],
    tex2jax: {
      inlineMath: [
        ['$', '$'],
        ['\\(', '\\)']
      ],
      displayMath: [
        ['$$', '$$'],
        ['\\[', '\\]']
      ],
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre']
    },
    'HTML-CSS': {
      availableFonts: ['STIX', 'TeX'],
      showMathMenu: false
    }
  })
  isMathjaxConfig = true
}

export const MathQueue = (elementId: string): void => {
  if (!window.MathJax) {
    return
  }
  window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, document.getElementById(elementId)])
}

export default {
  isMathjaxConfig,
  initMathjaxConfig,
  MathQueue
}
