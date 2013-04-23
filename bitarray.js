// #Bit Array 64
// * * *


// ###Constructor for 64-bit length bit array


// This data structure represents a bit array that can contain up to 64 bits
// represented in such way that the most significant bit is the first one
// and the least significant one is the last one.
// The basic constructor takes two 32-bit numbers, that represent the higher and
// the lower part of the 64-bit number
function BitArray64(high, low) {
	this._low = low;
	this._high = high;
}

// ###fast creation of bit arrays
BitArray64.ONE = new BitArray64(0, 1);
BitArray64.ZERO = new BitArray64(0, 0);
BitArray64.MAX = new BitArray64( 0xFFFFFFFF, 0xFFFFFFFF );


// ###shifting the bits in the array
// This shifts( moves ) the bits in the array to the left 
BitArray64.prototype.shiftLeft = function(positions) {
	if( positions === 0 ) {
		return this;
	} else if( positions >= 32 ) {
		return new BitArray64( this._low << ( 32 - positions ), 0 );
	} else {
		return new BitArray64( this._low >>> (32 - positions) ) | ( this._high << positions ), this._low << positions );
	}
}

// This shifts( moves ) the bits in the array to the left
BitArray64.prototype.shiftRight = function(positions) {
	if( positions === 0 ) {
		return this;
	} else if( positions >= 32 ) {
		return new BitArray64( 0, this._high >>> ( 32 - positions ) );
	} else {
		return new BitArray64( this._high >>> (32 - positions), this._high << (32 - positions) | this._low >>> positions );
	}
}

// performs bitwise AND
BitArray64.prototype.and = function(other) {
	return new BitArray64( this._high & other._high, this._low & other._low );
}

// performs bitwise OR
BitArray64.prototype.or = function(other) {
	return new BitArray64( this._high | other._high, this._low | other._low );
}

// performs bitwise XOR
BitArray64.prototype.xor = function(other) {
	return new BitArray64( this._high ^ other._high, this._low ^ other._low );
}

// flips the bits in the array, example 1001 -> 0110
BitArray64.prototype.flip = function() {
	return new BitArray64( ~this._high, ~this._low );
}

// performs bit negation in the array, example 1001 -> 0, 0 -> 1
BitArray64.prototype.not = function() {
	if( this._low === 0  || this._high === 0 ) {
		return new BitArray64( 0xFFFFFFFF, 0xFFFFFFFF );
	} else {
		return new BitArray64( 0, 0 );
	}
}

// zero test
BitArray64.prototype.isZero = function() {
	return ( this._high === 0 && this._low === 0 )
}

// equality test
BitArray64.prototype.equal = function(other) {
	return ( this._high === other._high && this._low === other._low );
}



// deep copy the array
BitArray64.prototype.clone = function() {
	return new BitArray64( this._high, this._low );
}


// creation from string
BitArray64.prototype.fromString = function(str) {
	if( str.length > 64 ) throw new Error("string parameter too long");

	var help = '0000000000000000000000000000000000000000';

	str = help.slice( 64 - str.length ) + str;

	return new BitArray64( parseInt( str.slice(0, 32) ), parseInt( str.slice(32) ) );
}

// string representation of the board
// opt_radix is optional and defaults to 2
BitArray64.prototype.toString = function(group_by, delimiter) {
	if( !group_by ) group_by = 32;
	if( !delimiter ) delimiter = ":";

	if( 64 % group_by > 0 ) throw new Error("group_by parameter should be a divider of number 64");

	var res1 = '0000000000000000000000000000000000000000';
	var res2 = '0000000000000000000000000000000000000000';

	var h = this._high.toString(2);
	var l = this._low.toString(2);

	var res = res1.slice(0, 32 - h.length) + h + res2.slice(0, 32 - l.length) + l;

	var ret = '';
	for( var i = 0; i < 64 / group_by; i++) {
		console.log('tu sam', i);
		ret += res.slice(i * group_by, (i+1) * group_by );

		if( i + 1 < (64 / group_by)  ) ret += delimiter;
	}

	return ret;
}





