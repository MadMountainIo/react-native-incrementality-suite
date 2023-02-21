import type { TrackEventParams } from "./internal/types";

export function trackEvent({
  appVersion,
  cookie,
  cookieType,
  dataCenter,
  hash,
  multiParamJSON,
  tagName,
  tagValue,
  trackOnlyUserEvents
}: TrackEventParams): Promise<any> {
  const creativeCDNURL = `https://${dataCenter}.creativecdn.com/tags?type=none&ckt=${cookieType}&ck=${cookie}&id=pr_${hash}_custom_${tagName}_${tagValue}&event_parameters=${multiParamJSON}&v=${appVersion}`
  const usersEventsURL = `https://users-events-lxvi645jpa-lm.a.run.app?type=none&ckt=${cookieType}&ck=${cookie}&id=pr_${hash}_custom_${tagName}_${tagValue}&event_parameters=${multiParamJSON}&v=${appVersion}`

  const creativeCDNRequest = new Promise((resolve, reject) => {
    if (!trackOnlyUserEvents) {
      return fetch(creativeCDNURL, {
        method: 'POST',
        body: JSON.stringify({})
      })
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
    }
    return reject();
  });

  const usersEventsRequest = new Promise((resolve, reject) => {
    return fetch(usersEventsURL, {
      method: 'POST',
      body: JSON.stringify({})
    })
    .then(response => {
      return resolve(response);
    })
    .catch(error => {
      return reject(error);
    });
  });

  return Promise.all([trackOnlyUserEvents ? '' : creativeCDNRequest, usersEventsRequest])
}

export type IncrementalitySuiteTrackEventParams = TrackEventParams;
