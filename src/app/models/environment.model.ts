import {IDoc} from '@models/doc.model';

export interface IEnvironment {
  name: string;
  baseUrl: string;
  repository: string;
  production: boolean;
  version: string;
  docs: IDoc[];
}
