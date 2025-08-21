import type { Card } from '../../types'
import styles from './index.module.scss'
type CardProps = {
  card: Card;
}
const Card = ({ card }: CardProps) => {

  return <div className={styles.card}>
    <span>{card.name}</span>
    <span>{card.description}</span>
  </div>
}
export default Card
