import type { ILog, ILogEnricher, ILogSink } from "./Log";
import { LogLevel } from "./Log";

export class LogSink implements ILogSink
{
	_allLogs: ILog[] = [];
	_allEnrichers: ILogEnricher[] = [];

	SubscribeLog = ( log: ILog ) =>
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

	SubscribeEnricher = ( enricher: ILogEnricher ) =>
	{
		this._allEnrichers.push( enricher );
		enricher.OnSubscribe?.();
		return () =>
		{
			const index = this._allEnrichers.indexOf( enricher, 0 );
			if( index > -1 )
			{
				this._allEnrichers = this._allEnrichers.splice( index, 1 );
				enricher.OnUnsubscribe?.();
			}
		};
	};

	CAny = ( condition: boolean, severity: LogLevel, message: string, ...data: any[] ) =>
	{
		if( condition )
		{
			this.Any( severity, message, ...data );
		}
	};

	Any = ( severity: LogLevel, message: string, ...data: any[] ) =>
	{
		this._allEnrichers.forEach( ( fEnricher ) =>
		{
			[ severity, message, ...data ] = fEnricher.Enrich( severity, message, ...data );
		} );

		this._allLogs.forEach( ( fLog ) =>
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

	CFatal = ( condition: boolean, message: string, ...data: any[] ) =>
	{
		if( condition )
		{
			this.Fatal( message, ...data );
		}
	};

	Fatal = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Fatal, message, ...data );
	};

	CErr = ( condition: boolean, message: string, ...data: any[] ) =>
	{
		if( condition )
		{
			this.Err( message, ...data );
		}
	};

	Err = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Error, message, ...data );
	};

	CWrn = ( condition: boolean, message: string, ...data: any[] ) =>
	{
		if( condition )
		{
			this.Wrn( message, ...data );
		}
	};

	Wrn = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Warning, message, ...data );
	};

	CInf = ( condition: boolean, message: string, ...data: any[] ) =>
	{
		if( condition )
		{
			this.Inf( message, ...data );
		}
	};

	Inf = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Info, message, ...data );
	};

	CDbg = ( condition: boolean, message: string, ...data: any[] ) =>
	{
		if( condition )
		{
			this.Dbg( message, ...data );
		}
	};

	Dbg = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Debug, message, ...data );
	};

	CTrc = ( condition: boolean, message: string, ...data: any[] ) =>
	{
		if( condition )
		{
			this.Trc( message, ...data );
		}
	};

	Trc = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.Trace, message, ...data );
	};

	CLog = ( condition: boolean, message: string, ...data: any[] ) =>
	{
		if( condition )
		{
			this.Log( message, ...data );
		}
	};

	Log = ( message: string, ...data: any[] ) =>
	{
		this.Any( LogLevel.NotSpecified, message, ...data );
	};
}
