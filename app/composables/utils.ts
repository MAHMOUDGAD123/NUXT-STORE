/**
 * Wait for a (ms) duration
 * @param ms a duration in miliiseconds
 */
export const useWaitFor = async (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};
