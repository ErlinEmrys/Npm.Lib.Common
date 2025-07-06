/* eslint-disable unused-imports/no-unused-vars */

import type { ILog } from "./Log";

export class NullLogger implements ILog
{
	public static Instance: NullLogger = new NullLogger();

	Fatal( message: string, ...data: any[] )
	{
	}

	Err( message: string, ...data: any[] )
	{
	}

	Wrn( message: string, ...data: any[] )
	{
	}

	Log( message: string, ...data: any[] )
	{
	}

	Inf( message: string, ...data: any[] )
	{
	}

	Dbg( message: string, ...data: any[] )
	{
	}

	Trc( message: string, ...data: any[] )
	{
	}
}
