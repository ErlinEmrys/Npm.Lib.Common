import { LogSink } from "./LogSink";

/**
 * Indicates the severity of a log message.
 *
 * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
 */
export enum LogLevel
{
	/** Log level for very low severity diagnostic messages. */
	NotSpecified = 0, /** Log level isn't specified */
	Trace = 1, /** Log level for low severity diagnostic messages. */
	Debug = 2, /** Log level for informational diagnostic messages. */
	Info = 3, /** Log level for diagnostic messages that indicate a non-fatal problem. */
	Warning = 4, /** Log level for diagnostic messages that indicate a failure in the current operation. */
	Error = 5, /** Log level for diagnostic messages that indicate a common failure that will terminate current thread. */
	Fatal = 6, /** The highest possible log level. Program terminating events. */
	None = 7, /** No log should be emitted */
}

export interface ILog
{
	Fatal: ( message: string, ...data: any[] ) => void;
	Err: ( message: string, ...data: any[] ) => void;
	Wrn: ( message: string, ...data: any[] ) => void;
	Inf: ( message: string, ...data: any[] ) => void;
	Dbg: ( message: string, ...data: any[] ) => void;
	Trc: ( message: string, ...data: any[] ) => void;

	Log: ( message: string, ...data: any[] ) => void;

	OnSubscribe?: () => void;
	OnUnsubscribe?: () => void;
}

export interface ILogSink extends ILog
{
	Subscribe: ( log: ILog ) => () => void;
	Any: ( severity: LogLevel, message: string, ...data: any[] ) => void;
}

export const Log = new LogSink();
( globalThis as any ).Log = Log;

declare global
{
	const Log: ILogSink;
}
