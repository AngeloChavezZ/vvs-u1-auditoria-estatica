# Checklist de inspección — `src/descuentos.js`

Lista de verificación usada durante la inspección estática (lectura del código y de los requisitos, **sin ejecutar pruebas funcionales**). Se aplicó sobre el código base original.

- **Resultado:** ✔ cumple · ✘ no cumple · N/A no aplica.
- **Fecha de aplicación:** 15 de noviembre de 2026.

## A. Requisitos y trazabilidad

| N.º | Pregunta | Resultado | Observación |
|-----|----------|-----------|-------------|
| 1 | ¿Cada requisito tiene un criterio de aceptación medible? | ✘ | R-01 a R-04 usan términos subjetivos («rápidamente», «especial», «correcto»). Ver `requisitos.md`. |
| 2 | ¿Cada regla del código se puede rastrear a un requisito? | ✘ | El `+ 10` de la línea 3 no aparece en ningún requisito (H-06). |
| 3 | ¿Están definidas las excepciones y los casos límite? | ✘ | «Excepto en promociones» no está acotado (S-04). |

## B. Lógica y validación de datos

| N.º | Pregunta | Resultado | Observación |
|-----|----------|-----------|-------------|
| 4 | ¿Se validan el tipo y el rango de los parámetros antes de calcular? | ✘ | No hay ninguna validación de `precio`, `porcentaje` ni `esVip` (H-07). |
| 5 | ¿Un valor inválido detiene el cálculo o devuelve un error? | ✘ | Con `porcentaje > 100` solo se imprime un mensaje y el cálculo continúa (H-05). |
| 6 | ¿El resultado puede ser negativo o superar los límites del negocio? | ✘ | Sí: el total puede ser negativo, en contra de R-03 (H-05, H-06). |
| 7 | ¿Las comparaciones usan igualdad estricta (`===`)? | ✘ | Línea 3: `esVip == true` (H-02). |
| 8 | ¿Se controla la precisión decimal de los importes? | ✘ | No hay redondeo a 2 decimales (H-09). |

## C. Legibilidad y mantenibilidad

| N.º | Pregunta | Resultado | Observación |
|-----|----------|-----------|-------------|
| 9 | ¿Las variables se declaran con `const`/`let` y no con `var`? | ✘ | Líneas 2 y 5 (H-01). |
| 10 | ¿Todas las estructuras de control usan llaves? | ✘ | Líneas 3 y 4 (H-03). |
| 11 | ¿Los valores literales tienen un nombre que explique su significado? | ✘ | El `10` de la línea 3 es un número mágico (H-06). |
| 12 | ¿El nombre de la función describe lo que devuelve? | ✘ | Se llama `calcularDescuento` pero devuelve el total a pagar (H-08). |
| 13 | ¿La función está documentada (parámetros, retorno, errores)? | ✘ | No tiene comentario JSDoc (H-08). |
| 14 | ¿La función evita efectos secundarios como escribir en consola? | ✘ | Línea 4: `console.log` dentro de una función de cálculo (H-04). |
| 15 | ¿Existen variables o parámetros declarados y no utilizados? | ✔ | No se encontraron; la regla `no-unused-vars` queda activa como prevención. |

**Resumen:** 14 de 15 preguntas no se cumplen en el código base. Cada incumplimiento está registrado en [`hallazgos.md`](hallazgos.md).
