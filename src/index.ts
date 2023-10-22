'use strict';

import 'flowbite';
import flagsmith from 'flagsmith';
import type {
  IFlags,
  IRetrieveInfo,
  LoadingState,
} from './@types/flagsmith.types';

import './css/styles.css';

const environmentID = 'DCYBQgBcuRF86fmvgZc2os';

type FlagStateType = {
  flags: IFlags<string>;
  oldFlags: IFlags<string> | null;
};

let flagState: FlagStateType = {
  flags: {},
  oldFlags: {},
};

const setState = (state: FlagStateType): void => {
  flagState = state;
};

flagsmith.init({
  environmentID,
  cacheFlags: false,
  // cacheOptions: {ttl:0, skipAPI:false},
  // enableLogs: true,
  identity: 'flagsmith_sample_user',
  onChange: (
    oldFlags: IFlags<string> | null,
    params: IRetrieveInfo,
    loadingState: LoadingState,
  ) => {
    console.log('oldFlags: ' + JSON.stringify(oldFlags));
    console.log('params: ' + JSON.stringify(params));
    console.log('loadingState: ' + JSON.stringify(loadingState));

    const flags = flagsmith.getAllFlags();
    console.log('Received flags', flags);

    const changedState = {
      flags,
      oldFlags,
    };

    setState(changedState);
    processFlags(flags);
  },
});

const featureToggle: { [key: string]: () => void } = {
  'wallet-fortmatic': () => {
    const feature = flagState.flags['wallet-fortmatic'];
    const element = document.getElementById('wallet-fortmatic');

    if (element) {
      if (feature.enabled) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    }
  },
};

const processFlags = (flags: IFlags<string>): void => {
  Object.entries(flags).forEach(([featureName, feature]) => {
    featureToggle[featureName]();
  });
};
