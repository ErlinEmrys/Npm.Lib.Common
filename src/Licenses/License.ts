export enum LicenseDataType
{
	// Enum error
	EnumNullError = 0,

	// License error
	Error = 1,

	// Plain text
	Text = 2,

	// Short expression
	Expression = 3,

	// Web url
	Url = 4,
}

export interface ILicensePackage
{
	Name: string;
	Version?: string;
	Authors?: string;
	Copyright?: string;
	Homepage?: string;
	LicenseDataType: LicenseDataType;
	License?: string;
	Notice?: string;
	RelatedPacakges?: string[];
}

export interface ILicenseData
{
	ProjectLicense?: string;
	Packages: ILicensePackage[];
}
