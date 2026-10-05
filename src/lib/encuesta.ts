export type Pregunta = {
  campo: keyof NuevaRespuesta;
  titulo: string;
  opciones: string[];
};

export const PREGUNTAS: Pregunta[] = [
  {
    campo: "q1",
    titulo: "🎂 ¿Cuántos años tenés?",
    opciones: ["15-19", "20-29", "30-45", "Más de 45"],
  },
  {
    campo: "q2",
    titulo: "🚗 ¿Qué tan seguido viajás o te movés para comer algo específico?",
    opciones: [
      "Nunca",
      "Rara vez (1 vez al año)",
      "Algunas veces (2-4 al año)",
      "Frecuentemente (5 o más)",
    ],
  },
  {
    campo: "q3",
    titulo: "🍽️ ¿Qué experiencia gastronómica te llama más?",
    opciones: [
      "Cerca (fritanga de barrio, comedor del mercado, cocinera de la esquina)",
      "Local (platos típicos de otra ciudad del país, como el vigorón o el quesillo)",
      "Internacional (probar la comida de otro país)",
      "Me da igual, mientras esté rico",
    ],
  },
  {
    campo: "q4",
    titulo: "💰 ¿Cuánto gastás en promedio por persona en una salida gastronómica turística?",
    opciones: ["Menos de C$200", "C$200-500", "C$500-1,000", "Más de C$1,000"],
  },
  {
    campo: "q5",
    titulo: "🔥 ¿Qué es lo que más te convence a la hora de ir a comer a un lugar?",
    opciones: [
      "El precio",
      "La autenticidad y tradición",
      "Las recomendaciones y reseñas",
      'La presentación o lo "instagrameable"',
    ],
  },
  {
    campo: "q6",
    titulo: "📱 ¿Dónde te enterás de los buenos lugares gastronómicos?",
    opciones: [
      "Redes sociales (TikTok, Instagram, Facebook)",
      "Familiares y amigos",
      "Google Maps y reseñas",
      "Medios tradicionales (TV, radio, prensa)",
    ],
  },
  {
    campo: "q7",
    titulo: "👥 ¿Con quién salís a hacer turismo gastronómico?",
    opciones: ["Solo", "En pareja", "Con familia", "Con amigos"],
  },
  {
    campo: "q8",
    titulo:
      "🥘 ¿Qué tan importante es para vos que un lugar ofrezca comida tradicional auténtica?",
    opciones: ["Nada importante", "Poco importante", "Importante", "Muy importante"],
  },
  {
    campo: "q9",
    titulo:
      "💸 ¿Pagarías más por una experiencia gastronómica guiada (ruta de sabores, cocinera local, tour por mercados)?",
    opciones: [
      "No, nunca",
      "Solo si es poco más caro",
      "Sí, si la experiencia lo vale",
      "Sí, siempre busco ese tipo de experiencias",
    ],
  },
  {
    campo: "q10",
    titulo: "🎯 ¿Qué te falta para hacer más turismo gastronómico?",
    opciones: [
      "Más información y promoción",
      "Precios más accesibles",
      "Mejor seguridad y transporte",
      "Más variedad de propuestas",
    ],
  },
];

export type Respuesta = {
  id: string;
  created_at: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
};

export type NuevaRespuesta = Omit<Respuesta, "id" | "created_at">;

export const pregunta = (indice: number) => PREGUNTAS[indice] as Pregunta;

export const EDADES = pregunta(0).opciones;
