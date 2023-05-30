var board;
var score = 0;
var rows = 4;
var columns = 4;


window.onload = function () {
    start_game();
}

function get_tile_id(r, c) {
    return r.toString() + "-" + c.toString();
}


function start_game() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = get_tile_id(r, c);
            let num = board[r][c];
            update_tile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    set_two();
    set_two();
}

function update_tile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        }
        else {
            tile.classList.add("x8192");
        }
    }
}

function has_empty_tile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function set_two() {

    if (!has_empty_tile()) {
        return;
    }

    let found = false;

    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(get_tile_id(r, c));
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }

    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slide_left();
        set_two();
    }
    if (e.code == "ArrowRight") {
        slide_right();
        set_two();

    }
    if (e.code == "ArrowUp") {
        slide_up();
        set_two();

    }
    if (e.code == "ArrowDown") {
        slide_down();
        set_two();

    }
    document.getElementById("score").innerText = score.toString();
})

function clear_zeroes(row) {
    return row.filter(num => num > 0);
}

function slide(row) {
    row = clear_zeroes(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = clear_zeroes(row);

    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slide_left() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(get_tile_id(r, c));
            update_tile(tile, board[r][c]);

        }
    }
}


function slide_up() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(get_tile_id(r, c));
            update_tile(tile, board[r][c]);

        }
    }
}


function slide_down() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(get_tile_id(r, c));
            update_tile(tile, board[r][c]);

        }
    }
}


function slide_right() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();

        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(get_tile_id(r, c));
            update_tile(tile, board[r][c]);

        }
    }
}