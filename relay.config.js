module.exports = {
  src: "./src",
  schema: "./schema.graphql",
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
  language: "typescript",
  extensions: ["ts", "tsx"],
  artifactDirectory: "./src/__generated__",
  customScalars: {
    DateTime: "String",
  },
};
