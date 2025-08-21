
import styles from './app.module.scss'
import { useState } from "react"
import { get_json } from "./api"
import type { Card } from './types';

type ScryfallAutocompleteSuggestions = {
  total_values: number;
  data: string[];
}
type ScryfallCard = {
  id: string;
  name: string;
  lang: string;
  mana_cost: string;
  power: string;
  toughness: string;
  oracle_text: string;
  image_uris: { png: string };
  type_line: string;

}
const CardSearch = () => {
  const [search, set_search] = useState('')
  const [suggestions, set_suggestions] = useState<string[]>([])
  const [selected_card, set_selected_card] = useState<Card | null>(null)
  const search_suggestions = async (new_value: string) => {
    set_search(new_value)
    if (new_value.length < 3) return

    const response = await get_json<ScryfallAutocompleteSuggestions>(`https://api.scryfall.com/cards/autocomplete?q=${new_value}`)
    if ('errors' in response) {
      return
    }
    set_suggestions(response.data)

  }
  const search_card = async (card_name: string) => {
    const response = await get_json<ScryfallCard>(`https://api.scryfall.com/cards/named?exact=${card_name}`)
    if ('errors' in response) {
      return
    }

    set_selected_card({
      id: response.id,
      name: response.name,
      type: response.type_line,
      description: response.oracle_text,
      image: response.image_uris.png,
    })

  }
  console.log(selected_card)


  return (
    <>
      <input
        type="search"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => search_suggestions(e.target.value)}
      />
      <div className={styles['card-search']}>
        {
          suggestions.map(
            suggestion => (
              <button
                key={suggestion}
                onClick={() => search_card(suggestion)}
              >
                {suggestion}
              </button>
            )
          )
        }
      </div>
      {
        selected_card !== null &&
        <img width={500} src={selected_card.image} />
      }
    </>
  )
}
function App() {

  return (
    <CardSearch />
  )
}

export default App
