import type { ReporteVentasAgenciaResponse } from "../schemas";

export const reporte_ventas_agencia: ReporteVentasAgenciaResponse = {
    "ok": true,
    "data": {
      "mes": "09",
      "mes_nombre": "Septiembre",
      "ano": "2025",
      "agencia": "1",
      "agente": 1,
      "items": [
        {
          "id": "1",
          "voucher": "A93-123122",
          "fecha_venta": "01/09/2025 11:55 am",
          "agencia_id": "1",
          "agencia_nombre": "WE ASSIST",
          "agente_id": "1",
          "agente_nombre": "Ramon Olmos",
          "precio_venta": 39.97,
          "costo_procesamiento": 1.5,
          "base_comision": 39.97,
          "porcentaje": "100.00",
          "monto": "33.18"
        }
      ],
      "acums": {
        "precio": 28057.23,
        "costo_administrativo": 1002.68,
        "base_comision": 28057.23,
        "monto": 13839.79
      }
    }
  }