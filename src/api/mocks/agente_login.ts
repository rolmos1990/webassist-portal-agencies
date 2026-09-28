import type { PostAgenteLogin200 } from "../schemas";

export const agente_login: PostAgenteLogin200 = {
    "ok": true,
    "data": {
      "id": 1,
      "codigo": "WSA-0001",
      "email": "ramon.olmos90@gmail.com",
      "pais": { "id": 1, "nombre": "Panama" },
      "nombre": "Ramon",
      "apellido": "Olmos",
      "telefono": "+50764739851",
      "ultimo_login": "1758296449",
      "imagen": "",
      "comision": 0,
      "tipo_pago": { "id": 2, "nombre": "Crédito" },
      "qr": "agente_197.png",
      "token_api": "529c7985d3973aa370134805f05c0206c67221809314b30093c059e5f537273f",
      "recibir_correos_renovaciones": true,
      "correo_renovaciones_alternativo": "",
      "status": { "id": 1, "nombre": "Activo" },
      "userid": 1,
      "nombre_completo": "Ramon Olmos",
      "cambiarpassword": false,
      "agencia": { "id": 44, "nombre": "Justin Peralta" },
      "idioma_user": "es",
      "roles": [
        "agente"
      ]
    }
  }
