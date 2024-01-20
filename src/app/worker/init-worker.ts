export const initWorker = (): Worker => {
  if (typeof Worker !== 'undefined') {
    return new Worker(new URL('./data.worker', import.meta.url));
  } else {
    throw 'Web workers are not supported in this environment.';
  }
};
