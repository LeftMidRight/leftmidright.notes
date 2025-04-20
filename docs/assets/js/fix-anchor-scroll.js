document.addEventListener("DOMContentLoaded", () => {
    const scrollToAnchor = () => {
      if (location.hash) {
        const el = document.getElementById(location.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "auto" });
      }
    };
  
    if (window.MathJax && MathJax.startup) {
      // 等 DOM 就绪后先滚动，再 typeset
      scrollToAnchor();
      MathJax.startup.promise.then(() => {
        MathJax.typesetPromise(); // 手动渲染公式
      });
    } else {
      scrollToAnchor();
    }
  });
  