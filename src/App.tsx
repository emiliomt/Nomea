import { useState } from "react";

const diagnostico = [
  { id: 1, dim: "Reproductiva", pregunta: "¿Tasa preñez >80%? ¿IEP <380d?", score: 0 },
  { id: 2, dim: "Nutricional", pregunta: "¿BCS hato 5-6? ¿GDP por sistema controlado?", score: 0 },
  { id: 3, dim: "Genética", pregunta: "¿Toros con DEPs? ¿Cruzamiento planeado?", score: 0 },
  { id: 4, dim: "Sanidad", pregunta: "¿Programa anual? ¿Mortalidad <3%?", score: 0 },
  { id: 5, dim: "Instalaciones", pregunta: "¿Manga curva? ¿Bajo estrés? ¿NOM-033?", score: 0 },
  { id: 6, dim: "Recursos Naturales", pregunta: "¿Pradera regenerada? ¿Carga ajustada?", score: 0 },
  { id: 7, dim: "Gestión Financiera", pregunta: "¿Presupuesto + flujo + KPIs documentados?", score: 0 },
  { id: 8, dim: "Comercialización", pregunta: "¿3+ canales? ¿Negociación activa?", score: 0 },
  { id: 9, dim: "Capital Humano", pregunta: "¿Vaqueros capacitados? ¿Plan de sucesión?", score: 0 },
  { id: 10, dim: "Tecnología/Datos", pregunta: "¿Excel KPIs? ¿App identificación?", score: 0 },
];

const acciones = [
  {
    id: 1,
    plazo: "30 días",
    modulo: "M7",
    dim: "Sanidad",
    color: "#6B4C1E",
    titulo: "Implementar Programa Sanitario Anual",
    descripcion: "Vacunación IBR + BVD + Lepto + Brucella en todas las vacas. Desparasitación endo/ecto.",
    kpi: "100% vacas con tarjeta sanitaria al día. Mortalidad <3%.",
    presupuesto: "$18,000 – $28,000 MXN",
    impacto: "Previene pérdidas de 20-30% productividad. ROI 5:1.",
    detalle: [
      "Contratar MVZ para revisión general del hato",
      "Aplicar vacunas reproductivas (IBR, BVD, Lepto) a las 80 vacas",
      "Vacuna RB-51 a vaquillas de reemplazo (3-8 meses)",
      "Desparasitación interna: Albendazol oral",
      "Desparasitación externa: Ivermectina inyectable",
      "Registrar historial sanitario por arete en Excel",
    ],
  },
  {
    id: 2,
    plazo: "30 días",
    modulo: "M8",
    dim: "Nutricional",
    color: "#3A6B2A",
    titulo: "Diagnóstico BCS del Hato",
    descripcion: "Evaluar Condición Corporal 1-9 en las 80 vacas. Identificar animales en BCS <5.",
    kpi: "80% del hato en BCS 5-6. Vacas problema identificadas y con plan de nutrición.",
    presupuesto: "$2,000 – $4,000 MXN (MVZ + suplemento inicial)",
    impacto: "BCS al parto es el predictor #1 de reproducción postparto.",
    detalle: [
      "Pasar todo el hato por manga en 1 día",
      "Calificar BCS 1-9 por palpación (costillas, anca, base de cola)",
      "Separar en 3 grupos: BCS <4 (urgente), BCS 4-5 (suplementar), BCS 6+ (bien)",
      "Iniciar suplementación proteica en vacas con forraje <7% PC",
      "Si tienes >20% vacas en BCS <4, revisar calidad del forraje urgente",
      "Registrar BCS por arete para seguimiento trimestral",
    ],
  },
  {
    id: 3,
    plazo: "30 días",
    modulo: "M1",
    dim: "Gestión Financiera",
    color: "#1A4A6B",
    titulo: "Construir el Presupuesto Anual",
    descripcion: "Separar costos directos de gastos fijos. Calcular costo/kg producido real de tu rancho.",
    kpi: "Costo/kg producido calculado. Meta: por debajo de $48 MXN/kg.",
    presupuesto: "$0 (solo tiempo y Excel)",
    impacto: "Sin presupuesto = navegando a ciegas. Con 80 vacas el margen puede ser +$320,000/año.",
    detalle: [
      "Descargar plantilla del Anexo D del manual",
      "Levantar todos los costos directos del año pasado (alimentación, sanidad, reproducción, mano de obra)",
      "Separar los gastos fijos (mantenimiento, admin, depreciación, sueldos)",
      "Calcular: Ingresos - Costos Directos = Margen Bruto",
      "Calcular: Margen Bruto - Gastos Fijos = Utilidad Operativa",
      "Proyectar flujo de caja mes a mes (picos de tensión: julio-agosto y diciembre-enero)",
    ],
  },
  {
    id: 4,
    plazo: "60 días",
    modulo: "M4",
    dim: "Reproductiva",
    color: "#6B1A4A",
    titulo: "Diagnóstico de Gestación + Reclasificación",
    descripcion: "Ultrasonido o palpación a todas las vacas. Reclasificar vacías en máximo 7 días.",
    kpi: "Tasa preñez ≥85% en el siguiente empadre. Vacas vacías con destino definido.",
    presupuesto: "$9,600 – $20,000 MXN (80 vacas × $120-250/cab ultrasonido)",
    impacto: "1 punto extra de preñez = $400-800/cab/año. Con 80 vacas = $32,000-64,000/año adicionales.",
    detalle: [
      "Contratar MVZ para ultrasonido transrectal (25-30 días post-servicio) o palpación (45-60 días)",
      "Clasificar cada vaca: preñada / vacía / dudosa",
      "Vacas vacías: decidir en 7 días → re-servir (si CC≥5 y joven) / engorda / venta inmediata",
      "NO dejar vacas vacías sin destino — es costo cargado al hato",
      "Planear siguiente ciclo IATF si tasa de preñez fue <75%",
      "Registrar resultado por arete en bitácora reproductiva",
    ],
  },
  {
    id: 5,
    plazo: "60 días",
    modulo: "M5",
    dim: "Nutricional",
    color: "#3A6B2A",
    titulo: "Implementar Suplementación Mineral",
    descripcion: "Mineralización obligatoria todo el año. Con 80 vacas la deficiencia de P, Cu, Zn, Se es pérdida silenciosa.",
    kpi: "100% hato con acceso a sal mineral todo el año. BCS estable o mejorando en 60 días.",
    presupuesto: "$12,000 – $20,000 MXN/año (aprox. $1,000-1,700/mes)",
    impacto: "Deficiencias minerales reducen fertilidad 10-15% y GDP 15-20%. ROI 3:1 mínimo.",
    detalle: [
      "Identificar deficiencias regionales de tu zona (P en todo MX, Cu en zonas calcáreas, Zn en trópico, Se en suelos volcánicos)",
      "Comprar sal mineral completa balanceada (no solo NaCl)",
      "Instalar comederos de libre acceso (1 comedero por cada 20-25 vacas)",
      "Consumo esperado: 80-120 g/vaca/día",
      "Si hay deficiencia grave detectada por MVZ: inyectable ADE + Selenio-VitE para arranque rápido",
      "Revisar acceso a agua: mínimo 60-100 L/vaca lactante/día, máx 800m al bebedero",
    ],
  },
  {
    id: 6,
    plazo: "60 días",
    modulo: "M3",
    dim: "Genética",
    color: "#8B6914",
    titulo: "BSE a los Toros + Selección de Reemplazos",
    descripcion: "Con 80 vacas necesitas 3-4 toros mínimo. Evaluar aptitud reproductiva ANTES del empadre.",
    kpi: "100% toros con BSE SATISFACTORIO. Vaquillas de reemplazo seleccionadas con criterios objetivos (RTS≥3, CC 5-6, frame 4-5).",
    presupuesto: "$6,000 – $12,000 MXN (BSE toros + MVZ evaluación vaquillas)",
    impacto: "Toro infértil no detectado = 80 vacas sin preñar. Costo: $500k+ MXN en pérdida de producción.",
    detalle: [
      "BSE 60 días ANTES del empadre — no el día anterior",
      "Evaluar: examen físico + circunferencia escrotal (≥34 cm adulto) + morfología espermática (≥70% normales) + motilidad (≥30%)",
      "Toros NO SATISFACTORIOS: vender o desechar inmediatamente",
      "Para vaquillas de reemplazo: RTS Score ≥3, peso ≥65% peso adulto esperado, frame 4-5, temperamento ≤3",
      "Verificar DEPs del padre si tienes toros con registro — priorizar índice $W o $B",
      "Descartar vaquillas hijas de vacas con IEP >400 días",
    ],
  },
  {
    id: 7,
    plazo: "90 días",
    modulo: "M2 + M4",
    dim: "Genética + Reproductiva",
    color: "#6B1A4A",
    titulo: "Primer Ciclo IATF con Semen de Élite",
    descripcion: "Implementar protocolo IATF en al menos 40-50 vacas del hato para acceder a genética de élite sin comprar toro premium.",
    kpi: "Tasa de preñez IATF ≥50% (vacas adultas BCS≥5). Progenie con DEPs superiores al promedio actual del hato.",
    presupuesto: "$48,000 – $80,000 MXN (hormonas + semen + MVZ + manejo)",
    impacto: "Acceso a genética $100,000-500,000/toro por $600-900/dosis. Mejora genética en 1 generación.",
    detalle: [
      "Seleccionar semen de toro con índice $B (Beef Value AAA) o equivalente para ciclo completo",
      "Para zona norte/templado: Angus o Brangus. Para trópico: F1 Brahman×Angus",
      "Protocolo 3 manejos clásico: Día 0 (P4 + Estradiol 2mg), Día 7-9 (retiro P4 + PGF2α + eCG 300-400UI), Día 10-11 (IA a tiempo fijo)",
      "Solo incluir vacas con BCS≥5 y condición reproductiva confirmada",
      "Vacas con preñez positiva a IATF = repaso con toro por 45-60 días más",
      "Meta acumulada 80-90% preñez total (IATF + repaso)",
    ],
  },
  {
    id: 8,
    plazo: "90 días",
    modulo: "M13 + M14",
    dim: "Comercialización",
    color: "#1A4A6B",
    titulo: "Diversificar Canales de Venta",
    descripcion: "No vender todo al mismo acopiador. Con 80 vacas y ~60-65 becerros/año, la negociación activa vale +$150,000-300,000/año.",
    kpi: "Mínimo 2 canales de venta activos. Precio promedio por kg ≥$5 sobre precio acopiador.",
    presupuesto: "$5,000 – $10,000 MXN (registro, viajes, muestra de producto)",
    impacto: "Productor que negocia por categoría captura +$15-30/kg sobre el que vende 'a granel'.",
    detalle: [
      "Identificar 2-3 rastros TIF o compradores directos en tu región",
      "Calcular precio comparativo: acopiador vs rastro TIF vs exportación en pie vs venta directa",
      "Si estás en zona norte: explorar exportación becerros feeder a USA (precio CME - basis)",
      "Registrar todos los animales en SINIIGA — es requisito para exportación y TIF",
      "Documentar historial de manejo, vacunación y origen genético para negociar precio diferencial",
      "Meta en 6 meses: tener contacto activo con 3 compradores distintos",
    ],
  },
];

const kpis = [
  { nombre: "Vacas totales", valor: "80", unidad: "cab", meta: "—" },
  { nombre: "Becerros/año (85% preñez)", valor: "~68", unidad: "cab", meta: "≥64" },
  { nombre: "Ingresos estimados (destete 205d)", valor: "$1.8-2.4M", unidad: "MXN/año", meta: ">$2M" },
  { nombre: "Costo producción meta", valor: "<$42", unidad: "MXN/kg", meta: "$32-48" },
  { nombre: "Toros necesarios (1:25-30)", valor: "3-4", unidad: "toros", meta: "BSE ✓" },
  { nombre: "Tasa extracción anual", valor: "20-25%", unidad: "%", meta: "20-25%" },
  { nombre: "Margen por cabeza meta", valor: ">$4,000", unidad: "MXN", meta: "≥$4,000" },
  { nombre: "Utilidad anual estimada", valor: "$280-380k", unidad: "MXN", meta: ">$300k" },
];

const coloresPlazo = {
  "30 días": { bg: "#FFF3CD", border: "#D4A017", badge: "#D4A017", text: "#7A5C00" },
  "60 días": { bg: "#D1ECF1", border: "#117A8B", badge: "#117A8B", text: "#0C5460" },
  "90 días": { bg: "#D4EDDA", border: "#1E7E34", badge: "#1E7E34", text: "#155724" },
};

export default function PlanR4P() {
  const [scores, setScores] = useState(diagnostico.map((d) => ({ ...d, score: 5 })));
  const [tabActiva, setTabActiva] = useState("plan");
  const [accionExpandida, setAccionExpandida] = useState(null);

  const totalScore = scores.reduce((s, d) => s + d.score, 0);
  const dimMasBaja = [...scores].sort((a, b) => a.score - b.score)[0];

  const interpretacion =
    totalScore >= 80
      ? { texto: "Rancho de Excelencia", color: "#1E7E34", bg: "#D4EDDA" }
      : totalScore >= 60
      ? { texto: "Rancho Profesional Rentable", color: "#117A8B", bg: "#D1ECF1" }
      : totalScore >= 40
      ? { texto: "Rancho en Subsistencia — Margen para Crecer", color: "#D4A017", bg: "#FFF3CD" }
      : { texto: "Rancho en Crisis — Intervención Urgente", color: "#C0392B", bg: "#F8D7DA" };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#F9F6F0", minHeight: "100vh", color: "#1C1209" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1C3A1A 0%, #2D5E28 60%, #3A7A32 100%)",
          padding: "40px 24px 32px",
          borderBottom: "4px solid #C8A84B",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ background: "#C8A84B", color: "#1C1209", fontSize: 11, fontFamily: "monospace", fontWeight: 700, padding: "3px 10px", letterSpacing: 2, textTransform: "uppercase" }}>
              Ranching 4 Profit · Edición 2026
            </span>
          </div>
          <h1 style={{ color: "#F5EDD0", fontSize: 32, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 }}>
            Plan de Acción R4P
          </h1>
          <p style={{ color: "#A8C8A0", fontSize: 17, margin: 0, fontStyle: "italic" }}>
            Rancho de 80 Vacas · 14 Módulos · 90 Días de Transformación
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#2D2010", borderBottom: "1px solid #5A3E1A" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", gap: 0 }}>
          {[
            { id: "plan", label: "📋 Plan de Acción" },
            { id: "diagnostico", label: "🎯 Diagnóstico" },
            { id: "kpis", label: "📊 KPIs del Rancho" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id)}
              style={{
                padding: "14px 20px",
                background: tabActiva === tab.id ? "#C8A84B" : "transparent",
                color: tabActiva === tab.id ? "#1C1209" : "#C8A84B",
                border: "none",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                fontSize: 14,
                fontWeight: tabActiva === tab.id ? 700 : 400,
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 48px" }}>
        {/* TAB: PLAN DE ACCIÓN */}
        {tabActiva === "plan" && (
          <div>
            <div style={{ background: "#FFF8EC", border: "2px solid #C8A84B", borderRadius: 8, padding: "16px 20px", marginBottom: 28 }}>
              <p style={{ margin: 0, fontSize: 14, color: "#5A3E1A", lineHeight: 1.6 }}>
                <strong>Tu situación base:</strong> 80 vacas representan un negocio con potencial de <strong>$1.8–2.4M MXN/año</strong> en ingresos. Este plan de 8 acciones, basado en los 14 módulos R4P, está diseñado para maximizar rentabilidad en 90 días con inversión priorizada por ROI.
              </p>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {["30 días", "60 días", "90 días"].map((p) => (
                <span key={p} style={{ background: coloresPlazo[p].bg, color: coloresPlazo[p].text, border: `1px solid ${coloresPlazo[p].border}`, borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 600 }}>
                  ● {p}
                </span>
              ))}
            </div>

            {acciones.map((accion) => {
              const c = coloresPlazo[accion.plazo];
              const expandida = accionExpandida === accion.id;
              return (
                <div
                  key={accion.id}
                  style={{
                    background: "#FFFFFF",
                    border: `1px solid #E0D4C0`,
                    borderLeft: `5px solid ${accion.color}`,
                    borderRadius: 8,
                    marginBottom: 14,
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    onClick={() => setAccionExpandida(expandida ? null : accion.id)}
                    style={{ padding: "16px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ background: "#2D2010", color: "#C8A84B", fontSize: 11, fontFamily: "monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 3 }}>
                          Acción {accion.id}
                        </span>
                        <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>
                          {accion.plazo}
                        </span>
                        <span style={{ background: "#F0EAE0", color: "#5A3E1A", fontSize: 11, padding: "2px 8px", borderRadius: 3 }}>
                          {accion.modulo} · {accion.dim}
                        </span>
                      </div>
                      <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#1C1209" }}>{accion.titulo}</h3>
                      <p style={{ margin: 0, fontSize: 13, color: "#5A3E1A", lineHeight: 1.5 }}>{accion.descripcion}</p>
                    </div>
                    <span style={{ color: "#C8A84B", fontSize: 20, flexShrink: 0 }}>{expandida ? "▲" : "▼"}</span>
                  </div>

                  {expandida && (
                    <div style={{ padding: "0 18px 18px", borderTop: "1px solid #F0E8D8" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "14px 0" }}>
                        <div style={{ background: "#F9F6F0", borderRadius: 6, padding: "10px 14px" }}>
                          <div style={{ fontSize: 11, fontFamily: "monospace", color: "#8B6914", fontWeight: 700, marginBottom: 4, textTransform: "uppercase" }}>KPI Verificable</div>
                          <div style={{ fontSize: 13, color: "#1C1209", lineHeight: 1.5 }}>{accion.kpi}</div>
                        </div>
                        <div style={{ background: "#F9F6F0", borderRadius: 6, padding: "10px 14px" }}>
                          <div style={{ fontSize: 11, fontFamily: "monospace", color: "#8B6914", fontWeight: 700, marginBottom: 4, textTransform: "uppercase" }}>Presupuesto</div>
                          <div style={{ fontSize: 13, color: "#1C1209", lineHeight: 1.5 }}>{accion.presupuesto}</div>
                        </div>
                      </div>
                      <div style={{ background: `${accion.color}15`, border: `1px solid ${accion.color}40`, borderRadius: 6, padding: "10px 14px", marginBottom: 14 }}>
                        <div style={{ fontSize: 11, fontFamily: "monospace", color: accion.color, fontWeight: 700, marginBottom: 4, textTransform: "uppercase" }}>Impacto Esperado</div>
                        <div style={{ fontSize: 13, color: "#1C1209", lineHeight: 1.5 }}>{accion.impacto}</div>
                      </div>
                      <div style={{ fontSize: 12, fontFamily: "monospace", color: "#8B6914", fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Pasos concretos</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {accion.detalle.map((paso, i) => (
                          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <span style={{ background: accion.color, color: "#FFF", fontSize: 11, fontFamily: "monospace", fontWeight: 700, padding: "1px 6px", borderRadius: 3, flexShrink: 0, marginTop: 1 }}>
                              {i + 1}
                            </span>
                            <span style={{ fontSize: 13, color: "#2D2010", lineHeight: 1.5 }}>{paso}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ background: "#1C3A1A", color: "#F5EDD0", borderRadius: 8, padding: "20px 24px", marginTop: 24 }}>
              <div style={{ fontSize: 12, fontFamily: "monospace", color: "#C8A84B", marginBottom: 8, letterSpacing: 2, textTransform: "uppercase" }}>Inversión Total del Plan</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>$100,600 – $174,000 MXN</div>
              <div style={{ fontSize: 14, color: "#A8C8A0" }}>Retorno esperado en 12 meses: <strong style={{ color: "#C8A84B" }}>$280,000 – $500,000 MXN adicionales</strong> vs. rancho sin plan.</div>
            </div>
          </div>
        )}

        {/* TAB: DIAGNÓSTICO */}
        {tabActiva === "diagnostico" && (
          <div>
            <div style={{ background: "#FFF8EC", border: "2px solid #C8A84B", borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
              <p style={{ margin: 0, fontSize: 14, color: "#5A3E1A", lineHeight: 1.6 }}>
                <strong>Diagnóstico Rancho de 10 Puntos R4P.</strong> Califica con honestidad brutal cada dimensión del 0 al 10. La dimensión más baja es donde mayor ROI tendrás en los próximos 90 días.
              </p>
            </div>

            {scores.map((d, i) => (
              <div key={d.id} style={{ background: "#FFFFFF", border: "1px solid #E0D4C0", borderRadius: 8, padding: "16px 18px", marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <span style={{ background: "#2D2010", color: "#C8A84B", fontSize: 11, fontFamily: "monospace", fontWeight: 700, padding: "2px 7px", borderRadius: 3, marginRight: 8 }}>
                      {d.id.toString().padStart(2, "0")}
                    </span>
                    <strong style={{ fontSize: 15 }}>{d.dim}</strong>
                  </div>
                  <span style={{ fontSize: 24, fontWeight: 700, color: d.score >= 7 ? "#1E7E34" : d.score >= 5 ? "#D4A017" : "#C0392B", fontFamily: "monospace" }}>
                    {d.score}
                  </span>
                </div>
                <p style={{ margin: "0 0 10px", fontSize: 12, color: "#5A3E1A" }}>{d.pregunta}</p>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={d.score}
                  onChange={(e) => {
                    const ns = [...scores];
                    ns[i] = { ...ns[i], score: parseInt(e.target.value) };
                    setScores(ns);
                  }}
                  style={{ width: "100%", accentColor: "#C8A84B", cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8B7355" }}>
                  <span>0 — No existe</span>
                  <span>5 — En proceso</span>
                  <span>10 — Excelencia</span>
                </div>
              </div>
            ))}

            <div style={{ background: interpretacion.bg, border: `2px solid ${interpretacion.color}`, borderRadius: 8, padding: "20px 24px", marginTop: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontFamily: "monospace", color: interpretacion.color, fontWeight: 700, marginBottom: 4, textTransform: "uppercase" }}>Score Total</div>
                  <div style={{ fontSize: 14, color: "#1C1209", fontWeight: 700 }}>{interpretacion.texto}</div>
                </div>
                <div style={{ fontSize: 48, fontWeight: 700, color: interpretacion.color, fontFamily: "monospace" }}>{totalScore}</div>
              </div>
              {dimMasBaja && (
                <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 6, padding: "10px 14px", marginTop: 8 }}>
                  <div style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 700, color: "#C0392B", marginBottom: 4 }}>⚠ DIMENSIÓN MÁS BAJA</div>
                  <div style={{ fontSize: 14, color: "#1C1209" }}>
                    <strong>{dimMasBaja.dim}</strong> (score: {dimMasBaja.score}) — Aquí tienes el mayor ROI. Empieza ahí, no en las 10 dimensiones a la vez.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: KPIs */}
        {tabActiva === "kpis" && (
          <div>
            <div style={{ background: "#FFF8EC", border: "2px solid #C8A84B", borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
              <p style={{ margin: 0, fontSize: 14, color: "#5A3E1A", lineHeight: 1.6 }}>
                <strong>10 KPIs maestros para tu rancho de 80 vacas.</strong> Lo que se mide se mejora. Revisa trimestralmente contra meta. Identifica brecha. Acción correctiva.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {kpis.map((k, i) => (
                <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E0D4C0", borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ fontSize: 11, fontFamily: "monospace", color: "#8B6914", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>{k.nombre}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#1C3A1A", lineHeight: 1 }}>{k.valor}</div>
                  <div style={{ fontSize: 12, color: "#8B7355" }}>{k.unidad}</div>
                  <div style={{ fontSize: 11, color: "#5A3E1A", marginTop: 6, padding: "3px 8px", background: "#F0EAE0", borderRadius: 4, display: "inline-block" }}>
                    Meta: {k.meta}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#FFFFFF", border: "1px solid #E0D4C0", borderRadius: 8, padding: "18px 20px", marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontFamily: "monospace", color: "#8B6914", fontWeight: 700, marginBottom: 14, textTransform: "uppercase" }}>Calendario de Control Obligatorio</div>
              {[
                { dia: "Día 30", hrs: "1 hora", temas: "Avance acciones rápidas (Sanidad, BCS, Presupuesto) + obstáculos encontrados" },
                { dia: "Día 60", hrs: "1.5 horas", temas: "KPIs vs meta + presupuesto vs real + decisión vacas vacías" },
                { dia: "Día 90", hrs: "3 horas", temas: "Resultados completos + lecciones + score Rancho 10 Puntos actualizado" },
                { dia: "Anual", hrs: "1 día", temas: "Score completo + presupuesto año siguiente + estrategia comercial" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: i < 3 ? 12 : 0, borderBottom: i < 3 ? "1px solid #F0E8D8" : "none", marginBottom: i < 3 ? 12 : 0 }}>
                  <div style={{ background: "#1C3A1A", color: "#C8A84B", fontSize: 12, fontFamily: "monospace", fontWeight: 700, padding: "4px 10px", borderRadius: 4, flexShrink: 0, textAlign: "center" }}>
                    {c.dia}
                    <br />
                    <span style={{ color: "#A8C8A0", fontSize: 10 }}>{c.hrs}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#2D2010", lineHeight: 1.5, paddingTop: 2 }}>{c.temas}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#2D2010", color: "#F5EDD0", borderRadius: 8, padding: "18px 20px" }}>
              <div style={{ fontSize: 11, fontFamily: "monospace", color: "#C8A84B", marginBottom: 8, letterSpacing: 2, textTransform: "uppercase" }}>Regla de Oro R4P</div>
              <p style={{ margin: "0 0 8px", fontSize: 14, lineHeight: 1.6, fontStyle: "italic" }}>
                "La ganadería rentable no es accidente — es diseño, disciplina y dedicación."
              </p>
              <p style={{ margin: 0, fontSize: 13, color: "#A8C8A0", lineHeight: 1.5 }}>
                Sin registros NO hay mejora. Sin diagnóstico NO hay plan. Sin plan, <strong style={{ color: "#C8A84B" }}>NO hay rancho</strong>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
