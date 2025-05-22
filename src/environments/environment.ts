import {IEnvironment} from '@models/environment.model';
import {version} from './version';
import {docs} from './docs';

export const environment: IEnvironment = {
  production: true,
  version,
  name: "DocHub",
  baseUrl: "https://mercadobitcoin.github.io/dochub/#",
  repository: "https://github.com/mercadobitcoin/dochub",
  docs,
};
