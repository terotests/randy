# Randy - pseudorandom number generator

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

## License

MIT.


















   

 


   
#### Class randy


- [random](README.md#randy_random)
- [randRaw](README.md#randy_randRaw)
- [setSeed](README.md#randy_setSeed)



   


   





   
# Class randy


The class has following internal singleton variables:
        
* _localSeed
        
        
### randy::constructor( seed )

```javascript

// default values from Numerical Recipes
this.m = 4294967296;
this.a = 1664525;
this.c = 1013904223;

if(seed) {
    // predicatable sequence
    this.setSeed( seed );
} else {
    // using double seed based on script's first runtime and the
    // JavaScript own pseudrandom sequence
    if(!_localSeed) _localSeed = ( new Date()).getTime();
    _localSeed++;
    this.setSeed( Math.random() * _localSeed);
}

```
        
### <a name="randy_random"></a>randy::random(t)


```javascript
return this.randRaw();
```

### <a name="randy_randRaw"></a>randy::randRaw(t)


```javascript
// lgc step
this.z = (this.a * this.z + this.c) % this.m;
return this.z / this.m;

```

### <a name="randy_setSeed"></a>randy::setSeed(val)


```javascript
this.z = val;
this.seed = val; 
```



   


   




