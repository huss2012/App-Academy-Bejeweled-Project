const chai = require('chai');
const { expect } = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const Bejeweled = require("../class/bejeweled.js");
const Screen = require("../class/screen.js");

describe('Bejeweled', function () {

  let grid;

  // Add tests for setting up a basic board

  describe('insertFruits(grid)', () => {
    it('should insert a fruit in each grid', () => {
      grid = [[" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]];

      let fruits = ["🥝", "🥭", "🥥", "🍋", "🍓", "🍇", "🍊"];

      Bejeweled.insertFruits(grid);

      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          expect(fruits).to.include(grid[row][col]);
        }
      }
    });

    it('should not insert 3 fruits in a row, vertically or horizontally, when the game starts', () => {
      for (let i = 0; i < 50; i++) {
        grid =
          [[" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "]];

        Bejeweled.insertFruits(grid, true);
        expect(Bejeweled.checkForMatches(grid)).to.be.false;
      }
    });

    it('should not insert new fruits in filled spaces', () => {
      grid =
        [["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"]];

      let originalGrid =
        [["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"],
        ["🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭", "🥭"]];

      Bejeweled.insertFruits(grid, true);
      expect(grid).to.deep.equal(originalGrid);
    });
  });


  // Add tests for a valid swap that matches 3
  describe('checkForMatches(grid)', () => {
    it('should detect 3 equal fruits in a row and remove them from the grid', () => {
      grid = [[" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", "🍓", "🍓", "🍓", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]];

      Bejeweled.checkForMatches(grid);

      let newGrid = [[" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]];

      expect(grid).to.deep.equal(newGrid);

      grid = [[" ", " ", " ", " ", " ", " ", " ", " "],
      ["🍊", " ", " ", " ", " ", " ", " ", " "],
      ["🍊", " ", " ", " ", " ", " ", " ", " "],
      ["🍊", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]];

      Bejeweled.checkForMatches(grid);
      expect(grid).to.deep.equal(newGrid);
    });

    it('should make the items above the fruits disappeared fall to fill the gaps', () => {
      grid =
        [[" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", "🍋", "🥥", "🥝", " ", " ", " ", " "],
        [" ", "🍇", "🍊", "🍋", " ", " ", " ", " "],
        [" ", "🥭", "🍋", "🍓", " ", " ", " ", " "],
        [" ", "🍊", "🍊", "🍊", " ", " ", " ", " "]];

      let newGrid =
        [[" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", "🍋", "🥥", "🥝", " ", " ", " ", " "],
        [" ", "🍇", "🍊", "🍋", " ", " ", " ", " "],
        [" ", "🥭", "🍋", "🍓", " ", " ", " ", " "]];

      Bejeweled.checkForMatches(grid);
      expect(grid).to.deep.equal(newGrid);

      grid =
        [[" ", "🍓", " ", " ", " ", " ", " ", " "],
        [" ", "🍋", " ", " ", " ", " ", " ", " "],
        [" ", "🍇", " ", " ", " ", " ", " ", " "],
        [" ", "🥝", " ", " ", " ", " ", " ", " "],
        [" ", "🥥", " ", " ", " ", " ", " ", " "],
        [" ", "🥭", " ", " ", " ", " ", " ", " "],
        [" ", "🥭", " ", " ", " ", " ", " ", " "],
        [" ", "🥭", " ", " ", " ", " ", " ", " "]];

      newGrid =
        [[" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", "🍓", " ", " ", " ", " ", " ", " "],
        [" ", "🍋", " ", " ", " ", " ", " ", " "],
        [" ", "🍇", " ", " ", " ", " ", " ", " "],
        [" ", "🥝", " ", " ", " ", " ", " ", " "],
        [" ", "🥥", " ", " ", " ", " ", " ", " "]];

      Bejeweled.checkForMatches(grid);
      expect(grid).to.deep.equal(newGrid);
    });

    it('should return false if no matches has been found', () => {
      grid =
        [[" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "]];

      expect(Bejeweled.checkForMatches(grid)).to.be.false;
    });


    // Add tests for swaps that set up combos
    context('if there more than 3 fruits of the same type in a row', () => {
      it('should remove all of them', () => {
        grid =
          [[" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", "🥥", "🥥", "🥥", "🥥", "🥥", " ", " "]];

        Bejeweled.checkForMatches(grid);

        let newGrid =
          [[" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "]];

        expect(grid).to.deep.equal(newGrid);

        grid =
          [[" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", "🥥", " ", " ", " ", " ", " ", " "],
          [" ", "🥥", " ", " ", " ", " ", " ", " "],
          [" ", "🥥", " ", " ", " ", " ", " ", " "],
          [" ", "🥥", " ", " ", " ", " ", " ", " "],
          [" ", "🥥", " ", " ", " ", " ", " ", " "]];

        newGrid =
          [[" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "]];

        Bejeweled.checkForMatches(grid);
        expect(grid).to.deep.equal(newGrid);
      });
    });
  });

  // Add tests to check if there are no possible valid moves
  describe('checkValidMoves(grid)', () => {
    context('if there are possible moves that makes 3 fruits in a row', () => {
      it('should return true', () => {
        grid =
          [[" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", "🥝", " ", " ", " ", " ", " ", " "],
          [" ", "🥝", " ", " ", " ", " ", " ", " "],
          [" ", "🥥", " ", " ", " ", " ", " ", " "],
          [" ", "🥝", " ", " ", " ", " ", " ", " "],
          [" ", "🍓", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "]];

        expect(Bejeweled.checkValidMoves(grid)).to.be.true;
      });
    });

    context('if there are no possible moves that makes 3 fruits in a row', () => {
      it('should return false', () => {
        grid =
          [[" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", "🍓", "🍋", "🍊", "🥥", "🍇", "🥭", " "]];

        expect(Bejeweled.checkValidMoves(grid)).to.be.false;
      });
    });
  });
});
