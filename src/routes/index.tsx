import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PREGUNTAS } from "@/lib/encuesta";
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
    const { error } = await supabase.from("respuestas").insert(finales);
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
          <UtensilsCrossed className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-foreground">
            Turismo gastronómico
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Esta encuesta es anónima y toma solo 2 minutos.
          </p>
          <Button size="lg" className="mt-8 h-14 w-full text-lg" onClick={() => setPaso(0)}>
            Empezar
          </Button>
          <p className="mt-10 text-xs text-muted-foreground">
            Estudio de mercado · Grupo MK2111 · Marketing, 1er año
            <br />
            Universidad Nacional Casimiro Sotelo Montenegro, Nicaragua
          </p>
        </div>
      </Pantalla>
    );
  }

  const pregunta = PREGUNTAS[paso];

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
            onClick={() => responder(respuestas[pregunta.campo])}
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
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
