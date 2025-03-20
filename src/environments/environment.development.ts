import {environment as common} from './environment.common';
import {IEnvironment} from './environment.interface';

export const environment: IEnvironment = {
  ...common,
  production: false,
};
