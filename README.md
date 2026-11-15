# Auditoría estática de un módulo de descuentos

Actividad de la **Unidad 1 — Evaluación estática** de la asignatura Verificación y Validación de Software (Ingeniería de Software, Universidad Politécnica Salesiana).

Se audita el módulo `src/descuentos.js` de una tienda digital **antes de ejecutarlo**: se revisan los requisitos ambiguos, se inspecciona el código con una checklist y con ESLint, se registran los defectos y se documentan las decisiones preventivas.

- **Autor:** Angelo Chávez
- **Modalidad:** trabajo individual (ver `docs/acta-revision.md`)

## Estructura

```
.
├── src/
│   └── descuentos.js          Módulo inspeccionado
├── docs/
│   ├── requisitos.md          R-01..R-04 → RF-01..RF-04 y supuestos pendientes
│   ├── checklist.md           15 preguntas de inspección
│   ├── matriz.md              Problema, impacto, propuesta, artefacto y estado
│   ├── hallazgos.md           Registro de hallazgos (ESLint y revisión humana)
│   └── acta-revision.md       Acta de la inspección por roles
├── evidencias/
│   ├── lint-inicial.txt       Salida de ESLint sobre el código base
│   └── lint-final.txt         Salida de ESLint tras las correcciones
├── eslint.config.js           Reglas de ESLint
├── package.json
├── .gitignore
└── README.md
```

## Cómo reproducir el análisis

Requisitos: Node.js 20.19 o superior y npm. Probado con Node.js 22 y ESLint 10.15.

```bash
git clone https://github.com/AngeloChavezZ/vvs-u1-auditoria-estatica.git
cd vvs-u1-auditoria-estatica
npm install
npm run lint
```

En Visual Studio Code, con la extensión **ESLint** (`dbaeumer.vscode-eslint`) instalada, los mismos avisos aparecen subrayados en el editor y en el panel *Problemas*.

Para regenerar las evidencias:

```bash
# Análisis inicial: sobre el código base (commit etiquetado con «chore(lint)»)
npx eslint . > evidencias/lint-inicial.txt

# Análisis final: sobre la rama principal ya corregida
npx eslint . > evidencias/lint-final.txt
```

> Las evidencias guardadas incluyen la cabecera de `npm run lint` y muestran las rutas relativas a la raíz del proyecto para que sean legibles en cualquier equipo.

## Reglas de ESLint y su justificación

La configuración parte de `eslint:recommended` (`@eslint/js`) y añade:

| Regla | Nivel | Justificación |
|-------|-------|---------------|
| `no-var` | error | `var` tiene alcance de función y sufre *hoisting*, lo que permite usar una variable antes de asignarla o redeclararla sin aviso. `let` y `const` limitan el alcance al bloque. |
| `eqeqeq` | error | `==` convierte tipos antes de comparar (`1 == true` y `"1" == true` son verdaderos). En una regla de dinero como el descuento VIP, la comparación debe ser estricta (`===`). |
| `no-unused-vars` | error | Una variable o parámetro sin uso suele indicar lógica incompleta o código muerto. No se activó en el código base, pero se mantiene como control preventivo. |
| `curly` | error | Un `if` sin llaves induce a errores al añadir una segunda instrucción, que quedaría fuera de la condición sin que nadie lo note. |
| `prefer-const` | error | Complementa a `no-var`: lo que no se reasigna se declara con `const`, y así se ve qué valores cambian. |
| `no-console` | advertencia | Una función de cálculo no debería escribir en consola. Se deja como advertencia porque su corrección depende de una decisión de negocio (hallazgo H-04). |

## Resultados

| Momento | Errores | Advertencias | Evidencia |
|---------|---------|--------------|-----------|
| Análisis inicial | 5 | 1 | `evidencias/lint-inicial.txt` |
| Análisis final | 0 | 1 | `evidencias/lint-final.txt` |

La advertencia restante (`no-console`) se mantiene abierta a propósito: ver hallazgos H-04 y H-05.

En total se registraron **9 hallazgos**: 4 detectados por ESLint (3 cerrados) y 5 por la revisión humana (abiertos, a la espera de decisiones de negocio).

## Alcance de las correcciones

Solo se corrigen los defectos confirmados por una regla de ESLint. Los defectos de lógica de negocio detectados por la revisión humana se registran en `docs/hallazgos.md` y quedan abiertos hasta que el negocio confirme los supuestos de `docs/requisitos.md`.

## Referencias

- Ayewah, N., Hovemeyer, D., Morgenthaler, J. D., Penix, J. y Pugh, W. (2008). Using static analysis to find bugs. *IEEE Software, 25*(5), 22-29.
- Fagan, M. E. (1976). Design and code inspections to reduce errors in program development. *IBM Systems Journal, 15*(3), 182-211.
- ISTQB (2024). *Certified Tester Foundation Level Syllabus* (v4.0.1).
- OpenJS Foundation (2026). *ESLint: Rules reference*. https://eslint.org/docs/latest/rules/
