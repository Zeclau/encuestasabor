# Sabores de Nicaragua

Crea una app web de encuesta de estudio de mercado titulada "Turismo gastronómico". Contexto: proyecto académico de Marketing, 1er año, Grupo MK2111, Universidad Nacional Casimiro Sotelo Montenegro, Nicaragua. Todo el texto en español.







ENCUESTA (pública, sin login):



- Pantalla de bienvenida con título, una línea explicando que es anónima y toma 2 minutos, y botón "Empezar".



- 10 preguntas de opción múltiple (una sola respuesta), una por pantalla, con barra de progreso, botón "Siguiente" y opción de volver atrás.



- Pantalla final de agradecimiento.



- Diseño móvil primero, colores cálidos (naranja, rojo tomate, crema), tipografía amigable, botones grandes.







PREGUNTAS:



1. ¿Qué edad tiene? a) 15-19 b) 20-29 c) 30-45 d) Más de 45



2. ¿Con qué frecuencia viaja o se desplaza por comer algo específico? a) Nunca b) Rara vez (1 vez al año) c) Algunas veces (2-4 al año) d) Frecuentemente (5 o más)



3. ¿Qué tipo de experiencia gastronómica prefiere? a) Cerca (fritanga de barrio, comedor del mercado, cocinera de la esquina) b) Local (platos típicos de otra ciudad del país, como el vigorón o el quesillo) c) Internacional (probar la comida de otro país) d) Me da igual, mientras esté rico



4. ¿Cuánto gasta en promedio en una salida gastronómica turística (por persona)? a) Menos de C$200 b) C$200-500 c) C$500-1,000 d) Más de C$1,000



5. ¿Qué es lo que más influye en su decisión de visitar un lugar para comer? a) El precio b) La autenticidad y tradición c) Las recomendaciones y reseñas d) La presentación o lo "instagrameable"



6. ¿Dónde se informa sobre lugares gastronómicos? a) Redes sociales (TikTok, Instagram, Facebook) b) Familiares y amigos c) Google Maps y reseñas d) Medios tradicionales (TV, radio, prensa)



7. ¿Con quién suele hacer turismo gastronómico? a) Solo b) En pareja c) Con familia d) Con amigos



8. ¿Qué tan importante es que un lugar ofrezca comida tradicional auténtica? a) Nada importante b) Poco importante c) Importante d) Muy importante



9. ¿Pagaría más por una experiencia gastronómica guiada (ruta de sabores, cocinera local, tour por mercados)? a) No, nunca b) Solo si es poco más caro c) Sí, si la experiencia lo vale d) Sí, siempre busco ese tipo de experiencias



10. ¿Qué le haría falta para hacer más turismo gastronómico? a) Más información y promoción b) Precios más accesibles c) Mejor seguridad y transporte d) Más variedad de propuestas







BASE DE DATOS:



- Conecta lovable default databasedesde el inicio. Guarda cada encuesta completada como un registro con las 10 respuestas y la fecha.



- Evita envíos duplicados accidentales (deshabilitar el botón al enviar).







PANEL DE RESULTADOS (ruta /resultados, protegida sin contraseña)



- Total de encuestas recibidas.



- Un gráfico por pregunta (pastel o barras) con porcentajes y conteos.



- Un cruce interactivo: Pregunta 3 (tipo de experiencia) filtrada por Pregunta 1 (edad), en barras agrupadas.



- Botón "Exportar CSV" con todas las respuestas.



- Botón para copiar el link público de la encuesta.

-que tenga animaciones





Mantén el código simple y limpio, sin funciones extra que no pedí.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://encuestasabor.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c0eba8aa-bc05-4040-86b8-64370786d8bc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
