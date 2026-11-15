# Revisión de requisitos — módulo de descuentos

- **Técnica:** revisión estática de requisitos (sin ejecutar el software).
- **Criterios de calidad usados:** cada requisito debe ser no ambiguo, completo, consistente, verificable y trazable.
- **Fecha:** 15 de noviembre de 2026 · **Autor:** Angelo Chávez

## 1. Requisitos originales y problemas detectados

| ID | Texto original | Problemas detectados |
|----|----------------|----------------------|
| R-01 | «El descuento debe calcularse rápidamente» | «Rápidamente» es subjetivo: no hay métrica, umbral ni entorno de medición. No se puede decidir si se cumple. |
| R-02 | «Los clientes importantes obtendrán un descuento especial» | No define quién es «importante» ni cuánto es «especial» (¿porcentaje o monto fijo?, ¿se suma al descuento base o lo reemplaza?). |
| R-03 | «El descuento no puede superar el precio, excepto en promociones» | La excepción no está acotada: no dice qué es una promoción ni qué pasa cuando el descuento supera el precio (¿total negativo?). Tampoco indica cómo reaccionar ante un valor inválido. |
| R-04 | «Se debe mostrar el resultado correcto» | «Correcto» no tiene oráculo: no define formato, redondeo, moneda ni comportamiento ante entradas inválidas. Mezcla cálculo con presentación («mostrar»). |

## 2. Requisitos reformulados (verificables)

### RF-01 · Tiempo de cálculo (origen: R-01)
La función `calcularDescuento` debe devolver su resultado en **5 ms o menos en el percentil 95**, medido sobre 10 000 invocaciones consecutivas con entradas válidas en Node.js 22 LTS.

- **Criterio de verificación:** medición con `performance.now()`; el percentil 95 debe ser ≤ 5 ms.
- **Supuesto pendiente:** S-01.

### RF-02 · Descuento adicional para clientes VIP (origen: R-02)
Cuando el parámetro `esVip` sea estrictamente el booleano `true`, al descuento base (`precio × porcentaje / 100`) se le sumará un **bono VIP fijo de 10,00 unidades monetarias**, definido en una constante con nombre (`BONO_VIP`). Con `esVip` igual a `false` no se suma ningún bono. Cualquier otro tipo de dato en `esVip` se rechaza según RF-04.

- **Criterio de verificación:** `(100, 10, true)` → total 80,00; `(100, 10, false)` → total 90,00.
- **Supuestos pendientes:** S-02 y S-03.

### RF-03 · Límite del descuento (origen: R-03)
1. `porcentaje` debe estar en el rango cerrado **[0, 100]** y `precio` debe ser **≥ 0**. Fuera de esos rangos la función lanza `RangeError` y **no devuelve ningún total**.
2. El descuento total (base + bono VIP) nunca puede superar el precio: si lo supera, se limita al precio y el total es **0,00**. El total nunca es negativo.

- **Criterio de verificación:** `(100, 120, false)` → `RangeError`; `(5, 0, true)` → total 0,00.
- **Supuesto pendiente:** S-04 (alcance de «excepto en promociones»).

### RF-04 · Resultado y contrato de la función (origen: R-04)
La función devuelve el **total a pagar** como `number`, **redondeado a 2 decimales**. Si `precio` o `porcentaje` no son números finitos, o `esVip` no es booleano, lanza `TypeError`. La función no imprime nada en consola: la presentación corresponde a la capa de interfaz.

- **Criterio de verificación:** tabla de casos de aceptación de la sección 4.
- **Supuestos pendientes:** S-05 y S-06.

## 3. Supuestos de negocio pendientes de confirmación

Ninguno de estos supuestos se ha implementado en el código. Deben ser confirmados por el responsable del negocio antes de programar los RF.

| ID | Supuesto | Afecta a | Estado |
|----|----------|----------|--------|
| S-01 | El umbral aceptable de respuesta es 5 ms (p95) por invocación. | RF-01 | Pendiente |
| S-02 | «Cliente importante» equivale a un cliente con la marca VIP activa en su perfil. | RF-02 | Pendiente |
| S-03 | El «descuento especial» es un monto fijo de 10,00 (como en el código actual) y no 10 puntos porcentuales adicionales. | RF-02 | Pendiente |
| S-04 | Ninguna promoción permite un total negativo; una promoción puede llegar como máximo al 100 % (producto gratuito). | RF-03 | Pendiente |
| S-05 | El total se expresa en USD con 2 decimales y redondeo al centavo más cercano. | RF-04 | Pendiente |
| S-06 | «Mostrar» el resultado es responsabilidad de la interfaz; el módulo solo devuelve el valor. | RF-04 | Pendiente |

## 4. Casos de aceptación derivados (para la fase dinámica posterior)

Estos casos se obtuvieron por análisis de los RF; **no se ejecutaron** en esta unidad.

| Caso | precio | porcentaje | esVip | Resultado esperado | RF |
|------|--------|------------|-------|--------------------|----|
| CA-01 | 100 | 10 | false | 90,00 | RF-04 |
| CA-02 | 100 | 10 | true | 80,00 | RF-02 |
| CA-03 | 19,99 | 15 | false | 16,99 | RF-04 |
| CA-04 | 5 | 0 | true | 0,00 | RF-03 |
| CA-05 | 100 | 120 | false | `RangeError` | RF-03 |
| CA-06 | "100" | 10 | false | `TypeError` | RF-04 |

La matriz que relaciona cada problema con su propuesta, artefacto y estado está en [`matriz.md`](matriz.md).
