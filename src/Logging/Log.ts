import { LogSink } from "./LogSink";

/**
 * Indicates the severity of a log message.
 *
 * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
 */
export enum LogLevel
{
	/** Log level for very low severity diagnostic messages. */
	None = 0, /** No log should be emitted */
	NotSpecified = 1, /** Log level isn't specified */
	Trace = 2, /** Log level for low severity diagnostic messages. */
	Debug = 3, /** Log level for informational diagnostic messages. */
	Info = 4, /** Log level for diagnostic messages that indicate a non-fatal problem. */
	Warning = 5, /** Log level for diagnostic messages that indicate a failure in the current operation. */
	Error = 6, /** Log level for diagnostic messages that indicate a common failure that will terminate current thread. */
	Fatal = 7, /** The highest possible log level. Program terminating events. */
}

export interface ISubscript
{
	OnSubscribe?: () => void;
	OnUnsubscribe?: () => void;
}

export interface ILog extends ISubscript
{
	Fatal: ( message: string, ...data: any[] ) => void;
	Err: ( message: string, ...data: any[] ) => void;
	Wrn: ( message: string, ...data: any[] ) => void;
	Inf: ( message: string, ...data: any[] ) => void;
	Dbg: ( message: string, ...data: any[] ) => void;
	Trc: ( message: string, ...data: any[] ) => void;

	Log: ( message: string, ...data: any[] ) => void;
}

export interface ILogEnricher extends ISubscript
{
	Enrich: ( severity: LogLevel, message: string, ...data: any[] ) => any[];
}

export interface ILogSink extends ILog
{
	SubscribeLog: ( log: ILog ) => () => void;
	SubscribeEnricher: ( enricher: ILogEnricher ) => () => void;

	Any: ( severity: LogLevel, message: string, ...data: any[] ) => void;
	CAny: ( condition: boolean, severity: LogLevel, message: string, ...data: any[] ) => void;

	CFatal: ( condition: boolean, message: string, ...data: any[] ) => void;
	CErr: ( condition: boolean, message: string, ...data: any[] ) => void;
	CWrn: ( condition: boolean, message: string, ...data: any[] ) => void;
	CInf: ( condition: boolean, message: string, ...data: any[] ) => void;
	CDbg: ( condition: boolean, message: string, ...data: any[] ) => void;
	CTrc: ( condition: boolean, message: string, ...data: any[] ) => void;

	CLog: ( condition: boolean, message: string, ...data: any[] ) => void;
}

export const Log = new LogSink();
( globalThis as any ).Log = Log;

declare global
{
	const Log: ILogSink;
}
