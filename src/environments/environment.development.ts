import {IEnvironment} from '@models/environment.model';
import {version} from './version';
import {docs} from './docs';

export const environment: IEnvironment = {
  production: false,
  version,
  name: "DocHub",
  repository: "https://github.com/mercadobitcoin/dochub",
  docs,
};
