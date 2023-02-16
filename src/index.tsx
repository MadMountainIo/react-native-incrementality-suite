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
}: TrackEventParams): Promise<any> {
  const url = `https://${dataCenter}.creativecdn.com/tags?type=none&ckt=${cookieType}&ck=${cookie}&id=pr_${hash}_custom_${tagName}_${tagValue}&event_parameters=${multiParamJSON}&v=${appVersion}`
  const url2 = `https://users-events-lxvi645jpa-lm.a.run.app?type=none&ckt=${cookieType}&ck=${cookie}&id=pr_${hash}_custom_${tagName}_${tagValue}&event_parameters=${multiParamJSON}&v=${appVersion}`

  const request1 = new Promise((resolve, reject) => {
    return fetch(url, {
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

  const request2 = new Promise((resolve, reject) => {
    return fetch(url2, {
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

  return Promise.all([request1, request2])
}

export type IncrementalitySuiteTrackEventParams = TrackEventParams;
