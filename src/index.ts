'use strict';

import flagsmith from 'flagsmith';
import type {
  IFlags,
  IRetrieveInfo,
  LoadingState,
} from './@types/flagsmith.types';

const environmentID = 'DCYBQgBcuRF86fmvgZc2os';

flagsmith.init({
  environmentID,
  cacheFlags: false,
  // cacheOptions: {ttl:0, skipAPI:false},
  // enableLogs: true,
  // enableAnalytics: true,
  identity: 'flagsmith_sample_user',
  onChange: (
    oldFlags: IFlags | null,
    params: IRetrieveInfo,
    loadingState: LoadingState,
  ) => {
    console.log('oldFlags: ' + JSON.stringify(oldFlags));
    console.log('params: ' + JSON.stringify(params));
    console.log('loadingState: ' + JSON.stringify(loadingState));

    const flags = flagsmith.getAllFlags();
    console.log('Received flags', flags);

    processFlags(flags, oldFlags);
  },
});

const processFlags = (flags: IFlags<string>, oldFlags: IFlags | null): void => {
  Object.entries(flags).forEach(([featureName, feature]) => {
    console.log('featureName: ' + featureName);
    const hasFeature = flagsmith.hasFeature(featureName);
    console.log('hasFeature: ' + hasFeature);

    const enabled = feature.enabled;
    console.log('enabled: ' + enabled);

    if (hasFeature) {
      const value = flagsmith.getValue(featureName);
      console.log('value = ' + value);

      if (value != null && oldFlags) {
        // Check whether value has changed
        const valueOld = oldFlags[featureName] && oldFlags[featureName].value;

        if (value !== valueOld) {
          // Value has changed, do something here
        }
      }
    }
  });
};
