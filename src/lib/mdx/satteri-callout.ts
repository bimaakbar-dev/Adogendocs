import { defineMdastPlugin } from "satteri";

const VALID_TYPES = new Set([
  "note",
  "info",
  "tip",
  "warning",
  "danger",
  "important",
  "caution",
]);

function createCallout(type: string, children: any[]) {
  return {
    type: "mdxJsxFlowElement",
    name: "Callout",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "type",
        value: type,
      },
    ],
    children,
  };
}

export const satteriCallout = defineMdastPlugin({
  name: "satteri-callout",

  containerDirective(node, ctx) {
    const type = node.name.toLowerCase();

    if (!VALID_TYPES.has(type)) return;

    ctx.replaceNode(
      node,
      createCallout(type, node.children),
    );
  },

  blockquote(node, ctx) {
    const firstChild = node.children[0];

    if (!firstChild || firstChild.type !== "paragraph") {
      return;
    }

    const firstText = firstChild.children[0];

    if (
      !firstText ||
      firstText.type !== "text"
    ) {
      return;
    }

    const match = firstText.value.match(
      /^\[!(NOTE|INFO|TIP|WARNING|DANGER|IMPORTANT|CAUTION)\]\s*/i
    );

    if (!match) return;

    const type = match[1].toLowerCase();

    firstText.value = firstText.value.slice(match[0].length);
    if (
      firstChild.children.length === 1 &&
      firstText.value.trim() === ""
    ) {
      node.children.shift();
    }

    ctx.replaceNode(
      node,
      createCallout(type, node.children),
    );
  },
});