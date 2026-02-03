# Análisis de problemática

ASSA ABLOY utiliza módulos de auditoría para auditar los procesos de diversas áreas de la planta:

- **Baldwin State**

- **Baldwin Reserve**
  - Surtido de Materiales

  - Proceso de Stacking

  - Empaque

  - Generales

- **Display Area**

- **Pizza Tray**

Cada uno de estos módulos utiliza un formato en papel para su auditoría.
La idea es hacer el proceso **paperless** con una solución web.

Todos y cada uno de estos módulos deben permitir al usuario:

- Hacer un reporte

- Gestionar reportes

- Exportar reportes

No se planea hacer estos reportes dinámicos, por lo que los usuarios **no pueden modificarlos**.

---

## Reportes de Auditoría

### Baldwin State

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Línea:** Nombre de línea (sin información predefinida)

- **Coordinador:** Nombre de persona (libre)

#### Preguntas (Pasa / Falla)

- **Coordinador:** 1, 2, 3, 4

- **Matrices:** 5

- **Herramientas:** 6, 7

- **Operador:** 8 al 17

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Baldwin Reserve: Surtido de Materiales

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Picker:** Libre

#### Preguntas (Pasa / Falla)

- **Proceso de Surtido:** 1 al 8

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Baldwin Reserve: Proceso de Stacking

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Línea:** Nombre de línea (sin información)

#### Preguntas (Pasa / Falla)

- **Proceso de Stacking:** 1 al 10

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Baldwin Reserve: Empaque

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Línea:** Nombre de línea (sin información)

#### Preguntas (Pasa / Falla)

- **Proceso de Empaque:** 1 al 12

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Baldwin Reserve: Generales

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Línea:** Nombre de línea (sin información)

#### Preguntas (Pasa / Falla)

- **Generales:** 1, 2, 3

- **Embarques:** 4

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Display Area

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Worktable:** Selector múltiple (Mesa 01, Mesa 02, …)

#### Preguntas (Pasa / Falla)

- **Checklist:** 1 al 6

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Pizza Tray

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Ubicación:** Libre

- **Nivel:** Número ≥ 1 (sin límite aparente)

#### Preguntas (Pasa / Falla)

- **Checklist:** 1 al 5

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

## Reportes Adicionales

### EOLA

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Unidad de Negocio:** Opción múltiple

- **Línea:** Opción múltiple

- **Tipo:** EOLA / Picking

> El SKU y el UPC deben poder escanearse con un escáner.

#### EOLA

- Número de Orden (libre)

- SKU (texto escaneado)

- UPC (código escaneado)

- Tamaño de Orden ≥ 0

- Cantidad inspeccionada ≥ 0

- Cantidad aceptada ≥ 0

#### Picking

- SKU (texto escaneado)

- UPC (código escaneado)

- Tamaño de Orden ≥ 0

- Cantidad inspeccionada ≥ 0

- Cantidad aceptada ≥ 0

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

## NCR (Non-Conforming Report)

El NCR requiere exportar y cargar una plantilla en Excel.

### Funcionalidad del sistema

1.  Descargar plantilla NCR en Excel.

2.  El usuario llena una hoja con:
    - NCR: NVARCHAR(100)

    - Fecha: DATE

    - Semana: TINYINT

    - Número de Parte: NVARCHAR(500)

    - Proveedor: NVARCHAR(500)

    - Defecto: NVARCHAR(MAX)

3.  Subir el Excel contestado.

4.  El sistema analiza el archivo, guarda la información en la base de datos y almacena el archivo.

5.  Los reportes NCR deben poder gestionarse desde el sistema.

---

## Requerimiento de Acción Correctiva (RAC)

Acciones correctivas fuera de los reportes de auditoría.

### Datos requeridos

- Iniciada por (usuario)

- Fecha

- Responsable (opción múltiple)

- Número de parte (NVARCHAR(100))

- Descripción del producto (NVARCHAR(225))

- Tamaño de lote (INT)

- Ponderancia (LOW / MEDIUM / HIGH)

- Código de fecha (opcional)

- Área (opción múltiple)

- Porcentaje de falla (DECIMAL 5,2)

- Descripción del problema (NVARCHAR MAX)

- Evidencia (PDF, Excel, PNG, JPG)

### Flujo

1.  Usuario crea un RAC.

2.  Se notifica por correo al responsable del área.

3.  El responsable revisa el RAC y evidencias.

4.  Adjunta plan de acción y feedback.

5.  Valida el RAC.

6.  Se notifica al usuario creador con acceso al plan de acción y comentarios.

---

## Usuarios

Inicio de sesión integrado con **Microsoft (Edge)**, permitiendo solo correos empresariales existentes.

### Tipos de usuario

- **Administrador:** Acceso total

- **Calidad:** Todo excepto gestión de usuarios

- **General:** Solo generar reportes

- **Auditor:** Acceso solo a reportes de auditoría

---

## Características Extra

### Panel de Información

#### Análisis Mensual

- Problemáticas más frecuentes (respuestas false)

- Áreas con más reincidencias

#### Alertas Semanales

- Reporte negativo: ≥ 50% respuestas false

- Al llegar a 20 reportes negativos semanales:
  - Envío de correo al encargado del área

- Semáforo de auditoría:
  - Verde: normal

  - Amarillo: 20 reportes negativos

  - Rojo: 40 o más

#### Estadísticas Mensuales

- Top 5 incisos con más false por área

- Top 5 incisos con más true (reconocimiento)

- Reporte consolidado con toda la información anterior# Análisis de problemática

ASSA ABLOY utiliza módulos de auditoría para auditar los procesos de diversas áreas de la planta:

- **Baldwin State**

- **Baldwin Reserve**
  - Surtido de Materiales

  - Proceso de Stacking

  - Empaque

  - Generales

- **Display Area**

- **Pizza Tray**

Cada uno de estos módulos utiliza un formato en papel para su auditoría.
La idea es hacer el proceso **paperless** con una solución web.

Todos y cada uno de estos módulos deben permitir al usuario:

- Hacer un reporte

- Gestionar reportes

- Exportar reportes

No se planea hacer estos reportes dinámicos, por lo que los usuarios **no pueden modificarlos**.

---

## Reportes de Auditoría

### Baldwin State

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Línea:** Nombre de línea (sin información predefinida)

- **Coordinador:** Nombre de persona (libre)

#### Preguntas (Pasa / Falla)

- **Coordinador:** 1, 2, 3, 4

- **Matrices:** 5

- **Herramientas:** 6, 7

- **Operador:** 8 al 17

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Baldwin Reserve: Surtido de Materiales

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Picker:** Libre

#### Preguntas (Pasa / Falla)

- **Proceso de Surtido:** 1 al 8

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Baldwin Reserve: Proceso de Stacking

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Línea:** Nombre de línea (sin información)

#### Preguntas (Pasa / Falla)

- **Proceso de Stacking:** 1 al 10

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Baldwin Reserve: Empaque

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Línea:** Nombre de línea (sin información)

#### Preguntas (Pasa / Falla)

- **Proceso de Empaque:** 1 al 12

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Baldwin Reserve: Generales

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Línea:** Nombre de línea (sin información)

#### Preguntas (Pasa / Falla)

- **Generales:** 1, 2, 3

- **Embarques:** 4

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Display Area

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Worktable:** Selector múltiple (Mesa 01, Mesa 02, …)

#### Preguntas (Pasa / Falla)

- **Checklist:** 1 al 6

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

### Pizza Tray

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Ubicación:** Libre

- **Nivel:** Número ≥ 1 (sin límite aparente)

#### Preguntas (Pasa / Falla)

- **Checklist:** 1 al 5

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

## Reportes Adicionales

### EOLA

- **Auditor:** Nombre de usuario

- **Fecha:** 01/15/2026

- **Semana:** 03

- **Unidad de Negocio:** Opción múltiple

- **Línea:** Opción múltiple

- **Tipo:** EOLA / Picking

> El SKU y el UPC deben poder escanearse con un escáner.

#### EOLA

- Número de Orden (libre)

- SKU (texto escaneado)

- UPC (código escaneado)

- Tamaño de Orden ≥ 0

- Cantidad inspeccionada ≥ 0

- Cantidad aceptada ≥ 0

#### Picking

- SKU (texto escaneado)

- UPC (código escaneado)

- Tamaño de Orden ≥ 0

- Cantidad inspeccionada ≥ 0

- Cantidad aceptada ≥ 0

#### Hallazgos y evidencia

- Comentarios (texto)

- Subir evidencia (PNG, JPG)

---

## NCR (Non-Conforming Report)

El NCR requiere exportar y cargar una plantilla en Excel.

### Funcionalidad del sistema

1.  Descargar plantilla NCR en Excel.

2.  El usuario llena una hoja con:
    - NCR: NVARCHAR(100)

    - Fecha: DATE

    - Semana: TINYINT

    - Número de Parte: NVARCHAR(500)

    - Proveedor: NVARCHAR(500)

    - Defecto: NVARCHAR(MAX)

3.  Subir el Excel contestado.

4.  El sistema analiza el archivo, guarda la información en la base de datos y almacena el archivo.

5.  Los reportes NCR deben poder gestionarse desde el sistema.

---

## Requerimiento de Acción Correctiva (RAC)

Acciones correctivas fuera de los reportes de auditoría.

### Datos requeridos

- Iniciada por (usuario)

- Fecha

- Responsable (opción múltiple)

- Número de parte (NVARCHAR(100))

- Descripción del producto (NVARCHAR(225))

- Tamaño de lote (INT)

- Ponderancia (LOW / MEDIUM / HIGH)

- Código de fecha (opcional)

- Área (opción múltiple)

- Porcentaje de falla (DECIMAL 5,2)

- Descripción del problema (NVARCHAR MAX)

- Evidencia (PDF, Excel, PNG, JPG)

### Flujo

1.  Usuario crea un RAC.

2.  Se notifica por correo al responsable del área.

3.  El responsable revisa el RAC y evidencias.

4.  Adjunta plan de acción y feedback.

5.  Valida el RAC.

6.  Se notifica al usuario creador con acceso al plan de acción y comentarios.

---

## Usuarios

Inicio de sesión integrado con **Microsoft (Edge)**, permitiendo solo correos empresariales existentes.

### Tipos de usuario

- **Administrador:** Acceso total

- **Calidad:** Todo excepto gestión de usuarios

- **General:** Solo generar reportes

- **Auditor:** Acceso solo a reportes de auditoría

---

## Características Extra

### Panel de Información

#### Análisis Mensual

- Problemáticas más frecuentes (respuestas false)

- Áreas con más reincidencias

#### Alertas Semanales

- Reporte negativo: ≥ 50% respuestas false

- Al llegar a 20 reportes negativos semanales:
  - Envío de correo al encargado del área

- Semáforo de auditoría:
  - Verde: normal

  - Amarillo: 20 reportes negativos

  - Rojo: 40 o más

#### Estadísticas Mensuales

- Top 5 incisos con más false por área

- Top 5 incisos con más true (reconocimiento)

- Reporte consolidado con toda la información anterior
