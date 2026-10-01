import type {
  GetAsistenciasAgenteAgencia200DataItemsItem,
  GetCotizacionesAgenteAgencia200DataItemsItem,
} from "../api/schemas";
import { planNames } from "../components/Tables/AgencyQuotesDataTableConfig";

/**
 * Modelo de vista del detalle de voucher: la misma pantalla muestra una asistencia
 * (un solo plan) o una cotización (una o varias líneas, cada una con su plan y pasajeros).
 * Los valores con prefijo "__" no vienen del servicio (hardcodeados a revisar).
 */
export type VoucherKind = "assistance" | "quote";

export type VoucherTraveler = {
  key: string;
  name: string;
  gender: string;
  idNumber: string;
  /** null = el servicio indica no mostrar precios */
  amount: number | null;
  dob: string;
  phone: string;
  email: string;
  medicalDetails: string;
  cardUrl?: string;
  certificationUrl?: string;
};

export type VoucherBlock = {
  key: string;
  planName: string;
  origin: string;
  destination: string;
  exit: string;
  return: string;
  travelers: VoucherTraveler[];
};

export type VoucherView = {
  code: string;
  /** clave del theme de StatusBadge (color) y texto a mostrar */
  statusKey: string;
  statusLabel: string;
  planTitle: string;
  /** null = no mostrar precios */
  total: number | null;
  travelersCount: number;
  issueDate: string;
  reference: string;
  payment: string;
  pdfUrl?: string;
  /** Las cotizaciones todavía no tienen tarjeta/certificado */
  hasDocuments: boolean;
  /**
   * Parámetros de GET /beneficios-cliente/{voucher}/{id_cliente}: token de la asistencia
   * e id del primer pasajero (el cliente no viene por otro lado). Las cotizaciones no tienen.
   */
  benefits?: { voucher: string; clientId: string };
  blocks: VoucherBlock[];
};

const EMPTY = "—";
const orEmpty = (v?: string | null) => (v && v.trim() ? v : EMPTY);
const fullName = (nombre?: string, apellido?: string) => `${nombre ?? ""} ${apellido ?? ""}`.trim() || EMPTY;

// Sin equivalente en el servicio
const HARDCODED_REFERENCE = "__22815";

export function fromAsistencia(item?: GetAsistenciasAgenteAgencia200DataItemsItem): VoucherView {
  const showPrices = item?.mostrar_precios !== false;
  const pago = item?.pagos?.[0];
  const pasajeros = item?.pasajeros ?? [];

  return {
    code: item?.voucher?.codigo ?? item?.token ?? EMPTY,
    statusKey: item?.cancelada ? "Inactive" : "Active",
    statusLabel: item?.cancelada ? "Cancelled" : "Active",
    planTitle: orEmpty(item?.plan?.nombre),
    total: showPrices ? Number(item?.total ?? 0) : null,
    travelersCount: pasajeros.length,
    issueDate: orEmpty(item?.fecha),
    reference: HARDCODED_REFERENCE,
    payment: pago
      ? `${pago.metodo_pago?.nombre ?? EMPTY}${pago.id_aprobacion ? ` (${pago.id_aprobacion})` : ""}`
      : EMPTY,
    pdfUrl: item?.voucher?.pdf || undefined,
    hasDocuments: true,
    benefits:
      item?.token && pasajeros[0]?.id != null
        ? { voucher: item.token, clientId: String(pasajeros[0].id) }
        : undefined,
    blocks: [
      {
        key: item?.token ?? "asistencia",
        planName: orEmpty(item?.plan?.nombre),
        origin: orEmpty(item?.pais_origen?.nombre),
        destination: orEmpty(item?.pais_destino?.nombre),
        exit: orEmpty(item?.fecha_inicio),
        return: orEmpty(item?.fecha_fin),
        travelers: pasajeros.map((p, idx) => ({
          key: String(p.id ?? idx),
          name: fullName(p.nombre, p.apellido),
          gender: orEmpty(p.sexo?.nombre),
          idNumber: orEmpty(p.pasaporte),
          amount: showPrices ? Number(p.precio ?? 0) : null,
          dob: orEmpty(p.nacimiento),
          phone: orEmpty(p.telefono),
          email: orEmpty(p.email),
          medicalDetails: p.condicion ?? "",
          cardUrl: p.documentos?.tarjeta || undefined,
          certificationUrl: p.documentos?.certificacion || undefined,
        })),
      },
    ],
  };
}

export function fromCotizacion(item?: GetCotizacionesAgenteAgencia200DataItemsItem): VoucherView {
  const lineas = item?.lineas ?? [];

  return {
    code: item?.token ?? EMPTY,
    // El servicio no entrega estado para cotizaciones
    statusKey: "__Pending",
    statusLabel: "__Pending",
    planTitle: item ? orEmpty(planNames(item)) : EMPTY,
    total: Number(item?.total ?? 0),
    travelersCount: lineas.reduce((acc, l) => acc + (l.pasajeros?.length ?? 0), 0),
    issueDate: orEmpty(item?.fecha),
    reference: HARDCODED_REFERENCE,
    payment: "__",
    pdfUrl: undefined,
    hasDocuments: false,
    blocks: lineas.map((linea, lineIdx) => ({
      key: String(linea.id ?? lineIdx),
      planName: orEmpty(linea.plan?.nombre),
      origin: orEmpty(linea.pais?.nombre),
      destination: orEmpty(linea.pais_destino?.nombre),
      exit: orEmpty(linea.fecha_salida),
      return: orEmpty(linea.fecha_regreso),
      travelers: (linea.pasajeros ?? []).map((p, idx) => ({
        key: `${lineIdx}-${idx}`,
        // Sin datos cargados el servicio arma "Pasajero N (rango de edad)" en nombre_mostrar
        name: p.datos_completos === false ? orEmpty(p.nombre_mostrar) : fullName(p.nombre, p.apellido),
        gender: orEmpty(p.sexo?.nombre),
        idNumber: orEmpty(p.pasaporte),
        // precio final del pasajero (con upgrades y descuento)
        amount: Number(p.precio ?? 0),
        dob: orEmpty(p.fecha_nacimiento),
        phone: orEmpty(p.telefono),
        email: orEmpty(p.email),
        medicalDetails: p.condicion_medica ?? "",
      })),
    })),
  };
}
