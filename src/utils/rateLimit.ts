export const rateLimit = (time: number) => {
  let lastCall = 0;

  return () => {
    const now = Date.now();
    if (now - lastCall < time) return false;
    lastCall = now;
    return true;
  };
};
