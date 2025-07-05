import type { ILog, ILogSink } from "./Log";
import { LogLevel } from "./Log";

export class LogSink implements ILogSink
{
	_allLogs: ILog[] = [];

	ForeachLogs = ( callback: ( item: ILog ) => void ) =>
	{
		this._allLogs.forEach( ( fLog ) =>
		{
			callback( fLog );
		} );
	};

	Subscribe = ( log: ILog ) =>
	{
		this._allLogs.push( log );
		log.OnSubscribe?.();
		return () =>
		{
			const index = this._allLogs.indexOf( log, 0 );
			if( index > -1 )
			{
				this._allLogs = this._allLogs.splice( index, 1 );
				log.OnUnsubscribe?.();
			}
		};
	};

	Any = ( severity: LogLevel, message: string, ...data: any[] ) =>
	{
		this.ForeachLogs( ( fLog ) =>
		{
			try
			{
				switch( severity )
				{
					case LogLevel.Fatal:
						fLog.Fatal( message, ...data );
						break;
					case LogLevel.Error:
						fLog.Err( message, ...data );
						break;
					case LogLevel.Warning:
						fLog.Wrn( message, ...data );
						break;
					case LogLevel.Info:
						fLog.Inf( message, ...data );
						break;
					case LogLevel.Debug:
						fLog.Dbg( message, ...data );
						break;
					case LogLevel.Trace:
						fLog.Trc( message, ...data );
						break;
					case LogLevel.NotSpecified:
						fLog.Log( message, ...data );
						break;
				}
			}
			catch
			{
				// Error during logging - skip log implementation
			}
		} );
	};

	Fatal = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Fatal, message, ...data );
	};

	Err = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Error, message, ...data );
	};

	Wrn = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Warning, message, ...data );
	};

	Inf = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Info, message, ...data );
	};

	Dbg = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Debug, message, ...data );
	};

	Trc = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Trace, message, ...data );
	};

	Log = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.NotSpecified, message, ...data );
	};
}
