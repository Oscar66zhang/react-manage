import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-console': 'off', // 禁止使用console
      'no-unused-vars': 'error', // 禁止定义未使用的变量
      'no-debugger': 'error', // 禁止使用debugger
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      "@typescript-eslint/no-explicit-any": "off"
    },
  },
]);
