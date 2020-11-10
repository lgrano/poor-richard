import { focus, blur } from "../utils/active-element.js";
import { sendGAEvent, buildEvent } from "../utils/google-analytics.js";

export default function searchModal() {
  const transitionLength = 500;

  return {
    isOpen: false,

    get modalClass() {
      return { "is-active": this.isOpen };
    },

    open() {
      this.isOpen = true;

      document.body.parentElement.classList.add("is-clipped");
      window.setTimeout(
        () => focus(this.$el.querySelector("input")),
        transitionLength
      );
    },

    close(sendEvent = true) {
      this.isOpen = false;
      document.body.parentElement.classList.remove("is-clipped");
      window.setTimeout(
        () => blur(this.$el.querySelector("input")),
        transitionLength
      );

      if (sendEvent) {
        let gaEvent = buildEvent(this.$el);
        gaEvent.eventAction = "modal:search:dismiss";
        sendGAEvent(gaEvent);
      }
    },
  };
}
