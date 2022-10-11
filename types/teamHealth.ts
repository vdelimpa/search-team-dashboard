export interface DailyHealthScore {
  numberOfPeople: number;
  date: any;
  dailyScore: number;
  positive: number;
  neutral: number;
  negative: number;
}

export interface TableTeamHealth {
  id: string;
  date: any;
  dailyScore: number;
  numberOfPeople: number;
}
