'use strict';

import flagsmith from 'flagsmith';
import type {
  IFlags,
  IRetrieveInfo,
  LoadingState,
} from './@types/flagsmith.types';

const environmentID = 'DCYBQgBcuRF86fmvgZc2os';
const feature_name = 'test_feature';

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

    const has_feature = flagsmith.hasFeature(feature_name);

    console.log('has_feature: ' + has_feature);

    if (has_feature) {
      const value = flagsmith.getValue(feature_name);
      console.log('value = ' + value);

      if (oldFlags) {
        // Check whether value has changed
        const value_old =
          oldFlags[feature_name] && oldFlags[feature_name].value;

        if (value !== value_old) {
          // Value has changed, do something here
        }
      }
    }
  },
});
