import type { GetPerfilAgente200 } from "../schemas";

export const perfil_agente: GetPerfilAgente200 = {
    "ok": true,
    "data": {
      "id": 123,
      "codigo": "WSA-0123",
      "email": "ramon.olmos90@gmail.com",
      "pais": { "id": 1, "nombre": "Panama" },
      "nombre": "Ramon",
      "apellido": "Olmos",
      "telefono": "",
      "ultimo_login": "1761165212",
      "imagen": "",
      "comision": 0,
      "tipo_pago": { "id": 1, "nombre": "Directo" },
      "qr": "agente_123.png",
      "recibir_correos_renovaciones": true,
      "correo_renovaciones_alternativo": "",
      "status": { "id": 1, "nombre": "Activo" },
      "userid": 123,
      "nombre_completo": "Ramon Olmos",
      "cambiarpassword": false,
      "agencia": { "id": 1, "nombre": "WE ASSIST" },
      "idioma_user": "es",
      "token_api": "12312312312312",
      "roles": [
        "agente"
      ]
    }
  }
