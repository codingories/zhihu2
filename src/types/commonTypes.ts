interface RuleProp {
  type: 'required' | 'email';
  message: string;
}

export type RulesProp = RuleProp[];

interface ImageProps {
  _id?: string;
  url?: string;
}

export interface ColumnProps {
  _id: number,
  title: string,
  avatar?: ImageProps,
  description: string,
}
