import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

const compat = new FlatCompat( {
  baseDirectory: __dirname,
} );

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "next.config.ts",
    ],
  },
  ...compat.extends( "next/core-web-vitals", "next/typescript" ),
  {
    files: [
      "app/**/*.{js,jsx,ts,tsx}",
      "i18n/**/*.{js,jsx,ts,tsx}",
      "utils/**/*.{js,jsx,ts,tsx}"
    ],
    rules: {
      "max-params": [ "error", 8 ],
      "max-depth": [ "error", 8 ],
      "complexity": [ "error", 8 ],
      "max-lines": [ "error", 400 ],
      "max-statements": [ "error", 20 ],
      "max-lines-per-function": [ "error", 80 ],
      "no-unused-vars": "error",
      "eqeqeq": "error",
      "curly": "error",
      "no-console": "error",
      "semi": [ "error", "always" ],
      "quotes": [ "error", "double" ],
      "no-duplicate-imports": [ "error", { "includeExports": true } ],
      "indent": [ "error", "tab" ],
      "object-curly-spacing": [ "error", "always" ],
    },
  },
];

export default eslintConfig;
