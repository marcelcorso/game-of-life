# game of life 

I used rust, wasm and some ugly javascript to learn some rust and web assembly. 

most of the code is from the examples on https://wasm-bindgen.github.io/wasm-bindgen/

very little vibe coding was used.


## set up 

run some static web server on the root of the project

```
python3 -m http.server 8000
```

then go to http://localhost:8000 and should be good.

if you change the rust code on `src/lib.rs`... 

be sure to run 

`wasm-pack build --target web`

to build the thing again

