# Matriz de problemas y trazabilidad

Relaciona cada problema de requisitos con su impacto, la propuesta de mejora, el artefacto donde queda registrada y su estado al cierre de la primera iteración.

| ID | Problema | Impacto | Propuesta | Artefacto | Estado |
|----|----------|---------|-----------|-----------|--------|
| M-01 | R-01 usa «rápidamente» sin métrica ni entorno de medición. | Medio: no se puede aceptar ni rechazar el requisito; cada persona lo interpreta distinto. | RF-01: p95 ≤ 5 ms sobre 10 000 invocaciones en Node.js 22 LTS. | `docs/requisitos.md` (RF-01, S-01) | Propuesto; S-01 pendiente de confirmación |
| M-02 | R-02 no define «clientes importantes» ni «descuento especial». | Alto: el código suma 10 fijo sin respaldo en el requisito; puede cobrarse de menos o de más. | RF-02: bono VIP fijo de 10,00 solo si `esVip === true`, en constante `BONO_VIP`. | `docs/requisitos.md` (RF-02, S-02, S-03) · `src/descuentos.js` línea 3 · hallazgos H-02 y H-06 | Propuesto; comparación estricta corregida (H-02); monto pendiente de confirmación |
| M-03 | R-03 deja abierta la excepción «excepto en promociones» y no dice qué hacer con valores inválidos. | Crítico: el código permite totales negativos (la tienda terminaría debiendo dinero al cliente). | RF-03: porcentaje en [0, 100], `RangeError` fuera de rango y total mínimo 0,00. | `docs/requisitos.md` (RF-03, S-04) · `src/descuentos.js` línea 4 · hallazgos H-04 y H-05 | Propuesto; corrección de lógica abierta hasta confirmar S-04 |
| M-04 | R-04 pide un «resultado correcto» sin oráculo, formato ni manejo de entradas inválidas. | Alto: no hay forma de diseñar pruebas; errores de redondeo y de tipos pasan inadvertidos. | RF-04: devuelve el total con 2 decimales, `TypeError` ante tipos inválidos y casos CA-01 a CA-06. | `docs/requisitos.md` (RF-04, S-05, S-06) · hallazgos H-07, H-08 y H-09 | Propuesto; pendiente de confirmación |

## Trazabilidad resumida

| Requisito original | Requisito verificable | Supuestos | Código afectado | Hallazgos | Casos de aceptación |
|--------------------|-----------------------|-----------|-----------------|-----------|---------------------|
| R-01 | RF-01 | S-01 | función completa | — | medición p95 |
| R-02 | RF-02 | S-02, S-03 | línea 3 | H-02, H-06 | CA-02 |
| R-03 | RF-03 | S-04 | línea 4 | H-04, H-05 | CA-04, CA-05 |
| R-04 | RF-04 | S-05, S-06 | líneas 1, 5 y 6 | H-07, H-08, H-09 | CA-01, CA-03, CA-06 |

Los hallazgos (H-xx) se detallan en [`hallazgos.md`](hallazgos.md).
