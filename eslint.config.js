import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["dist/**", "node_modules/**"]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  }
];