import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PREGUNTAS, pregunta as obtenerPregunta, type NuevaRespuesta } from "@/lib/encuesta";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ArrowLeft, UtensilsCrossed, PartyPopper } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Turismo gastronómico — Encuesta de estudio de mercado" },
      {
        name: "description",
        content:
          "Encuesta anónima de 10 preguntas sobre turismo gastronómico en Nicaragua. Toma 2 minutos.",
      },
      { property: "og:title", content: "Turismo gastronómico — Encuesta anónima" },
      {
        property: "og:description",
        content:
          "Proyecto académico de Marketing, Grupo MK2111, Universidad Nacional Casimiro Sotelo Montenegro.",
      },
    ],
  }),
  component: Encuesta,
});

function Encuesta() {
  const [paso, setPaso] = useState(-1);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);

  const total = PREGUNTAS.length;

  async function enviar(finales: Record<string, string>) {
    if (enviando) return;
    setEnviando(true);
    const { error } = await supabase
      .from("respuestas")
      .insert(finales as unknown as NuevaRespuesta);
    if (error) {
      setEnviando(false);
      toast.error("No se pudo enviar la encuesta. Intente de nuevo.");
      return;
    }
    setListo(true);
  }

  if (listo) {
    return (
      <Pantalla>
        <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
          <PartyPopper className="mx-auto h-16 w-16 text-accent" />
          <h1 className="mt-6 text-3xl font-extrabold text-foreground">¡Muchas gracias!</h1>
          <p className="mt-3 text-muted-foreground">
            Su respuesta fue registrada de forma anónima y nos ayuda mucho con nuestro estudio de
            mercado sobre turismo gastronómico.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">Grupo MK2111 · Marketing, 1er año</p>
        </div>
      </Pantalla>
    );
  }

  if (paso === -1) {
    return (
      <Pantalla>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
        <div className="animate-float mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-primary/15 bg-card shadow-xl shadow-primary/20">
          <UtensilsCrossed className="h-14 w-14 text-primary" />
        </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-foreground">
            Turismo gastronómico
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Esta encuesta es anónima y toma solo 2 minutos.
          </p>
          <Button size="lg" className="mt-8 h-14 w-full text-lg" onClick={() => setPaso(0)}>
            Empezar
          </Button>
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-border" />
          <UtensilsCrossed className="h-3.5 w-3.5 text-primary/50" />
          <span className="h-px w-10 bg-border" />
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Estudio de mercado · Grupo MK2111 · Marketing, 1er año
          <br />
          Universidad Nacional Casimiro Sotelo Montenegro, Nicaragua
        </p>
        </div>
      </Pantalla>
    );
  }

  const pregunta = obtenerPregunta(paso);

  function responder(opcion: string) {
    const finales = { ...respuestas, [pregunta.campo]: opcion };
    setRespuestas(finales);
    if (paso === total - 1) {
      void enviar(finales);
    } else {
      setPaso(paso + 1);
    }
  }

  return (
    <Pantalla>
      <div className="w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPaso(paso - 1)}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary"
            aria-label="Volver atrás"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Progress value={((paso + 1) / total) * 100} className="h-3" />
          <span className="text-sm font-semibold text-muted-foreground">
            {paso + 1}/{total}
          </span>
        </div>

        <div key={paso} className="animate-in fade-in slide-in-from-right-6 duration-300">
          <h2 className="mt-8 text-2xl font-bold leading-snug text-foreground">
            {pregunta.titulo}
          </h2>

          <div className="mt-6 space-y-3">
            {pregunta.opciones.map((opcion) => {
              const activa = respuestas[pregunta.campo] === opcion;
              return (
                <button
                  key={opcion}
                  disabled={enviando}
                  onClick={() => setRespuestas({ ...respuestas, [pregunta.campo]: opcion })}
                  className={`w-full rounded-2xl border-2 p-4 text-left text-base transition-all active:scale-[0.98] ${
                    activa
                      ? "border-primary bg-primary/10 font-semibold text-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/60"
                  }`}
                >
                  {opcion}
                </button>
              );
            })}
          </div>

          <Button
            size="lg"
            className="mt-8 h-14 w-full text-lg"
            disabled={!respuestas[pregunta.campo] || enviando}
            onClick={() => responder(respuestas[pregunta.campo] ?? "")}
          >
            {enviando ? "Enviando…" : paso === total - 1 ? "Enviar" : "Siguiente"}
          </Button>
        </div>
      </div>
    </Pantalla>
  );
}

function Pantalla({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 top-1/3 h-48 w-48 rounded-full bg-secondary blur-2xl" />
      <svg
        className="pointer-events-none absolute right-8 top-12 text-primary/15"
        width="70"
        height="70"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" strokeDasharray="12 10" />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-16 right-10 rotate-12 text-accent/15"
        width="60"
        height="60"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 8C56 28 72 44 92 50 72 56 56 72 50 92 44 72 28 56 8 50 28 44 44 28 50 8Z" />
      </svg>
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </main>
  );
}
