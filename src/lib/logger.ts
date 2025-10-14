/**
 * Logging Utility
 * Centralized logging for better debugging and monitoring
 */

// ============================================================================
// LOG LEVELS
// ============================================================================

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

// ============================================================================
// LOGGER CONFIGURATION
// ============================================================================

interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean;
  remoteEndpoint?: string | undefined;
}

const config: LoggerConfig = {
  level: process.env.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.DEBUG,
  enableConsole: true,
  enableRemote: process.env.NODE_ENV === 'production',
  remoteEndpoint: process.env.LOGGING_ENDPOINT,
};

// ============================================================================
// LOGGER CLASS
// ============================================================================

class Logger {
  private shouldLog(level: LogLevel): boolean {
    return level >= config.level;
  }

  private formatMessage(level: string, message: string, meta?: unknown): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level}: ${message}${metaStr}`;
  }

  private async sendToRemote(level: string, message: string, meta?: unknown) {
    if (!config.enableRemote || !config.remoteEndpoint) return;

    try {
      await fetch(config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level,
          message,
          meta,
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : 'server',
        }),
      });
    } catch (error) {
      console.error('Failed to send log to remote:', error);
    }
  }

  debug(message: string, meta?: unknown) {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const formatted = this.formatMessage('DEBUG', message, meta);
    
    if (config.enableConsole) {
      console.debug(formatted);
    }

    this.sendToRemote('DEBUG', message, meta);
  }

  info(message: string, meta?: unknown) {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const formatted = this.formatMessage('INFO', message, meta);
    
    if (config.enableConsole) {
      console.info(formatted);
    }

    this.sendToRemote('INFO', message, meta);
  }

  warn(message: string, meta?: unknown) {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const formatted = this.formatMessage('WARN', message, meta);
    
    if (config.enableConsole) {
      console.warn(formatted);
    }

    this.sendToRemote('WARN', message, meta);
  }

  error(message: string, error?: Error, meta?: unknown) {
    if (!this.shouldLog(LogLevel.ERROR)) return;

    const errorMeta = {
      ...(meta as Record<string, unknown>),
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : undefined,
    };

    const formatted = this.formatMessage('ERROR', message, errorMeta);
    
    if (config.enableConsole) {
      console.error(formatted);
    }

    this.sendToRemote('ERROR', message, errorMeta);
  }
}

// ============================================================================
// EXPORTED LOGGER INSTANCE
// ============================================================================

export const logger = new Logger();

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

export const log = {
  debug: (message: string, meta?: unknown) => logger.debug(message, meta),
  info: (message: string, meta?: unknown) => logger.info(message, meta),
  warn: (message: string, meta?: unknown) => logger.warn(message, meta),
  error: (message: string, error?: Error, meta?: unknown) => logger.error(message, error, meta),
};
