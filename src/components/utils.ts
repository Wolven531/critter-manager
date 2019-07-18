const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
	// day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	// month: 'long',
	second: 'numeric',
	timeZone: 'UTC',
	timeZoneName: 'short',
	// weekday: 'long',
	// year: 'numeric'
}
const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', DATE_FORMAT_OPTIONS)
const MONEY_FORMAT_OPTIONS: Intl.NumberFormatOptions = { currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0, style: 'currency' }

// const rtf = new Intl.RelativeTimeFormat('en', {
// 	localeMatcher: 'best fit',// other values: 'lookup'
// 	numeric: 'always',// other values: 'auto'
// 	style: 'long'// other values: 'short' or 'narrow'
// })

/*
	@param number amount - The numeric money amount
	@returns string - The formatted version of the money
 */
const monify = (amount: number): string => amount.toLocaleString('en-US', MONEY_FORMAT_OPTIONS)

/*
	@param number timestamp - The numeric timestamp to convert
	@returns string - The formatted version of the timestamp using DATE_FORMATTER
 */
const prettifyTimestamp = (timestamp: number): string => DATE_FORMATTER.format(timestamp)

export { monify, prettifyTimestamp }
