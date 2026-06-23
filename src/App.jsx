import { useState } from "react";

const COLORS = {
  orange: "#FF7A59",
  teal: "#00BDA5",
  navy: "#1C3A56",
  slate: "#516F90",
  light: "#F5F8FA",
  border: "#DFE3EB",
  text: "#33475B",
  red: "#F2545B",
  yellow: "#F5C26B",
};

const STEPS = ["Tu marca", "Diagnóstico", "Canal prioritario", "Plan de acción"];

const CHANNELS = [
  {
    id: "reviews",
    icon: "⭐",
    name: "Sitios de valoración",
    examples: "G2, Capterra, Trustpilot",
    jerarquia: "Nivel 2 — Alta confianza",
    questions: [
      { id: "profile", text: "¿Tu marca tiene perfil reclamado y completo en al menos un sitio de valoración (G2, Capterra u otro)?" },
      { id: "reviews", text: "¿Tienes al menos 5 reseñas verificadas en ese perfil?" },
      { id: "responses", text: "¿Respondes activamente las reseñas, tanto positivas como críticas?" },
    ],
    action: {
      title: "Construye tu presencia en sitios de valoración",
      intro: "Según lo que vimos en la lección, una sola reseña verificada en G2 puede tener más peso en tu visibilidad que varias páginas bien optimizadas en tu propio dominio.",
      fields: [
        { id: "platform", label: "¿En qué plataforma vas a construir o mejorar tu perfil?", placeholder: "Ej: G2, Capterra, Trustpilot..." },
        { id: "name", label: "Nombre exacto de tu marca o producto tal como quieres que aparezca citado", placeholder: "Ej: Gestor de Proyectos Pro by Acme" },
        { id: "description", label: "Descripción de 2-3 líneas: qué hace, para quién es, qué problema resuelve", placeholder: "Ej: Gestor de Proyectos Pro automatiza el seguimiento de tareas para equipos de marketing de entre 5 y 50 personas, reduciendo el tiempo de coordinación hasta un 40%." },
        { id: "result", label: "Un resultado concreto con número que puedas incluir en tu perfil", placeholder: "Ej: Nuestros clientes reducen el tiempo de onboarding en un 35% durante el primer mes." },
        { id: "moment", label: "¿En qué momento del ciclo del cliente vas a pedir reseñas?", placeholder: "Ej: Al renovar el contrato, al completar el primer proyecto, tras el primer mes de uso exitoso..." },
      ],
    },
  },
  {
    id: "lists",
    icon: "📋",
    name: "Listas especializadas",
    examples: "\"Mejores herramientas de X\", rankings editoriales",
    jerarquia: "Nivel 2 — Alta confianza",
    questions: [
      { id: "found", text: "¿Has buscado en Google qué listas existen para tu categoría (\"mejores herramientas de X\", \"mejores agencias de Y\")?" },
      { id: "appears", text: "¿Tu marca aparece en al menos una de esas listas?" },
      { id: "ficha", text: "¿Tienes preparada una ficha de marca con nombre exacto, descripción, resultados y diferenciación lista para enviar a editores?" },
    ],
    action: {
      title: "Prepara tu ficha de marca para listas especializadas",
      intro: "Según la lección, antes de contactar a cualquier editor necesitas tener lista una ficha estructurada. Esta es la que hace el trabajo del editor más fácil — y la que determina si te incluyen.",
      fields: [
        { id: "lista", label: "Nombre de la lista o medio editorial donde quieres aparecer", placeholder: "Ej: \"Las 60 mejores herramientas de marketing digital\" — SE Ranking Blog" },
        { id: "name", label: "Nombre exacto de tu marca o producto tal como quieres que aparezca citado", placeholder: "Ej: Gestor de Proyectos Pro by Acme" },
        { id: "description", label: "Descripción de 2-3 líneas: qué hace, para quién es, qué problema resuelve", placeholder: "Ej: Gestor de Proyectos Pro automatiza el seguimiento de tareas para equipos de marketing de entre 5 y 50 personas." },
        { id: "result", label: "2-3 resultados concretos con números verificables", placeholder: "Ej: Reduce el tiempo de coordinación un 40%. Más de 500 equipos activos en LATAM. Valoración de 4.8/5 en G2." },
        { id: "diferencia", label: "¿En qué se diferencia tu marca de las opciones que ya aparecen en esa lista?", placeholder: "Ej: A diferencia de los competidores listados, nuestra herramienta está diseñada específicamente para equipos de habla hispana con soporte en español 24/7." },
      ],
    },
  },
  {
    id: "youtube",
    icon: "▶️",
    name: "YouTube",
    examples: "Tutoriales, comparativas, webinars educativos",
    jerarquia: "Nivel 4 — Contenido educativo en video",
    questions: [
      { id: "channel", text: "¿Tu marca tiene un canal de YouTube activo con contenido educativo (tutoriales, comparativas o webinars)?" },
      { id: "name", text: "¿Los videos mencionan el nombre completo de tu producto o servicio de forma explícita en el audio, no solo en gráficos?" },
      { id: "transcript", text: "¿Subes transcripciones manuales corregidas para evitar errores con nombres de marca o términos técnicos?" },
    ],
    action: {
      title: "Optimiza un video de YouTube para AEO",
      intro: "Según la lección, un video de YouTube puede aparecer citado en ChatGPT o Gemini si cumple dos condiciones: contiene información que la IA puede extraer y está estructurado para que sea fácil de identificar.",
      fields: [
        { id: "tema", label: "¿Sobre qué tema vas a crear o mejorar un video?", placeholder: "Ej: Cómo automatizar reportes de ventas con Gestor de Proyectos Pro" },
        { id: "titulo", label: "Escribe el título optimizado para AEO (debe incluir el nombre del producto y la pregunta que responde)", placeholder: "Ej: Cómo automatizar reportes de ventas con Gestor de Proyectos Pro — tutorial paso a paso" },
        { id: "descripcion", label: "Escribe la descripción del video (qué tema cubre, qué preguntas responde, qué aprenderá quien lo vea)", placeholder: "Ej: En este tutorial aprenderás a configurar reportes automáticos de ventas con Gestor de Proyectos Pro en menos de 10 minutos. Cubrimos: cómo conectar tu CRM, cómo definir métricas clave y cómo programar envíos semanales." },
        { id: "entidad", label: "¿Cómo mencionarás el nombre exacto de tu producto en el audio del video?", placeholder: "Ej: Diré 'Gestor de Proyectos Pro' al menos tres veces durante el tutorial, especialmente al inicio y al final." },
        { id: "frecuencia", label: "¿Con qué frecuencia publicarás videos de este tipo para construir una señal sostenida?", placeholder: "Ej: Un video educativo al mes sobre casos de uso específicos de nuestra herramienta." },
      ],
    },
  },
];

function getGapScore(answers, channel) {
  const total = channel.questions.length;
  const passed = channel.questions.filter(q => answers[q.id] === true).length;
  return total - passed;
}

function generateHTML(brand, industry, market, channelAnswers, priorityId, actionData) {
  const priority = CHANNELS.find(c => c.id === priorityId);

  const diagRows = CHANNELS.map(ch => {
    const gap = getGapScore(channelAnswers[ch.id] || {}, ch);
    const status = gap === 0 ? "✅ Optimizado" : gap === 1 ? "🟡 Mejorable" : "🔴 Brecha alta";
    return `<tr>
      <td style="padding:8px 12px;border:1px solid #DFE3EB;">${ch.icon} ${ch.name}</td>
      <td style="padding:8px 12px;border:1px solid #DFE3EB;">${ch.jerarquia}</td>
      <td style="padding:8px 12px;border:1px solid #DFE3EB;text-align:center;">${status}</td>
    </tr>`;
  }).join("");

  const actionRows = priority ? priority.action.fields.map(f => {
    const val = actionData[f.id] || "(Sin completar)";
    return `<tr>
      <td style="padding:8px 12px;border:1px solid #DFE3EB;font-weight:600;color:#1C3A56;width:35%;">${f.label}</td>
      <td style="padding:8px 12px;border:1px solid #DFE3EB;">${val}</td>
    </tr>`;
  }).join("") : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<title>Planificador de señales externas para AEO — Resultado</title>
<style>
  body { font-family: sans-serif; color: #33475B; max-width: 800px; margin: 0 auto; padding: 40px 24px; }
  .header { background: #1C3A56; color: white; padding: 24px 32px; border-radius: 8px; margin-bottom: 32px; }
  .badge { background: #FF7A59; color: white; font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 4px 10px; border-radius: 4px; display: inline-block; margin-bottom: 8px; }
  h1 { margin: 0; font-size: 22px; }
  h2 { color: #1C3A56; font-size: 16px; border-bottom: 2px solid #DFE3EB; padding-bottom: 8px; margin-top: 32px; }
  .meta { background: #F5F8FA; border: 1px solid #DFE3EB; border-radius: 8px; padding: 16px 20px; margin: 16px 0; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 8px; }
  th { background: #1C3A56; color: white; padding: 10px 12px; text-align: left; }
  .footer { text-align: center; color: #516F90; font-size: 12px; margin-top: 48px; border-top: 1px solid #DFE3EB; padding-top: 16px; }
</style>
</head>
<body>
<div class="header">
  <div class="badge">HUBSPOT ACADEMY</div>
  <h1>Planificador de señales externas para AEO — Resultado del ejercicio</h1>
</div>

<h2>Tu marca</h2>
<div class="meta">
  <strong>Marca / Producto:</strong> ${brand}<br/>
  <strong>Industria:</strong> ${industry}<br/>
  <strong>Mercado principal:</strong> ${market}
</div>

<h2>Diagnóstico por canal</h2>
<table>
  <tr><th>Canal</th><th>Jerarquía de fuentes</th><th>Estado</th></tr>
  ${diagRows}
</table>

<h2>Canal prioritario: ${priority ? priority.name : "—"}</h2>
<table>
  <tr><th style="width:35%">Campo</th><th>Tu respuesta</th></tr>
  ${actionRows}
</table>

<div class="footer">HubSpot Academy · Certificación en optimización para motores de respuesta (AEO)</div>
</body>
</html>`;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState("");
  const [industry, setIndustry] = useState("");
  const [market, setMarket] = useState("");
  const [channelAnswers, setChannelAnswers] = useState({ reviews: {}, lists: {}, youtube: {} });
  const [priorityId, setPriorityId] = useState(null);
  const [actionData, setActionData] = useState({});

  const diagComplete = CHANNELS.every(ch =>
    ch.questions.every(q => channelAnswers[ch.id]?.[q.id] !== undefined)
  );

  const priorityChannel = CHANNELS.find(c => c.id === priorityId);
  const actionComplete = priorityChannel
    ? priorityChannel.action.fields.every(f => (actionData[f.id] || "").trim().length > 5)
    : false;

  const suggestedPriority = priorityId ? null : [...CHANNELS].sort((a, b) =>
    getGapScore(channelAnswers[b.id] || {}, b) - getGapScore(channelAnswers[a.id] || {}, a)
  )[0];

  function setAnswer(channelId, questionId, value) {
    setChannelAnswers(prev => ({
      ...prev,
      [channelId]: { ...prev[channelId], [questionId]: value }
    }));
  }

  function handleDownload() {
    const html = generateHTML(brand, industry, market, channelAnswers, priorityId, actionData);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "senales-externas-aeo.html";
    a.click();
    URL.revokeObjectURL(url);
  }

  const canNext =
    step === 0 ? brand.trim().length > 2 && industry.trim().length > 2 && market.trim().length > 2 :
    step === 1 ? diagComplete :
    step === 2 ? priorityId !== null :
    actionComplete;

  const getChannelGapColor = (ch) => {
    const gap = getGapScore(channelAnswers[ch.id] || {}, ch);
    return gap === 0 ? COLORS.teal : gap === 1 ? COLORS.yellow : COLORS.red;
  };

  const getChannelGapLabel = (ch) => {
    const gap = getGapScore(channelAnswers[ch.id] || {}, ch);
    return gap === 0 ? "Optimizado" : gap === 1 ? "Mejorable" : "Brecha alta";
  };

  return (
    <div style={{ fontFamily: "sans-serif", color: COLORS.text, minHeight: "100vh", background: COLORS.light }}>
      {/* Header */}
      <div style={{ background: COLORS.navy, padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, height: 56 }}>
          <span style={{ background: COLORS.orange, color: "white", fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "3px 8px", borderRadius: 4 }}>
            HUBSPOT ACADEMY
          </span>
          <span style={{ color: "white", fontWeight: 600, fontSize: 14 }}>
            Planificador de señales externas para AEO
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#e5e9ef", height: 4 }}>
        <div style={{ background: COLORS.teal, height: 4, width: `${((step + 1) / STEPS.length) * 100}%`, transition: "width 0.4s" }} />
      </div>

      {/* Step labels */}
      <div style={{ background: "white", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex" }}>
          {STEPS.map((label, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center", padding: "10px 4px", fontSize: 12, fontWeight: 600,
              color: i === step ? COLORS.teal : i < step ? COLORS.slate : "#aab4bf",
              borderBottom: i === step ? `2px solid ${COLORS.teal}` : "2px solid transparent",
            }}>
              {i < step ? "✓ " : ""}{label}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px" }}>

        {/* STEP 0 — Tu marca */}
        {step === 0 && (
          <div>
            <h2 style={{ color: COLORS.navy, marginTop: 0 }}>Tu marca</h2>
            <p style={{ color: COLORS.slate, lineHeight: 1.7 }}>
              Antes de evaluar tus señales externas, define el contexto de tu marca. Esta información guiará todo el ejercicio.
            </p>
            <div style={{ background: "#FFF8E1", border: `1px solid ${COLORS.yellow}`, borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 13 }}>
              💡 Los motores de respuesta con IA buscan señales fuera de tu dominio para confirmar que tu marca merece ser citada. Este ejercicio te ayuda a identificar dónde están tus brechas y qué hacer primero.
            </div>

            {[
              { label: "Nombre exacto de tu marca o producto", placeholder: "Ej: Gestor de Proyectos Pro by Acme", value: brand, set: setBrand, hint: "Escríbelo exactamente como quieres que aparezca citado en los motores de IA." },
              { label: "Industria o categoría", placeholder: "Ej: Software de gestión de proyectos para equipos de marketing", value: industry, set: setIndustry, hint: "Sé específico. Cuanto más precisa sea la categoría, más fácil identificar las fuentes relevantes." },
              { label: "Mercado principal", placeholder: "Ej: LATAM — Colombia, México y Argentina", value: market, set: setMarket, hint: "Indica la región o país donde opera tu marca. Esto es clave para identificar las fuentes editoriales más relevantes." },
            ].map((field, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <label style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy, display: "block", marginBottom: 4 }}>
                  {field.label} <span style={{ color: COLORS.red }}>*</span>
                </label>
                <div style={{ fontSize: 12, color: COLORS.slate, marginBottom: 6 }}>{field.hint}</div>
                <input
                  type="text"
                  value={field.value}
                  onChange={e => field.set(e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    width: "100%", padding: "12px 14px", fontSize: 14,
                    border: `1px solid ${COLORS.border}`, borderRadius: 8,
                    fontFamily: "sans-serif", color: COLORS.text, boxSizing: "border-box", outline: "none",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* STEP 1 — Diagnóstico */}
        {step === 1 && (
          <div>
            <h2 style={{ color: COLORS.navy, marginTop: 0 }}>Diagnóstico por canal</h2>
            <p style={{ color: COLORS.slate, lineHeight: 1.7 }}>
              Evalúa tu situación actual en cada canal. Responde con honestidad — el diagnóstico solo es útil si refleja el estado real de tu marca.
            </p>
            <div style={{ background: "#FFF8E1", border: `1px solid ${COLORS.yellow}`, borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 13 }}>
              💡 Recuerda la jerarquía de fuentes: los sitios de valoración y los medios editoriales tienen mayor peso ante la IA que tu propio sitio web. Una sola mención verificada en una fuente de alta confianza puede superar el impacto de varias páginas optimizadas.
            </div>

            {CHANNELS.map(ch => {
              const answers = channelAnswers[ch.id] || {};
              const allAnswered = ch.questions.every(q => answers[q.id] !== undefined);
              const gap = getGapScore(answers, ch);
              const gapColor = allAnswered ? (gap === 0 ? COLORS.teal : gap === 1 ? COLORS.yellow : COLORS.red) : COLORS.border;

              return (
                <div key={ch.id} style={{ background: "white", border: `2px solid ${gapColor}`, borderRadius: 10, padding: 20, marginBottom: 20, transition: "border-color 0.2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.navy }}>{ch.icon} {ch.name}</div>
                      <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 2 }}>{ch.examples}</div>
                      <div style={{ fontSize: 11, background: COLORS.light, color: COLORS.slate, padding: "2px 8px", borderRadius: 4, display: "inline-block", marginTop: 4 }}>{ch.jerarquia}</div>
                    </div>
                    {allAnswered && (
                      <div style={{ background: gapColor, color: "white", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                        {gap === 0 ? "✅ Optimizado" : gap === 1 ? "🟡 Mejorable" : "🔴 Brecha alta"}
                      </div>
                    )}
                  </div>

                  {ch.questions.map(q => (
                    <div key={q.id} style={{ marginBottom: 12, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
                      <p style={{ margin: "0 0 8px", fontSize: 13, lineHeight: 1.6 }}>{q.text}</p>
                      <div style={{ display: "flex", gap: 10 }}>
                        {[true, false].map(val => (
                          <button key={String(val)} onClick={() => setAnswer(ch.id, q.id, val)} style={{
                            padding: "6px 20px", borderRadius: 6,
                            border: `2px solid ${answers[q.id] === val ? (val ? COLORS.teal : COLORS.red) : COLORS.border}`,
                            background: answers[q.id] === val ? (val ? COLORS.teal : COLORS.red) : "white",
                            color: answers[q.id] === val ? "white" : COLORS.text,
                            fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.15s"
                          }}>
                            {val ? "Sí" : "No"}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 2 — Canal prioritario */}
        {step === 2 && (
          <div>
            <h2 style={{ color: COLORS.navy, marginTop: 0 }}>¿En qué canal vas a trabajar primero?</h2>
            <p style={{ color: COLORS.slate, lineHeight: 1.7 }}>
              Basándote en tu diagnóstico, elige el canal donde vas a construir o mejorar tu presencia. El siguiente paso te guiará con un plan de acción concreto.
            </p>

            {suggestedPriority && (
              <div style={{ background: "#E8FAF8", border: `1px solid ${COLORS.teal}`, borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13 }}>
                💡 Según tu diagnóstico, el canal con mayor brecha es <strong>{suggestedPriority.name}</strong>. Te sugerimos empezar por ahí, pero tú decides.
              </div>
            )}

            <div style={{ display: "grid", gap: 14 }}>
              {CHANNELS.map(ch => {
                const gap = getGapScore(channelAnswers[ch.id] || {}, ch);
                const gapColor = gap === 0 ? COLORS.teal : gap === 1 ? COLORS.yellow : COLORS.red;
                const gapLabel = gap === 0 ? "Optimizado" : gap === 1 ? "Mejorable" : "Brecha alta";
                const isSelected = priorityId === ch.id;

                return (
                  <div key={ch.id} onClick={() => setPriorityId(ch.id)} style={{
                    background: "white", border: `2px solid ${isSelected ? COLORS.teal : COLORS.border}`,
                    borderRadius: 10, padding: 18, cursor: "pointer", transition: "all 0.2s",
                    boxShadow: isSelected ? `0 0 0 3px ${COLORS.teal}22` : "none",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy }}>{ch.icon} {ch.name}</div>
                        <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 3 }}>{ch.examples}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ background: gapColor, color: "white", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                          {gapLabel}
                        </span>
                        <div style={{
                          width: 22, height: 22, borderRadius: "50%",
                          border: `2px solid ${isSelected ? COLORS.teal : COLORS.border}`,
                          background: isSelected ? COLORS.teal : "white",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "white", fontSize: 13, fontWeight: 700, flexShrink: 0
                        }}>
                          {isSelected ? "✓" : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3 — Plan de acción */}
        {step === 3 && priorityChannel && (
          <div>
            <h2 style={{ color: COLORS.navy, marginTop: 0 }}>{priorityChannel.icon} {priorityChannel.action.title}</h2>
            <p style={{ color: COLORS.slate, lineHeight: 1.7 }}>
              {priorityChannel.action.intro}
            </p>

            <div style={{ background: "#FFF8E1", border: `1px solid ${COLORS.yellow}`, borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 13 }}>
              💡 Completa cada campo con información real de tu marca. Esta es la información que usarás directamente al ejecutar tu estrategia.
            </div>

            {priorityChannel.action.fields.map((field, i) => (
              <div key={field.id} style={{ marginBottom: 20 }}>
                <label style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy, display: "block", marginBottom: 6 }}>
                  {i + 1}. {field.label} <span style={{ color: COLORS.red }}>*</span>
                </label>
                <textarea
                  value={actionData[field.id] || ""}
                  onChange={e => setActionData(prev => ({ ...prev, [field.id]: e.target.value }))}
                  placeholder={field.placeholder}
                  rows={3}
                  style={{
                    width: "100%", padding: "12px 14px", fontSize: 13, lineHeight: 1.7,
                    border: `1px solid ${(actionData[field.id] || "").trim().length > 5 ? COLORS.teal : COLORS.border}`,
                    borderRadius: 8, resize: "vertical", fontFamily: "sans-serif",
                    color: COLORS.text, boxSizing: "border-box", outline: "none", transition: "border-color 0.2s"
                  }}
                />
              </div>
            ))}

            {actionComplete && (
              <div style={{ background: COLORS.navy, borderRadius: 10, padding: 24, textAlign: "center", marginTop: 8 }}>
                <div style={{ color: "white", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
                  ¡Ejercicio completado!
                </div>
                <div style={{ color: "#a8bccf", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                  Descarga tu plan completo con el diagnóstico y las acciones definidas para tu canal prioritario.
                </div>
                <button onClick={handleDownload} style={{
                  background: COLORS.orange, color: "white", border: "none", borderRadius: 6,
                  padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer"
                }}>
                  Descargar plan de acción ↓
                </button>
                <p style={{ color: "#a8bccf", fontSize: 12, marginTop: 10, marginBottom: 0 }}>
                  Se descarga como HTML — ábrelo en tu navegador e imprímelo como PDF.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
          <button
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            style={{
              padding: "10px 24px", borderRadius: 6, border: `1px solid ${COLORS.border}`,
              background: "white", color: step === 0 ? "#ccc" : COLORS.text,
              fontWeight: 600, fontSize: 14, cursor: step === 0 ? "default" : "pointer"
            }}
          >
            ← Anterior
          </button>

          {step < STEPS.length - 1 && (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext}
              style={{
                padding: "10px 28px", borderRadius: 6, border: "none",
                background: canNext ? COLORS.teal : "#ccc",
                color: "white", fontWeight: 700, fontSize: 14,
                cursor: canNext ? "pointer" : "default", transition: "background 0.2s"
              }}
            >
              Siguiente →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
