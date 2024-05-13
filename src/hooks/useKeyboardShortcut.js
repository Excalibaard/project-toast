import React from "react";

// TODO: check for modifiers, handle focus/state
function useKeyboardShortcut(callback, key) {
  React.useEffect(() => {
    try {
      if (!callback) {
        throw new Error("No callback provided!");
      }
      if (typeof callback !== "function") {
        throw new TypeError("Callback parameter should be a function!");
      }
      if (!key) {
        throw new Error("No key provided!");
      }

      function handleKeyDown(event) {
        if (event.key === key) {
          callback();
        }
      }

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } catch (err) {
      console.error(err);
    }
  }, [key, callback]);
}

export default useKeyboardShortcut;
