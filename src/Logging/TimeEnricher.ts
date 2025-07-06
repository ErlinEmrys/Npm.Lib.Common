import type { ILogEnricher, LogLevel } from "./Log";

export class TimeEnricher implements ILogEnricher
{
	_formattingOptions: Intl.DateTimeFormatOptions;

	constructor( formattingOptions?: Intl.DateTimeFormatOptions )
	{
		this._formattingOptions = formattingOptions || { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" };
	}

	Enrich = ( severity: LogLevel, message: string, ...data: any[] ) =>
	{
		const msg = `[${ new Date().toLocaleTimeString( "en-US", this._formattingOptions ) }]${ message }`;
		return [ severity, msg, ...data ];
	};
}
