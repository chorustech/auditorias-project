## Diagrama ER

erDiagram
    USUARIO ||--o{ REPORTE_AUDITORIA : "realiza"
    USUARIO ||--o{ ACCION_CORRECTIVA : "inicia"
    USUARIO ||--o{ ACCION_CORRECTIVA : "responsable_de"
    
    AREA ||--o{ REPORTE_AUDITORIA : "pertenece a"
    AREA ||--o{ ACCION_CORRECTIVA : "asociada"
    
    REPORTE_AUDITORIA ||--o{ EVIDENCIA : "tiene"
    ACCION_CORRECTIVA ||--o{ EVIDENCIA : "tiene"

    USUARIO {
        uuid id PK
        string nombre
        string correo
        string rol "ADMIN, CALIDAD, GENERAL, AUDITOR"
        string microsoft_id
    }

    AREA {
        int id PK
        string nombre "Baldwin State, Pizza Tray, etc."
        string encargado_email
    }

    REPORTE_AUDITORIA {
        uuid id PK
        int area_id FK
        uuid auditor_id FK
        timestamp fecha
        int semana
        string linea_o_ubicacion
        string coordinador_o_picker
        jsonb respuestas "Pasa/Falla por pregunta"
        text comentarios
        boolean es_negativo "Calculado: >50% falla"
    }

    REPORTE_EOLA {
        uuid id PK
        uuid auditor_id FK
        string tipo "EOLA / Picking"
        string unidad_negocio
        string sku
        string upc
        int orden_tamano
        int cant_inspeccionada
        int cant_aceptada
        text comentarios
    }

    REPORTE_NCR {
        uuid id PK
        string ncr_code
        date fecha
        int semana
        string numero_parte
        string proveedor
        text defecto
        string excel_path "Ruta al archivo en servidor"
    }

    ACCION_CORRECTIVA {
        uuid id PK
        uuid iniciador_id FK
        uuid responsable_id FK
        int area_id FK
        string numero_parte
        string ponderancia "LOW, MEDIUM, HIGH"
        decimal porcentaje_falla
        text descripcion_problema
        text feedback_superior
        string plan_accion_path
        string estado "PENDIENTE, VALIDADO"
    }

    EVIDENCIA {
        uuid id PK
        uuid referencia_id "FK a Auditoria o RAC"
        string tipo_referencia "AUDITORIA, RAC"
        string url_archivo
    }