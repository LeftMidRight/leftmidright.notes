window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']]
    },
    options: {
      skipHtmlTags: ["noscript", "style", "textarea", "pre", "code"],
    },
    startup: {
      typeset: false // 禁用自动 typeset
    }
  };
  