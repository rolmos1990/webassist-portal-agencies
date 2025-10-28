import type { GetCotizacionesAgenteAgencia200 } from "../schemas";

export const cotizaciones_agente_agencia: GetCotizacionesAgenteAgencia200 = {
    "ok": true,
    "data": {
      "items": [
        {
          "url": "https://www.weassistgroup.com/es/carrito/abc123",
          "fecha": "01/09/2025",
          "fecha_modificacion": "02/09/2025"
        },
        {
            "url": "https://www.weassistgroup.com/es/carrito/abc123",
            "fecha": "01/09/2024",
            "fecha_modificacion": "02/09/2024"
        },
        {
            "url": "https://www.weassistgroup.com/es/carrito/abc123",
            "fecha": "01/09/2023",
            "fecha_modificacion": "02/09/2023"
        }
      ],
      "paginacion": {
        "pagina_actual": 1,
        "cantidad_paginas": 1,
        "cantidad_total": 3
      }
    }
  }