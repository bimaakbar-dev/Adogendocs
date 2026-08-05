// src/lib/mdx/satteri-callout.ts

import { defineMdastPlugin } from "satteri";

const CALLOUT_TYPES = {
  NOTE: "note",
  TIP: "tip",
  IMPORTANT: "important",
  WARNING: "warning",
  CAUTION: "caution",
} as const;

type CalloutType = keyof typeof CALLOUT_TYPES;

const CALLOUT_PATTERN =
  /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/i;

export const satteriCallout = defineMdastPlugin({
  name: "satteri-callout",

  blockquote(node, ctx) {
    const firstChild = node.children[0];

    if (!firstChild || firstChild.type !== "paragraph") {
      return;
    }

    const marker = ctx.textContent(firstChild).trim();
    const match = marker.match(CALLOUT_PATTERN);

    if (!match) {
      return;
    }

    const rawType = match[1].toUpperCase() as CalloutType;
    const type = CALLOUT_TYPES[rawType];

    ctx.removeChildAt(node, 0);

    if (node.children.length === 0) {
      return;
    }

    return {
      type: "callout",
      data: {
        hName: "blockquote",
        hProperties: {
          "data-callout": type,
          "aria-label": rawType,
        },
      },
      children: node.children,
    };
  },
});