export const books = [
  { title: 'Itália à Mesa', place: 'Itália', recipes: 51, reference: 'Cheff Otto', tone: 'olive' },
  { title: 'França à Mesa', place: 'França', recipes: 48, reference: 'Érick Jacquin', tone: 'clay' },
  { title: 'Líbano à Mesa', place: 'Líbano', recipes: 48, reference: 'Leila Youssef', tone: 'olive' },
  { title: 'Japão à Mesa', place: 'Japão', recipes: 48, reference: 'Tsuyoshi Murakami e Jun Sakamoto', tone: 'ink' },
  { title: 'Brasil à Mesa', place: 'Brasil', recipes: 48, reference: 'Alex Atala', tone: 'forest' },
  { title: 'México à Mesa', place: 'México', recipes: 48, reference: 'Luana Sabino e restaurante Metzi', tone: 'clay' },
  { title: 'Índia à Mesa', place: 'Índia', recipes: 36, reference: 'Alexandre Sharin', tone: 'spice' },
  { title: 'Espanha à Mesa', place: 'Espanha', recipes: 36, reference: 'Óscar Bosch', tone: 'clay' },
  { title: 'África à Mesa', place: 'Culinárias africanas', recipes: 36, reference: 'Rikler Makabu Sekelembe', tone: 'spice' },
  { title: 'Afro-Brasil à Mesa', place: 'Tradição afro-brasileira', recipes: 36, reference: 'Kelma Zenaide', tone: 'forest' },
  { title: 'Argentina à Mesa', place: 'Argentina', recipes: 36, reference: 'Francis Mallmann', tone: 'ink' },
  { title: 'Estados Unidos à Mesa', place: 'Estados Unidos', recipes: 36, reference: 'Anderson Lívio', tone: 'clay' },
  { title: 'Britain à Mesa', place: 'Reino Unido', recipes: 36, reference: 'Heston Blumenthal', tone: 'olive' },
  { title: 'Coreia à Mesa', place: 'Coreia', recipes: 36, reference: 'João Son', tone: 'clay' },
  { title: 'China à Mesa', place: 'China', recipes: 36, reference: 'Jiang Pu', tone: 'forest' },
  { title: 'Peru à Mesa — Volume I', place: 'Peru', recipes: 36, reference: 'Enrique Paredes', tone: 'spice' },
] as const;
export const countryBooks = books.map((book, index) => ({ ...book, index })).filter(book => book.index !== 8 && book.index !== 9);
export const traditionBooks = books.map((book, index) => ({ ...book, index })).filter(book => book.index === 8 || book.index === 9);
