import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig( [
  {
    ignores: [
      "node_modules/**",
      "out/**",
      "build/**",
      "package-lock.json",
      "package.json",
      "tsconfig.json"
    ],
  },
  {
    files: [
      "src/*.{js,mjs,cjs,ts,mts,cts}",
      "src/**/*.{js,mjs,cjs,ts,mts,cts}"
    ],
    plugins: { js, import: importPlugin },
    extends: [ "js/recommended" ],
    languageOptions: { globals: globals.node },
    rules: {
      "max-params": [ "error", 4 ],
      "max-depth": [ "error", 4 ],
      "complexity": [ "error", 4 ],
      "max-lines": [ "error", 400 ],
      "max-statements": [ "error", 20 ],
      "max-lines-per-function": [ "error", 200 ],
      "no-duplicate-imports": [ "error", { "includeExports": true } ],
      "no-trailing-spaces": "error",
      "no-console": "error",
      "eqeqeq": "error",
      "curly": "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": "error",
      "quotes": [ "error", "double" ],
      "indent": [ "error", "tab" ],
      "semi": [ "error", "never" ],
      "no-extra-semi": "error",
      "object-curly-spacing": [ "error", "always" ],
      "space-in-parens": [ "error", "always" ],
      "import/newline-after-import": [ "error", { "count": 1 } ]
    },
  },
  tseslint.configs.recommended,
  {
    files: [ "**/*.json", "src/**/*.json" ],
    plugins: { json },
    language: "json/json",
    extends: [ "json/recommended" ],
  },
  {
    files: [ "**/*.json5", "src/**/*.json5" ],
    plugins: { json },
    language: "json/json5",
    extends: [ "json/recommended" ],
  },
] );