// Converts an array of arguments into a key value object.
// Keys arguments start with a dash (setting true to an immediately preceding key arg).
// Key and value arguments are separated by a space.

module.exports = function( allowMultiKey = false, args = process.argv.slice(2) ) {
	return args.reduce( ( argsObjInReduction, arg, index, args ) => {
		const isArgKey = arg.length > 0 && arg[0] === '-';
		// const isArgSingleKey = !allowMultiKey || arg.length > 1 && arg[0] === '-' && arg[1] === '-';
		const isArgMultiKey = allowMultiKey && arg.length > 1 && arg[0] === '-' && arg[1] !== '-';
		let isArgValue = false;

		// replace any previously undefined values for arg keys with current arg key and value,
		// or true if the current arg also starts with a dash and is presumed to be another key
		argsObjInReduction = Object.keys( argsObjInReduction ).reduce( ( argsObjInUndefinedReplacement, argKey ) => {
			let argValue = argsObjInReduction[ argKey ];

			if( argValue === undefined ) {
				argValue = isArgKey ? true : arg;
				isArgValue = !isArgKey;
			}

			return Object.assign( {}, argsObjInUndefinedReplacement, { [ argKey ] : argValue } );
		}, {} );

		// if argument is not a key and not used as a value for previous key, collect it as an extra arg
		if( !isArgKey && !isArgValue) {
			argsObjInReduction = Object.assign( {}, argsObjInReduction, {
				_args : ( argsObjInReduction._args || [] ).concat( arg )
			});
		}

		// if argument is a key, assign it a temporary value of undefined to be replaced later with next arg or true,
		// or assign it to true if it's the last arg in list with no hope of being replaces later with true.
		if( isArgKey ) {
			const trimmedKey = arg.replace( /-/g, ' ' ).trim();
			const keys = trimmedKey ? isArgMultiKey ? Array.from( trimmedKey ) : [ trimmedKey ] : [] ;
			const value = index === args.length - 1 ? true : undefined ;

			keys.forEach( key => {
				argsObjInReduction = Object.assign( {}, argsObjInReduction, {
					[ key ] : value
				});
			});
		}

		return argsObjInReduction;
	}, {} );
}
