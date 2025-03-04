import { useEffect } from "react";

const useModifySentryFeedback = () => {
  useEffect(() => {
    const modifySentryButton = () => {
      const sentryFeedback = document.querySelector("#sentry-feedback") as HTMLElement;
      if (sentryFeedback && sentryFeedback.shadowRoot) {
        const shadowRoot = sentryFeedback.shadowRoot;
        const style = document.createElement("style");

        style.textContent = `
          :host {
            position: fixed !important;
            left: 20px !important;
            bottom: 70px !important;
            right: auto !important;
            z-index: 9999 !important;
          }
        `;

        shadowRoot.appendChild(style);
      }
    };

    // Delay to ensure the element is available in the DOM
    setTimeout(modifySentryButton, 1000);
  }, []);
};

export default useModifySentryFeedback;
