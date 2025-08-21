export type Card = {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
}

export type Deck = {
  id: string;
  name: string;
  cards_ids_list: string[];
}
