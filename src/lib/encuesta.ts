export type Pregunta = {
  campo: string;
  titulo: string;
  opciones: string[];
};

export const PREGUNTAS: Pregunta[] = [
  {
    campo: "q1",
    titulo: "¿Qué edad tiene?",
    opciones: ["15-19", "20-29", "30-45", "Más de 45"],
  },
  {
    campo: "q2",
    titulo: "¿Con qué frecuencia viaja o se desplaza por comer algo específico?",
    opciones: [
      "Nunca",
      "Rara vez (1 vez al año)",
      "Algunas veces (2-4 al año)",
      "Frecuentemente (5 o más)",
    ],
  },
  {
    campo: "q3",
    titulo: "¿Qué tipo de experiencia gastronómica prefiere?",
    opciones: [
      "Cerca (fritanga de barrio, comedor del mercado, cocinera de la esquina)",
      "Local (platos típicos de otra ciudad del país, como el vigorón o el quesillo)",
      "Internacional (probar la comida de otro país)",
      "Me da igual, mientras esté rico",
    ],
  },
  {
    campo: "q4",
    titulo: "¿Cuánto gasta en promedio en una salida gastronómica turística (por persona)?",
    opciones: ["Menos de C$200", "C$200-500", "C$500-1,000", "Más de C$1,000"],
  },
  {
    campo: "q5",
    titulo: "¿Qué es lo que más influye en su decisión de visitar un lugar para comer?",
    opciones: [
      "El precio",
      "La autenticidad y tradición",
      "Las recomendaciones y reseñas",
      'La presentación o lo "instagrameable"',
    ],
  },
  {
    campo: "q6",
    titulo: "¿Dónde se informa sobre lugares gastronómicos?",
    opciones: [
      "Redes sociales (TikTok, Instagram, Facebook)",
      "Familiares y amigos",
      "Google Maps y reseñas",
      "Medios tradicionales (TV, radio, prensa)",
    ],
  },
  {
    campo: "q7",
    titulo: "¿Con quién suele hacer turismo gastronómico?",
    opciones: ["Solo", "En pareja", "Con familia", "Con amigos"],
  },
  {
    campo: "q8",
    titulo: "¿Qué tan importante es que un lugar ofrezca comida tradicional auténtica?",
    opciones: ["Nada importante", "Poco importante", "Importante", "Muy importante"],
  },
  {
    campo: "q9",
    titulo:
      "¿Pagaría más por una experiencia gastronómica guiada (ruta de sabores, cocinera local, tour por mercados)?",
    opciones: [
      "No, nunca",
      "Solo si es poco más caro",
      "Sí, si la experiencia lo vale",
      "Sí, siempre busco ese tipo de experiencias",
    ],
  },
  {
    campo: "q10",
    titulo: "¿Qué le haría falta para hacer más turismo gastronómico?",
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
} & Record<string, string>;
