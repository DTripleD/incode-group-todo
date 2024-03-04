export interface CardProps {
  item: {
    id: string;
    title: string;
    description: string;
    _id: string;
  };
  index: number;
  board: string | undefined;
}

export interface DashboardItemProps {
  board: { title: string; _id: string };
}

export type EntriesType = [
  columnId: string,
  column: {
    id: string;
    title: string;
    items: {
      id: string;
      title: string;
      description: string;
      _id: string;
    }[];
  }
];
