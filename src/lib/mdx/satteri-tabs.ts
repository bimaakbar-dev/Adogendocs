import { defineMdastPlugin } from "satteri";

export const satteriTabs = defineMdastPlugin({
  name: "satteri-tabs",
  containerDirective(node, ctx) {
    if (node.name === "tabs") {
      ctx.setProperty(node, "data", {
        ...(node.data || {}),
        hName: "TabsContainer",
      });

      if (node.children) {
        node.children.forEach((child) => {
          if (child.type === "containerDirective" && child.name === "tab") {
            let tabLabel = "Tab";
            let contentChildren = child.children || [];

            if (contentChildren.length > 0 && contentChildren[0].type === "paragraph") {
              const firstPara = contentChildren[0] as any;
              if (firstPara.children && firstPara.children.length > 0) {
                tabLabel = firstPara.children[0].value || "Tab";
                contentChildren = contentChildren.slice(1);
              }
            }

            const existingData = child.data || {};
            const existingProps = (existingData as any).hProperties || {};

            ctx.setProperty(child, "data", {
              ...existingData,
              hName: "TabItem",
              hProperties: {
                ...existingProps,
                label: tabLabel,
              },
            });
            ctx.setProperty(child, "children", contentChildren);
          }
        });
      }
    }
  },
});
