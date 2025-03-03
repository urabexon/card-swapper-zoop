
export interface CardType {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  created: Date;
}

export interface ColumnType {
  id: string;
  title: string;
  cards: CardType[];
}

export interface BoardType {
  id: string;
  title: string;
  columns: ColumnType[];
}
