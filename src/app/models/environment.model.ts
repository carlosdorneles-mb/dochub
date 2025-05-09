import {IDoc} from '@models/doc.model';

export interface IEnvironment {
  name: string;
  repository: string;
  production: boolean;
  docs: IDoc[];
}
