// Converts an array of arguments into a key value object

// Convenience helper function to find embedded number value in key
function getEmbeddedKeyValue( key ) {
	const index = key.search( /[0-9]/ );

	return index === -1 ? null : {
		key: key.slice( 0, index ),
		value: key.slice( index )
	};
}

module.exports = function( {
		booleanKeys = [],
		allowKeyGrouping = false,
		allowEmbeddedValues = false,
		args = process.argv.slice(2)
	} = {} ) {

	return args.reduce( ( argsObjInReduction, arg, index, args ) => {
		const isArgKey = arg.length > 0 && arg[0] === '-';
		let isArgValue = false;

		// Replace any previously undefined values for arg keys with current arg key and value,
		// or true if the current arg also starts with a dash and is presumed to be another key.
		argsObjInReduction = Object.keys( argsObjInReduction ).reduce( ( argsObjInUndefinedReplacement, argKey ) => {
			let argValue = argsObjInReduction[ argKey ];

			if( argValue === undefined ) {
				argValue = isArgKey ? true : arg ;
				isArgValue = !isArgKey ;
			}

			return Object.assign( {}, argsObjInUndefinedReplacement, { [ argKey ] : argValue } );
		}, {} );

		// If argument is not a key and not used as a value for previous key, collect it as an extra arg.
		if( !isArgKey && !isArgValue) {
			argsObjInReduction = Object.assign( {}, argsObjInReduction, {
				_args : ( argsObjInReduction._args || [] ).concat( arg )
			});
		}

		// If argument is a key, check to see if it has an embedded value.
		// If no embedded value, check to see if it's the last arg, or a group of keys, or a boolean key, and if so, set to true.
		// Otherwise set its value temporarily to undefined to be replaced later with next arg or true.
		if( isArgKey ) {
			const isArgGroupKey = allowKeyGrouping && arg.length > 2 && arg[0] === '-' && arg[1] !== '-';
			let trimmedKey = arg // remove leading dashes, trim space, and convert any embedded dashes or spaces to camelCase
				.replace( /^-*/g, '' )
				.trim()
				.replace(/(-+|\s+)\w/g, g => g[g.length - 1].toUpperCase() );
			let value ;
			const embeddedValueObject = allowEmbeddedValues && getEmbeddedKeyValue( trimmedKey );

			if( embeddedValueObject ) {
				trimmedKey = embeddedValueObject.key ;
				value = embeddedValueObject.value ;
			} else if( index === args.length - 1 || isArgGroupKey || booleanKeys.indexOf( trimmedKey ) !== -1 ) {
				value = true ;
			} else {
				value = undefined ;
			}

			const keys = trimmedKey ? isArgGroupKey ? Array.from( trimmedKey ) : [ trimmedKey ] : [] ;

			keys.forEach( key => {
				argsObjInReduction = Object.assign( {}, argsObjInReduction, {
					[ key ] : value
				});
			});
		}

		return argsObjInReduction ;
	}, { _args: [] } );
};
