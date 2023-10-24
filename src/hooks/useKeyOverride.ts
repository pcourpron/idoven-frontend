import { useEffect } from "react";

export function useKeyOverride(key: string, callback: (key: string) => void) {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === key) {
        // Call the provided callback function
        callback(event.key);
      }
    }

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [callback, key]);
}
