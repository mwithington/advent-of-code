use std::env;
use std::fs;

fn main() {
    // --snip--
    let contents = fs::read_to_string("./input.txt")
        .expect("Should have been able to read the file");
    
    println!("With text:\n{contents}");
}
