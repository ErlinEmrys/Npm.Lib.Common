export class ValidationHelper
{
	public static IsUrl( text: string | undefined | null )
	{
		if( !text )
		{
			return false;
		}

		if( !URL.canParse( text ) )
		{
			return false;
		}

		const url = new URL( text );
		return url.protocol === "http:" || url.protocol === "https:";
	}
}
