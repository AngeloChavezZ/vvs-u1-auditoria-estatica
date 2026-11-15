# Registro de hallazgos — inspección de `src/descuentos.js`

- **Objeto inspeccionado:** código base de `src/descuentos.js` (8 líneas), primer commit del repositorio.
- **Técnicas:** análisis estático automático (ESLint 10.15) e inspección humana con `checklist.md`. No se ejecutaron pruebas funcionales; los ejemplos numéricos se obtuvieron por lectura del código (prueba de escritorio).
- **Severidad:** **Crítica** (pérdida económica o incumplimiento directo de un requisito) · **Mayor** (resultado incorrecto en casos previsibles) · **Menor** (mantenibilidad o legibilidad).
- **Los números de línea** se refieren al código base original.

## Hallazgos del análisis estático (ESLint)

| ID | Línea | Regla | Descripción | Severidad | Evidencia | Acción | Estado |
|----|-------|-------|-------------|-----------|-----------|--------|--------|
| H-01 | 2 y 5 | `no-var` | `descuento` y `total` se declaran con `var`, con alcance de función y *hoisting*. | Menor | `lint-inicial.txt`: 2:1 y 5:1 | Sustituir por `let` (se reasigna) y `const` (no se reasigna). | Cerrado |
| H-02 | 3 | `eqeqeq` | `esVip == true` compara con conversión de tipos: valores como `1` o `"1"` se tratarían como VIP y recibirían el bono. | Mayor | `lint-inicial.txt`: 3:11 | Usar `===`. Efecto documentado: solo el booleano `true` activa el bono (RF-02). | Cerrado |
| H-03 | 3 y 4 | `curly` | Dos `if` de una sola línea sin llaves; añadir una instrucción la dejaría fuera de la condición. | Menor | `lint-inicial.txt`: 3:20 y 4:23 | Añadir llaves a ambos bloques. | Cerrado |
| H-04 | 4 | `no-console` | La función de cálculo escribe en consola; quien la llama no recibe ninguna señal del error. | Menor | `lint-inicial.txt`: 4:23 · `lint-final.txt`: 7:5 | Sustituir por un `RangeError` cuando se confirme S-04. | Abierto (depende de H-05) |

## Hallazgos de la revisión humana

| ID | Línea | Pregunta de la checklist | Descripción | Severidad | Evidencia | Acción | Estado |
|----|-------|--------------------------|-------------|-----------|-----------|--------|--------|
| H-05 | 4 | 5 y 6 | Si `porcentaje > 100` solo se imprime un mensaje y el cálculo continúa. Con `precio = 100` y `porcentaje = 120` el total sería **−20**, en contra de R-03. | Crítica | Lectura del código: no hay `return` ni `throw` tras la validación. | Implementar RF-03 (rango [0, 100] y `RangeError`). | Abierto, pendiente de S-04 |
| H-06 | 3 | 2 y 11 | El bono VIP es un `10` literal (número mágico) sumado como monto fijo, sin respaldo en R-02. Además puede superar el precio: con `precio = 5`, `porcentaje = 0` y cliente VIP el total sería **−5**. | Mayor | Lectura del código y `requisitos.md` (R-02). | Constante `BONO_VIP` y tope del descuento al precio (RF-02 y RF-03). | Abierto, pendiente de S-02 y S-03 |
| H-07 | 1 y 2 | 4 | No se valida el tipo ni el rango de los parámetros: un precio negativo, `undefined` o un texto producen `NaN` o resultados por conversión implícita sin ningún aviso. | Mayor | Lectura del código: no existe ninguna validación de entrada. | Implementar las validaciones de RF-03 y RF-04 (`RangeError`, `TypeError`). | Abierto |
| H-08 | 1 y 6 | 12 y 13 | La función se llama `calcularDescuento` pero devuelve el **total a pagar**; no tiene JSDoc que aclare el contrato. Quien la use puede restar el resultado otra vez. | Menor | Lectura del código: `return total`. | Renombrar a `calcularTotalConDescuento` o documentar con JSDoc (RF-04). | Abierto |
| H-09 | 2 y 5 | 8 | No hay redondeo: con `precio = 19.99` y `porcentaje = 15` el descuento es 2,9985 y el total tendría más de dos decimales. | Mayor | Lectura del código y R-04 («resultado correcto»). | Redondear el total a 2 decimales (RF-04). | Abierto, pendiente de S-05 |

## Resumen

| Origen | Hallazgos | Cerrados | Abiertos |
|--------|-----------|----------|----------|
| ESLint | 4 | 3 | 1 |
| Revisión humana | 5 | 0 | 5 |
| **Total** | **9** | **3** | **6** |

- **ESLint** detectó defectos de forma y de uso del lenguaje. Todos los que tenían una regla confirmada se corrigieron.
- **La revisión humana** detectó los defectos de mayor severidad (H-05 y H-06), que ESLint no puede ver porque el código es sintácticamente válido: el problema está en lo que el negocio espera, no en cómo está escrito.
- Los hallazgos abiertos no se corrigieron a propósito: hacerlo exigiría decidir reglas de negocio todavía sin confirmar (`requisitos.md`, sección 3).
