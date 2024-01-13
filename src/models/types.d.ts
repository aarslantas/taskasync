export type TaskType = {
  id: string;
  title: string;
  description: boolean;
  status: string;
};

export interface IcardData {
  card: TaskType;
  section: string;
}

export interface Icards {
  todo: TaskType[];
  doing: TaskType[];
  done: TaskType[];
}
