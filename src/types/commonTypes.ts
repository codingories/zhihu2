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
  _id: string,
  title: string,
  avatar?: ImageProps,
  description: string,
}

export interface PostProps {
  _id: string;
  title: string;
  content: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
  excerpt?: string;
}
