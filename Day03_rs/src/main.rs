use std::fs;
use std::time::Instant;

fn run_slope(map: Vec<&str>, x_slope: usize, y_slope: usize) -> u64 {
    let mut x: usize = 0;
    let mut y: usize = 0;

    let x_wrap = map[0].len();

    let mut trees = 0;

    for _ in 0..map.len() {
        if y > map.len() {
            break;
        }

        let point = map[y].chars().nth(x % x_wrap).unwrap();
        if point == '#' {
            trees += 1
        }

        x += x_slope;
        y += y_slope;
    }

    trees
}

fn main() {
    // Part 1
    let p1 = Instant::now();
    let map = fs::read_to_string("./input.txt").unwrap();
    let a = run_slope(map.split('\n').collect(), 3, 1);
    println!("{}, {}µs", a, p1.elapsed().as_micros());

    // Part 2
    let p2 = Instant::now();
    let a: u64 = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]
        .iter()
        .map(|(x_slope, y_slope)| run_slope(map.split('\n').collect(), *x_slope, *y_slope))
        .product();
    println!("{}, {}µs", a, p2.elapsed().as_micros());
}
