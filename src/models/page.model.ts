export type PageNode = {
  name: string;
  children: PageNode[] | null;
  link: string | null
}