import {IEnvironment} from '@models/environment.model';
import {environment as docs} from './environment.docs';

export const environment: IEnvironment = {
  production: false,
  name: "DocHub",
  repository: "https://github.com/mercadobitcoin/dochub",
  docs,
};
