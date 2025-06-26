import { LogSink } from "./LogSink";

export interface ILog
{
	Err: ( message: string, ...data: any[] ) => void;
	Wrn: ( message: string, ...data: any[] ) => void;
	Log: ( message: string, ...data: any[] ) => void;
	Inf: ( message: string, ...data: any[] ) => void;
	Dbg: ( message: string, ...data: any[] ) => void;

	OnSubscribe?: () => void;
	OnUnsubscribe?: () => void;
}

export interface ILogSink extends ILog
{
	Subscribe: ( log: ILog ) => () => void;
}

export const Log = new LogSink();
( globalThis as any ).Log = Log;

declare global
{
	const Log: ILogSink;
}
