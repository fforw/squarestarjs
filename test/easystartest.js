const assert = require("power-assert")
const EasyStar = require("../src/easystar")

describe("SquareStar.js", function () {

    //beforeEach(function() { });

    it("It should find a path successfully with corner cutting enabled.", function (done) {
        const easyStar = new EasyStar.js();
        easyStar.enableDiagonals();
        const map = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 1
        ];

        
        easyStar.setGrid(map);

        easyStar.enableCornerCutting();

        easyStar.setAcceptableTiles([1]);

        easyStar.findPath(0, 0, 4, 4, path => {

            assert(path !== null);

            assert(path.length === 5)

            assert(path[0].x === 0);
            assert(path[0].y === 0);
            assert(path[3].x === 3);
            assert(path[3].y === 3);
            done()
        });

        easyStar.calculate();

    });

    it("It should fail to find a path successfully with corner cutting disabled.", function (done) {
        var easyStar = new EasyStar.js();
        easyStar.enableDiagonals();
        var map = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 1
        ];

        easyStar.setGrid(map);

        easyStar.disableCornerCutting();

        easyStar.setAcceptableTiles([1]);

        easyStar.findPath(0, 0, 4, 4, onPathFound);

        easyStar.calculate();


        function onPathFound(path)
        {
            assert(path === null);
            done();
        }
    });

    it("It should find a path successfully.", function (done) {
        var easyStar = new EasyStar.js();
        var map = [
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1
        ];

        easyStar.setGrid(map);

        easyStar.setAcceptableTiles([1]);

        easyStar.findPath(1, 2, 3, 2, onPathFound);

        easyStar.calculate();


        function onPathFound(path)
        {
            assert(path !== null);
            assert(path.length === 5);
            assert(path[0].x === 1);
            assert(path[0].y === 2);
            assert(path[2].x === 2);
            assert(path[2].y === 3);
            done();
        }
    });

    it("It should be able to cancel a path.", function (done) {
        var easyStar = new EasyStar.js();
        var map = [
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1
        ];

        easyStar.setGrid(map);

        easyStar.setAcceptableTiles([1]);

        var id = easyStar.findPath(1, 2, 3, 2, onPathFound);

        easyStar.cancelPath(id);

        easyStar.calculate();


        function onPathFound(path)
        {
            fail("path wasn't cancelled");
        }


        setTimeout(done, 0);
    });

    it("Paths should have different IDs.", function () {
        var easyStar = new EasyStar.js();
        var map = [
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1
        ];

        easyStar.setGrid(map);

        easyStar.setAcceptableTiles([1]);

        var id1 = easyStar.findPath(1, 2, 3, 2, onPathFound);
        var id2 = easyStar.findPath(3, 2, 1, 2, onPathFound);
        assert(id1 > 0);
        assert(id2 > 0);
        assert(id1 !== id2);


        function onPathFound(path)
        {
        }
    });

    it("It should be able to avoid a separate point successfully.", function (done) {
        var easyStar = new EasyStar.js();
        var map = [
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1
        ];

        easyStar.setGrid(map);

        easyStar.avoidAdditionalPoint(2, 3);

        easyStar.setAcceptableTiles([1]);

        easyStar.findPath(1, 2, 3, 2, onPathFound);

        easyStar.calculate();


        function onPathFound(path)
        {
            assert(path !== null);
            assert(path.length === 7);
            assert(path[0].x === 1);
            assert(path[0].y === 2);
            assert(path[2].x === 1);
            assert(path[2].y === 4);
            done();
        }
    });

    it("It should work with diagonals", function (done) {
        var easyStar = new EasyStar.js();
        easyStar.enableDiagonals();
        var map = [
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1
        ];

        easyStar.setGrid(map);

        easyStar.setAcceptableTiles([1]);

        easyStar.findPath(0, 0, 4, 4, onPathFound);

        easyStar.calculate();


        function onPathFound(path)
        {
            assert(path !== null);
            assert(path.length === 5);
            assert(path[0].x === 0);
            assert(path[0].y === 0);
            assert(path[1].x === 1);
            assert(path[1].y === 1);
            assert(path[2].x === 2);
            assert(path[2].y === 2);
            assert(path[3].x === 3);
            assert(path[3].y === 3);
            assert(path[4].x === 4);
            assert(path[4].y === 4);
            done();
        }
    });

    it("It should move in a straight line with diagonals", function (done) {
        var easyStar = new EasyStar.js();
        easyStar.enableDiagonals();
        var map = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];

        easyStar.setGrid(map);

        easyStar.enableDiagonals();

        easyStar.setAcceptableTiles([1]);

        easyStar.findPath(0, 0, 9, 0, onPathFound);

        easyStar.calculate();


        function onPathFound(path)
        {
            assert(path !== null);
            for (var i = 0; i < path.length; i++)
            {
                assert(path[i].y === 0);
            }
            done();
        }
    });

    it("It should return empty path when start and end are the same tile.", function (done) {
        var easyStar = new EasyStar.js();
        var map = [
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1
        ];

        easyStar.setGrid(map);

        easyStar.setAcceptableTiles([1]);

        easyStar.findPath(1, 2, 1, 2, onPathFound);

        easyStar.calculate();


        function onPathFound(path)
        {
            assert(path !== null);
            assert(path.length === 0);
            done();
        }
    });

    it("It should prefer straight paths when possible", function (done) {
        var easyStar = new EasyStar.js();
        easyStar.setAcceptableTiles([0]);
        easyStar.enableDiagonals();
        easyStar.setGrid([
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ]);

        easyStar.findPath(0, 1, 2, 1, function (path) {
            assert(path !== null);
            assert(path[1].x === 1);
            assert(path[1].y === 1);
            done();
        });

        easyStar.calculate();
    });

    it("It should prefer diagonal paths when they are faster", function (done) {
        const easyStar = new EasyStar.js();
        const grid = new Array(20 * 20);
        for (let i = 0; i < 20; i++)
        {
            for (let j = 0; j < 20; j++)
            {
                grid[i * 20 + j] = 0;
            }
        }
        easyStar.setGrid(grid);
        easyStar.setAcceptableTiles([0]);
        easyStar.enableDiagonals();

        easyStar.findPath(4, 4, 2, 2, function (path) {
            assert(path !== null);
            assert(path.length === 3);
            assert(path[1].x === 3);
            assert(path[1].y === 3);
            done();
        });

        easyStar.calculate();
    })

    it("It should handle tiles with a directional condition", function (done) {
        var easyStar = new EasyStar.js();
        var grid = [
            0, 1, 0,
            0, 0, 0,
            0, 0, 0,
        ];
        easyStar.setGrid(grid);
        easyStar.enableDiagonals();
        easyStar.setAcceptableTiles([0]);
        easyStar.setDirectionalCondition(2, 1, [EasyStar.TOP]);
        easyStar.setDirectionalCondition(1, 2, [EasyStar.TOP_RIGHT]);
        easyStar.setDirectionalCondition(2, 2, [EasyStar.LEFT]);
        easyStar.setDirectionalCondition(1, 1, [EasyStar.BOTTOM_RIGHT]);
        easyStar.setDirectionalCondition(0, 1, [EasyStar.RIGHT]);
        easyStar.setDirectionalCondition(0, 0, [EasyStar.BOTTOM]);

        easyStar.findPath(2, 0, 0, 0, function (path) {
            assert(path !== null);
            assert(path.length === 7);
            assert.deepEqual(path[3],{x: 2, y: 2})
            done();
        });

        easyStar.calculate();
    })

    it("It should handle tiles with a directional condition and no corner cutting", function (done) {
        var easyStar = new EasyStar.js();
        easyStar.disableCornerCutting();
        var grid = [
            0, 1, 0,
            0, 0, 0,
            0, 0, 0,
        ];
        easyStar.setGrid(grid);
        easyStar.enableDiagonals();
        easyStar.setAcceptableTiles([0]);
        easyStar.setDirectionalCondition(2, 1, [EasyStar.TOP]);
        easyStar.setDirectionalCondition(1, 1, [EasyStar.RIGHT]);
        easyStar.setDirectionalCondition(0, 1, [EasyStar.RIGHT]);
        easyStar.setDirectionalCondition(0, 0, [EasyStar.BOTTOM]);

        easyStar.findPath(2, 0, 0, 0, function (path) {
            assert(path !== null);
            assert(path.length === 5);
            assert.deepEqual(path[2] , {x: 1, y: 1})
            done();
        });

        easyStar.calculate();
    })
});
