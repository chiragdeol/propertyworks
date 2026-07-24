import React, { Fragment } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDynamicText(text: string, goldColor = "#D4A13A"): React.ReactNode {
  if (!text) return "";
  
  // Split by [gold]...[/gold] tags (using [\s\S] to support newlines within tags)
  const parts = text.split(/(\[gold\][\s\S]*?\[\/gold\])/gi);
  
  return parts.map((part, index) => {
    if (part.toLowerCase().startsWith("[gold]") && part.toLowerCase().endsWith("[/gold]")) {
      const innerText = part.substring(6, part.length - 7);
      return React.createElement(
        "span",
        { key: index, className: "text-gold", style: { color: goldColor } },
        innerText.split("\n").map((line, lIdx) => (
          React.createElement(
            Fragment,
            { key: lIdx },
            line,
            lIdx < innerText.split("\n").length - 1 && React.createElement("br")
          )
        ))
      );
    }
    
    return React.createElement(
      Fragment,
      { key: index },
      part.split("\n").map((line, lIdx) => (
        React.createElement(
          Fragment,
          { key: lIdx },
          line,
          lIdx < part.split("\n").length - 1 && React.createElement("br")
        )
      ))
    );
  });
}
