/* eslint no-console: 0 */

import type { ILog } from "./Log";

export class ConsoleLogger implements ILog
{
	_origErr = console.error;
	_origWrn = console.warn;
	_origLog = console.log;
	_origInf = console.info;
	_origDbg = console.debug;

	OnSubscribe()
	{
		console.error = this.SubstituteConsole( Log.Err );
		console.warn = this.SubstituteConsole( Log.Wrn );
		console.log = this.SubstituteConsole( Log.Log );
		console.info = this.SubstituteConsole( Log.Inf );
		console.debug = this.SubstituteConsole( Log.Dbg );
	}

	OnUnsubscribe()
	{
		console.error = this._origErr;
		console.warn = this._origWrn;
		console.log = this._origLog;
		console.info = this._origInf;
		console.debug = this._origDbg;
	}

	SubstituteConsole( callback: ( message: string, ...data: any[] ) => void )
	{
		return ( data: any[] ) =>
		{
			callback( "External code:", ...data );
		};
	}

	Err( message: string, ...data: any[] )
	{
		this._origErr( `%c${ message }`, "background-color: transparent; padding: 1px;", ...data );
	}

	Wrn( message: string, ...data: any[] )
	{
		this._origWrn( `%c${ message }`, "background-color: transparent; padding: 1px;", ...data );
	}

	Log( message: string, ...data: any[] )
	{
		this._origLog( `%c${ message }`, "background-color: white; color: black;padding: 1px;", ...data );
	}

	Inf( message: string, ...data: any[] )
	{
		this._origInf( `%c${ message }`, "background-color: #92a143; color: black;padding: 1px;", ...data );
	}

	Dbg( message: string, ...data: any[] )
	{
		this._origDbg( `%c${ message }`, "background-color: #6da0cd; color: black; padding: 1px;", ...data );
	}
}
