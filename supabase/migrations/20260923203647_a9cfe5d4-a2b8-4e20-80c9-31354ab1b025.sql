CREATE TABLE public.respuestas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  q1 TEXT NOT NULL,
  q2 TEXT NOT NULL,
  q3 TEXT NOT NULL,
  q4 TEXT NOT NULL,
  q5 TEXT NOT NULL,
  q6 TEXT NOT NULL,
  q7 TEXT NOT NULL,
  q8 TEXT NOT NULL,
  q9 TEXT NOT NULL,
  q10 TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.respuestas TO anon;
GRANT SELECT, INSERT ON public.respuestas TO authenticated;
GRANT ALL ON public.respuestas TO service_role;

ALTER TABLE public.respuestas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede enviar una encuesta" ON public.respuestas FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Cualquiera puede ver los resultados" ON public.respuestas FOR SELECT TO anon, authenticated USING (true);