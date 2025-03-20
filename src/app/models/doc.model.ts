export enum DocTypeEnum {
  Link = 'link',
  Iframe = 'iframe',
  OpenApiRedoc = 'openapi-redoc',
  OpenApiSwagger = 'openapi-swagger',
  Markdown = 'markdown',
  Html = 'html'
}

export interface IDocPagination {
  page: number;
  pageSize: number;
  pageTotal: number;
  total: number;
  items: IDoc[];
}

export interface IDoc {
  id: number;
  name: string;
  description: string;
  group: string;
  tags: string[];
  reference: IReference;
  actions: IAction[];
}

export interface IReference {
  title: string;
  type: DocTypeEnum;
  source: string;
}

export interface IAction {
  name: string;
  icon: string;
  url: string;
}
