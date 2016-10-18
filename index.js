// Converts an array of arguments into a key value object, treating an arg starting with dash as a key.
// Still presumes that arguments are separated from keys by a space, but that's not too bad anymore.
// Presumes any argument starting with a dash is a key and can't be an value to previous key.
function commandLineParser( args = process.argv.slice(2) ) {
	return args.reduce( ( argsObjInReduction, arg, index, args ) => {
		const isArgKey = arg[0] === '-';
		let isArgValue = false;

		// replace any previously undefined values for arg keys with current arg key and value,
		// or true if they current arg also starts with a dash and is presumed to be another arg key
		argsObjInReduction = Object.keys( argsObjInReduction ).reduce( ( argsObjInUndefinedReplacement, argKey ) => {
			let argValue = argsObjInReduction[ argKey ];

			if( argValue === undefined ) {
				argValue = isArgKey ? true : arg;
				isArgValue = !isArgKey;
			}

			return Object.assign( argsObjInUndefinedReplacement, { [ argKey ] : argValue } );
		}, {} );

		// if argument is not a key and not used as a value for previous key, collect it as an extra arg
		if( !isArgKey && !isArgValue) {
			argsObjInReduction = Object.assign( argsObjInReduction, {
				_extraArgs : ( argsObjInReduction._extraArgs || [] ).concat( arg )
			});
		}

		// if argument is a key, assign it a temporary value of undefined to be replaced later with next arg or true,
		// or assign it to true if it's the last arg in list with no hope of being replaces later with true.
		if( isArgKey ) {
			argsObjInReduction = Object.assign( argsObjInReduction, {
				[ arg.slice(1) ] : index === args.length - 1 ? true : undefined
			});
		}

		return argsObjInReduction;
	}, {} );
}

module.exports = commandLineParser;
