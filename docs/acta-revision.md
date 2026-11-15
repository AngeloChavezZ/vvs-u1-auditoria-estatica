# Acta de inspección — `src/descuentos.js`

| Dato | Valor |
|------|-------|
| Fecha | 15 de noviembre de 2026 |
| Objeto inspeccionado | `src/descuentos.js` (código base, 8 líneas) |
| Material de apoyo | `docs/requisitos.md`, `docs/checklist.md`, `evidencias/lint-inicial.txt` |
| Tipo de revisión | Inspección formal por roles, basada en el proceso de Fagan (1976) |
| Pull request asociado | N.º 1: `revision/inspeccion-y-correcciones` → `main` |

## Modalidad y roles

La actividad se desarrolló de forma **individual**. Los tres roles de la inspección fueron asumidos por la misma persona en momentos separados, cada uno con un entregable distinto, para conservar la separación de responsabilidades que propone la técnica.

| Rol | Responsable | Responsabilidad | Entregable |
|-----|-------------|-----------------|------------|
| Autor | Angelo Chávez | Presenta el código y aplica las correcciones aprobadas. No defiende ni justifica los defectos. | Commit `fix(lint)` |
| Revisor | Angelo Chávez | Lee el código línea a línea contra la checklist y los requisitos, y propone hallazgos. | `checklist.md` respondida y comentarios del pull request |
| Registrador | Angelo Chávez | Anota cada hallazgo con severidad, evidencia, acción y estado, sin valorarlos. | `hallazgos.md` y esta acta |

**Limitación declarada:** al no haber una segunda persona, se pierde la independencia del revisor, que es la principal fortaleza de una inspección por pares. Para compensarlo se usó una checklist escrita antes de leer el código y se deja al final un espacio de validación para un compañero o el docente.

## Desarrollo

| Etapa | Actividad | Resultado |
|-------|-----------|-----------|
| 1. Planificación | Se define el alcance (un archivo, cuatro requisitos) y se prepara la checklist. | `checklist.md` con 15 preguntas |
| 2. Preparación | Lectura individual del código contra la checklist; ejecución de ESLint. | `lint-inicial.txt`: 5 errores y 1 advertencia |
| 3. Inspección | Recorrido línea a línea; se registran los hallazgos sin discutir soluciones. | 9 hallazgos (4 de ESLint y 5 de revisión humana) |
| 4. Corrección | El autor corrige solo los defectos confirmados por una regla de ESLint. | H-01, H-02 y H-03 cerrados |
| 5. Seguimiento | Se vuelve a ejecutar ESLint y se verifica que no se introdujeron defectos nuevos. | `lint-final.txt`: 0 errores y 1 advertencia |

## Comentarios técnicos de la revisión (pull request n.º 1)

**Comentario 1 — `src/descuentos.js`, comparación `esVip === true`.**
El cambio de `==` a `===` no es solo de estilo: antes un valor como `1` activaba el bono VIP y ahora no. Es el comportamiento que pide RF-02, pero modifica el contrato de la función. Se acepta el cambio con la condición de validar que `esVip` sea booleano cuando se implemente RF-04 (hallazgo H-07).

**Comentario 2 — `src/descuentos.js`, bloque `if (porcentaje > 100)`.**
Las llaves corrigen la regla `curly`, pero el defecto de fondo sigue: después del mensaje el cálculo continúa y el total puede ser negativo (H-05). No se corrige en este pull request porque depende del supuesto S-04. Se mantiene activa la advertencia `no-console` como recordatorio visible en cada ejecución de `npm run lint`.

## Decisiones

1. Se aprueban las correcciones de `no-var`, `eqeqeq` y `curly`.
2. No se modifica la lógica de negocio en esta iteración; H-04 a H-09 quedan abiertos.
3. Los supuestos S-01 a S-06 deben ser confirmados por el negocio antes de implementar RF-01 a RF-04.
4. La segunda iteración incluirá pruebas unitarias basadas en los casos CA-01 a CA-06.

## Validación

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Autor, revisor y registrador | Angelo Chávez | | 15/11/2026 |
| Validación externa (compañero o docente) | | | |
