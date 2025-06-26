import type { ILog, ILogSink } from "./Log";

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

	Err = ( message: string, ...data: any[] ) =>
	{
		this.ForeachLogs( ( fLog ) =>
		{
			fLog.Err( message, ...data );
		} );
	};

	Wrn = ( message: string, ...data: any[] ) =>
	{
		this.ForeachLogs( ( fLog ) =>
		{
			fLog.Wrn( message, ...data );
		} );
	};

	Log = ( message: string, ...data: any[] ) =>
	{
		this.ForeachLogs( ( fLog ) =>
		{
			fLog.Log( message, ...data );
		} );
	};

	Inf = ( message: string, ...data: any[] ) =>
	{
		this.ForeachLogs( ( fLog ) =>
		{
			fLog.Inf( message, ...data );
		} );
	};

	Dbg = ( message: string, ...data: any[] ) =>
	{
		this.ForeachLogs( ( fLog ) =>
		{
			fLog.Dbg( message, ...data );
		} );
	};
}
