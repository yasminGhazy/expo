'use strict';

import React from 'react';
import * as FacebookAds from 'expo-ads-facebook';
import { mountAndWaitForWithTimeout } from './helpers';

const { BannerAd, AdSettings } = FacebookAds;

try {
  AdSettings.addTestDevice(AdSettings.currentDeviceHash);
} catch (e) {
  // AdSettings may not be available, shrug
}

export const name = 'BannerAd';

// If tests didn't pass check placementId
// Probably test won't pass if you are not logged into account connected
// with placement id.

const placementId = '629712900716487_662949307392846';

export function test(t, { setPortalChild, cleanupPortal }) {
  t.describe('FacebookAds.BannerView', () => {
    t.afterEach(async () => await cleanupPortal());

    t.describe('when given a valid placementId', () => {
      t.it("doesn't call onError", async () => {
        try {
          await mountAndWaitForWithTimeout(
            <BannerAd type="large" placementId={placementId} />,
            'onError',
            setPortalChild,
            1000
          );
        } catch (e) {
          t.expect(e.name).toEqual('TimeoutError');
        }
      });
    });

    t.describe('when given no placementId', () => {
      t.it(
        'calls onError',
        async () => {
          const error = await mountAndWaitForWithTimeout(
            <BannerAd type="large" placementId="" />,
            'onError',
            setPortalChild,
            30000
          );
          t.expect(error).toBeDefined();
        },
        30000
      );
    });
  });
}
