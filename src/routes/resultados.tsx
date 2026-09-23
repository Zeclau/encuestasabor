import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { EDADES, PREGUNTAS, pregunta as obtenerPregunta, type Respuesta } from "@/lib/encuesta";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download, Loader2 } from "lucide-react";

export const Route = createFileRoute("/resultados")({
  head: () => ({
    meta: [
      { title: "Resultados — Encuesta Turismo gastronómico" },
      {
        name: "description",
        content: "Panel de resultados de la encuesta de turismo gastronómico del Grupo MK2111.",
      },
      { property: "og:title", content: "Resultados — Encuesta Turismo gastronómico" },
      {
        name: "robots",
        content: "noindex",
      },
      {
        property: "og:description",
        content: "Gráficos y porcentajes de la encuesta de turismo gastronómico.",
      },
    ],
  }),
  component: Resultados,
});

const COLORES = ["#E8590C", "#E03131", "#F59F00", "#C2255C", "#2F9E44"];

function Resultados() {
  const [datos, setDatos] = useState<Respuesta[] | null>(null);
  const [edad, setEdad] = useState("Todas");

  useEffect(() => {
    supabase
      .from("respuestas")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          toast.error("No se pudieron cargar los resultados.");
          setDatos([]);
          return;
        }
        setDatos((data ?? []) as Respuesta[]);
      });
  }, []);

  const cruce = useMemo(() => {
    if (!datos) return [];
    const p3 = obtenerPregunta(2);
    const filtrados = edad === "Todas" ? datos : datos.filter((r) => r.q1 === edad);
    return p3.opciones.map((opcion) => {
      const fila: Record<string, string | number> = {
        opcion: opcion.split(" (")[0] ?? opcion,
      };
      for (const rango of EDADES) {
        fila[rango] = filtrados.filter((r) => r.q3 === opcion && r.q1 === rango).length;
      }
      return fila;
    });
  }, [datos, edad]);

  function exportarCSV() {
    if (!datos || datos.length === 0) return;
    const encabezados = ["fecha", ...PREGUNTAS.map((p, i) => `P${i + 1}`)];
    const filas = datos.map((r) =>
      [new Date(r.created_at).toLocaleString("es-NI"), ...PREGUNTAS.map((p) => r[p.campo])]
        .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
        .join(","),
    );
    const csv = [encabezados.join(","), ...filas].join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "turismo-gastronomico.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copiarLink() {
    await navigator.clipboard.writeText(window.location.origin + "/");
    toast.success("Link de la encuesta copiado");
  }

  if (!datos) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-extrabold text-foreground">Resultados</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Turismo gastronómico · Grupo MK2111 · Universidad Nacional Casimiro Sotelo Montenegro
          </p>

          <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-card p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground">Encuestas recibidas</p>
            <p className="text-5xl font-extrabold text-primary">{datos.length}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={exportarCSV} disabled={datos.length === 0} className="h-12">
              <Download className="mr-2 h-4 w-4" /> Exportar CSV
            </Button>
            <Button variant="outline" onClick={copiarLink} className="h-12">
              <Copy className="mr-2 h-4 w-4" /> Copiar link de la encuesta
            </Button>
          </div>
        </div>

        {PREGUNTAS.map((pregunta, indice) => {
          const conteos = pregunta.opciones.map((opcion, i) => ({
            nombre: opcion,
            corto: opcion.split(" (")[0] ?? opcion,
            valor: datos.filter((r) => r[pregunta.campo] === opcion).length,
            color: COLORES[i % COLORES.length],
          }));
          const suma = conteos.reduce((a, b) => a + b.valor, 0) || 1;
          const pastel = indice % 2 === 0;

          return (
            <section
              key={pregunta.campo}
              className="animate-in fade-in slide-in-from-bottom-4 mt-6 rounded-2xl border border-border bg-card p-5 duration-500"
            >
              <h2 className="text-base font-bold text-foreground">
                {indice + 1}. {pregunta.titulo}
              </h2>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  {pastel ? (
                    <PieChart>
                      <Pie data={conteos} dataKey="valor" nameKey="corto" outerRadius={80} label>
                        {conteos.map((c) => (
                          <Cell key={c.nombre} fill={c.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  ) : (
                    <BarChart data={conteos}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="corto" tick={{ fontSize: 11 }} interval={0} />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                        {conteos.map((c) => (
                          <Cell key={c.nombre} fill={c.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {conteos.map((c) => (
                  <li key={c.nombre} className="flex justify-between gap-4">
                    <span>{c.nombre}</span>
                    <span className="font-semibold text-foreground">
                      {c.valor} ({Math.round((c.valor / suma) * 100)}%)
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="animate-in fade-in slide-in-from-bottom-4 mt-6 rounded-2xl border-2 border-accent/30 bg-card p-5 duration-500">
          <h2 className="text-base font-bold text-foreground">
            Cruce: tipo de experiencia (P3) por edad (P1)
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Todas", ...EDADES].map((rango) => (
              <button
                key={rango}
                onClick={() => setEdad(rango)}
                className={`rounded-full border-2 px-4 py-2 text-sm transition-all active:scale-95 ${
                  edad === rango
                    ? "border-accent bg-accent/10 font-semibold text-foreground"
                    : "border-border text-muted-foreground hover:border-accent/60"
                }`}
              >
                {rango}
              </button>
            ))}
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cruce}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="opcion" tick={{ fontSize: 11 }} interval={0} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                {EDADES.map((rango, i) => (
                  <Bar
                    key={rango}
                    dataKey={rango}
                    fill={COLORES[i % COLORES.length]}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </main>
  );
}
