export interface Token {
  type: string;
  tag?: string;
  content?: string;
  children?: Token[] | null;
}
