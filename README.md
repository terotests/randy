# Randy - pseudo random number generator

With randy you can initialize seed and create predictable or unpredicatable randon number sequence, which ever pleases you most.
Based on Linear congruential generator implementations 

https://en.wikipedia.org/wiki/Linear_congruential_generator

## Warning 

LCGs should not be used for applications where high-quality randomness is critical. For example, it is not suitable for a Monte Carlo simulation because of the serial correlation (among other things). They also must not be used for cryptographic applications; see cryptographically secure pseudo-random number generator for more suitable generators. If a linear congruential generator is seeded with a character and then iterated once, the result is a simple classical cipher called an affine cipher; this cipher is easily broken by standard frequency analysis.

## Usage 

```javascript

// initialize based on timestamp value
var generator = randy();

// use
var value = generator.random();

```

## Using with custom seed

```javascript
// Generate predicatable values
var generator = randy(123456);

```

## Initialize with custom cenerator

You can initialize with custom parameters to emulate behaviour of some known random number generators:

https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use

```javascript
// Generate predicatable values
var generator = randy(null, 1 << 31 , 1103515245, 12345);

```

