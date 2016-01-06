export function initSquareArray(sideLength) {
    let square = [];

    for (let i = 0; i < sideLength; i++) {
        square[i] = [];
        for (let j = 0; j < sideLength; j++) {
            square[i][j] = Math.round(Math.random());
        }
    }

    return square;
}

export function updateData(data) {
    let result = [];

    /**
     * Return amount of alive neighbours for a cell
     */
    function _countNeighbours(x, y) {
        var amount = 0;

        function _isFilled(x, y) {
            return data[x] && data[x][y];
        }

        if (_isFilled(x-1, y-1)) amount++;
        if (_isFilled(x,   y-1)) amount++;
        if (_isFilled(x+1, y-1)) amount++;
        if (_isFilled(x-1, y  )) amount++;
        if (_isFilled(x+1, y  )) amount++;
        if (_isFilled(x-1, y+1)) amount++;
        if (_isFilled(x,   y+1)) amount++;
        if (_isFilled(x+1, y+1)) amount++;

        return amount;
    }

    data.forEach(function(row, x) {
        result[x] = [];
        row.forEach(function(cell, y) {
            var alive = 0,
                count = _countNeighbours(x, y);

            if (cell > 0) {
                alive = count === 2 || count === 3 ? 1 : 0;
            } else {
                alive = count === 3 ? 1 : 0;
            }

            result[x][y] = alive;
        });
    });

    return result;
}
