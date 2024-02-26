// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Help = defineDocumentType(() => ({
  name: "Help",
  filePathPattern: `support/help/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    updatedAt: {
      type: "date",
      required: true
    },
    summary: {
      type: "string",
      required: true
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/support\/help\/?/, "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Help]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-274HU75V.mjs.map
