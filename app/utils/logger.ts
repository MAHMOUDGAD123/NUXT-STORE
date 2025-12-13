const getTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
};

interface LoggerOptions {
  tag?: 'Nuxt' | 'App' | (string & {});
  side?: 'client' | 'server' | 'both';
}

export const createLogger = (options?: LoggerOptions) => {
  if (!import.meta.dev) return null;

  const isServer = import.meta.server;
  const { tag, side } = {
    tag: options?.tag ?? 'Nuxt',
    side: options?.side ?? 'both',
  } satisfies LoggerOptions;

  const tagStyles = 'padding: 2px 8px; border-radius: 3px; font-weight: bold;';
  const browserStyles = {
    log: `background: #6b7280; color: white; ${tagStyles}`,
    info: `background: #3b82f6; color: white; ${tagStyles}`,
    success: `background: #10b981; color: white; ${tagStyles}`,
    warn: `background: #f59e0b; color: black; ${tagStyles}`,
    error: `background: #ef4444; color: white; ${tagStyles}`,
    debug: `background: #8b5cf6; color: white; ${tagStyles}`,
  };

  const c = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[90m',
    white: '\x1b[37m',
    black: '\x1b[30m',
    bgGray: '\x1b[100m',
    bgBlue: '\x1b[44m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgRed: '\x1b[41m',
    bgMagenta: '\x1b[45m',
  };

  const serverTag = (bg: string, text = c.white) => {
    return `${bg}${text}${c.bold} ${tag} ${c.reset}`;
  };

  const serverLoger = {
    log: (...args: unknown[]) => console.log(serverTag(c.bgGray), ...args),
    info: (...args: unknown[]) => console.info(serverTag(c.bgBlue), ...args),
    success: (...args: unknown[]) => console.log(serverTag(c.bgGreen), ...args),
    warn: (...args: unknown[]) => console.warn(serverTag(c.bgYellow, c.black), ...args),
    error: (...args: unknown[]) => console.error(serverTag(c.bgRed), ...args),
    debug: (...args: unknown[]) =>
      import.meta.dev && console.debug(serverTag(c.bgMagenta), ...args),
  };

  const clientLogger = {
    log: (...args: unknown[]) => !isServer && console.log(`%c${tag}`, browserStyles.log, ...args),
    info: (...args: unknown[]) =>
      !isServer && console.info(`%c${tag}`, browserStyles.info, ...args),
    success: (...args: unknown[]) =>
      !isServer && console.log(`%c${tag}`, browserStyles.success, ...args),
    warn: (...args: unknown[]) =>
      !isServer && console.warn(`%c${tag}`, browserStyles.warn, ...args),
    error: (...args: unknown[]) =>
      !isServer && console.error(`%c${tag}`, browserStyles.error, ...args),
    debug: (...args: unknown[]) =>
      import.meta.dev && !isServer && console.debug(`%c${tag}`, browserStyles.debug, ...args),
  };

  switch (side) {
    case 'server': {
      return serverLoger;
    }
    case 'both': {
      return isServer ? serverLoger : clientLogger;
    }
    case 'client': {
      return clientLogger;
    }
  }
};
