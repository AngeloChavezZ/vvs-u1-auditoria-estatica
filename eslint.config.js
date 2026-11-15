"use strict";

const js = require("@eslint/js");
const globals = require("globals");

/**
 * Configuración de ESLint (formato "flat config").
 * La justificación de cada regla está en README.md, sección "Reglas de ESLint".
 */
module.exports = [
  { ignores: ["node_modules/", "evidencias/"] },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
    rules: {
      // Reglas exigidas por la actividad
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "no-unused-vars": "error",
      curly: ["error", "all"],
      // Reglas complementarias
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
];
