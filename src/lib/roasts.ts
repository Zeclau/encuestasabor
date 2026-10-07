export const TOPICS = [
  { id: 'todo', name: 'Todo el expediente', subtitle: 'Ningún tema se salva', emoji: '💀' },
  { id: 'ia', name: 'Pereza artificial', subtitle: 'Delegar hasta respirar', emoji: '🤖' },
  { id: 'marketing', name: 'Marketing de humo', subtitle: 'Mucho diseño, poca muestra', emoji: '📊' },
  { id: 'baleadas', name: 'La saga baleada', subtitle: 'Una tortilla. Toda una identidad.', emoji: '🌮' },
  { id: 'granada', name: 'Celebrity hunter', subtitle: 'Granada no es Hollywood', emoji: '📸' },
  { id: 'rgb', name: 'El misterio RGB', subtitle: 'La luz trabaja más que vos', emoji: '💡' },
] as const;
export type Topic = typeof TOPICS[number]['id'];
export type Roast = { id: string; title: string; text: string; topic: Topic; intensity: number; created: string };
const MATERIAL: Record<Exclude<Topic, 'todo'>, { title: string; lines: string[] }[]> = {
  ia: [
    { title: 'LA PEREZA TIENE UN CEO.', lines: ['Yasser, you built an entire web app to avoid clicking “Add question” ten times. That’s not working smarter; that’s ordering a forklift to move your fucking pencil.', 'Your workflow is asking one AI to do the work, another to explain it, and a third to roast you for it. At this point your only original contribution is the electricity bill.', 'You didn’t automate the assignment. You constructed a digital monument to not wanting to get out of your chair. Somewhere a progress bar has more drive than you.'] },
    { title: 'HASTA EL INSULTO, TERCERIZADO.', lines: ['You asked a coding assistant to bully you. Even your own roast needs a product manager, a deployment pipeline, and a goddamn loading state.', 'The bot keeps asking “What should we build?” and you keep submitting lore. You turned a software tool into a podcast with one unwilling subscriber.', 'Your next startup is probably an app that asks another app whether you should open an app. Congratulations: you’ve invented procrastination with infrastructure.'] },
  ],
  marketing: [
    { title: 'MUCHO FRONTEND. POCO FIELDWORK.', lines: ['Your classmates built Google Forms. You built a custom platform. Somehow the most sophisticated thing in your market research was the fucking border radius.', 'You gave fifteen responses the production budget of a national census. Your sample fits in a group chat; your development stack needs its own org chart.', 'You’re studying consumer behavior while conducting a groundbreaking experiment in avoiding consumers. That’s not market segmentation. That’s leaving the market unread.'] },
    { title: 'EL GRÁFICO NO HACE MILAGROS.', lines: ['You polished the charts like the right shade of orange could personally recruit respondents. A pie chart is not a summoning circle, bro.', 'You spent more time asking bots to multiply the sample than asking people to answer. That’s a marketing funnel with the customers removed.', 'A prettier spreadsheet doesn’t create more research. You put racing stripes on a shopping cart and called it a fucking Formula One team.'] },
  ],
  baleadas: [
    { title: 'CEO DE FRIJOLES & ASOCIADOS.', lines: ['You went to Honduras for football and came home with a flour tortilla as your entire character arc. The match ended; your baleada press conference apparently never will.', 'One good baleada and suddenly you’re delivering a TED Talk on beans. Your palate had an international exchange; your conversation topics got deported.', 'You explain the exact trip timeline like the tortilla is about to testify in court. Nobody requested the extended fucking director’s cut of breakfast.'] },
    { title: 'EL UNIVERSO CINEMÁTICO BALEADA.', lines: ['Three weeks before your nineteenth birthday: apparently the origin story requires a timestamp. Marvel has less documentation for its superheroes than you have for lunch.', 'You didn’t fall in love with a dish; you signed a lifelong publicity contract with refried beans. Every conversation somehow becomes sponsored content for Honduras.', 'Your market research asks about culinary preferences. Yours needs one checkbox: “Will make this about baleadas regardless of the question.”'] },
  ],
  granada: [
    { title: 'GRANADA NO ES UNA ALFOMBRA ROJA.', lines: ['Your girlfriend is busy, so you patrol Granada like celebrity sightings are Pokémon. Bro, that man isn’t Carlo Costly. He’s just trying to buy a fucking drink.', 'You scan every tourist with the concentration you won’t give your homework. Put that energy into research and your sample might finally outnumber your imagined celebrity encounters.', 'You went to visit your girlfriend and launched a side quest called “Recognize a vaguely famous forehead.” Even Google Maps couldn’t explain that itinerary.'] },
    { title: 'PAPARAZZI SIN PAPARAZZOS.', lines: ['Shin Fujiyama has a schedule. Harold Medina has a schedule. You have a sidewalk and unreasonable expectations.', 'You’re staring at strangers like Granada is an airport arrivals board for your personal meet-and-greet. It’s a town, not a fucking randomized celebrity loot box.', 'Your tourism strategy is ninety percent “What if that guy is someone?” Congratulations, marketing student: you’ve discovered people exist outdoors.'] },
  ],
  rgb: [
    { title: 'LA LUZ TIENE MÁS PERSONALIDAD.', lines: ['You turn on a purple bulb and suddenly you’re the mysterious protagonist. Bro, the only mystery is why your room has a nightclub lighting budget and an office productivity of zero.', 'That jawline angle has received more revisions than your assignment. Your front camera is working overtime while your to-do list watches in fucking disbelief.', 'You aren’t brooding. You’re sitting near an LED. Turn the light to normal and the entire cinematic universe becomes a guy avoiding homework.'] },
    { title: 'DIRECTOR DE FOTOGRAFÍA. NO DE TAREAS.', lines: ['You’ve mastered the moody selfie, the tilted chin, the dramatic shadow. Now try that experimental technique where you actually finish something.', 'The lighting says “enigmatic lead.” The browser tabs say “please do my assignment.” That’s not duality; that’s a fucking behind-the-scenes documentary.', 'Your room is serving music video. Your schedule is serving buffering. Even the bulb has a more consistent work ethic: you turn it on and it actually does its job.'] },
  ],
};
export function createRoast(topic: Topic, intensity: number, previousTitle?: string): Roast {
  const keys = Object.keys(MATERIAL) as Exclude<Topic, 'todo'>[];
  const selected = topic === 'todo' ? keys[Math.floor(Math.random() * keys.length)] ?? 'ia' : topic;
  const options = MATERIAL[selected].filter(item => item.title !== previousTitle);
  const material = options[Math.floor(Math.random() * options.length)] ?? MATERIAL[selected][0];
  if (!material) throw new Error('No hay roast disponible');
  return { id: crypto.randomUUID(), title: material.title, text: material.lines.slice(0, intensity < 35 ? 1 : intensity < 75 ? 2 : 3).join('\n\n'), topic: selected, intensity, created: new Date().toISOString() };
}