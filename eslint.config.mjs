import nextCoreWebVitals from "eslint-config-next/core-web-vitals"

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    // Global rules for all files
    rules: {
      "react/no-unescaped-entities": 0,
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "function-expression",
        },
      ],
    },
  },
  {
    // Specific overrides for UI components
    files: ["src/components/ui/**/*", "src/components/magicui/**/*"],
    rules: {
      // Disable only this rule for these files
      "react/function-component-definition": 0,
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
]

export default eslintConfig
