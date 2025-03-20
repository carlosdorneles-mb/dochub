export enum DocType {
  Link = 'link',
  Iframe = 'iframe',
  OpenApiRedoc = 'openapi-redoc',
  OpenApiSwagger = 'openapi-swagger',
  Markdown = 'markdown',
  Html = 'html'
}

export interface DocPagination {
  page: number;
  pageSize: number;
  pageTotal: number;
  total: number;
  items: Doc[];
}

export interface Doc {
  id: number;
  name: string;
  description: string;
  group: string;
  tags: string[];
  reference: Reference;
  actions: Action[];
}

export interface Reference {
  title: string;
  source: string;
  type: DocType;
}

export interface Action {
  name: string;
  icon: string;
  url: string;
}
