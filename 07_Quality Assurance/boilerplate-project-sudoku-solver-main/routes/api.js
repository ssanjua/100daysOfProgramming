"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    
    // Validar si faltan campos requeridos
    if (!puzzle || !coordinate || !value) {
      return res.json({ error: "Required field(s) missing" });
    }

    const row = coordinate.charAt(0).toUpperCase();
    const column = coordinate.charAt(1);

    // Validar coordenada
    if (
      coordinate.length !== 2 ||
      !/[A-I]/.test(row) ||
      !/[1-9]/.test(column)
    ) {
      return res.json({ error: "Invalid coordinate" });
    }

    // Validar valor
    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: "Invalid value" });
    }

    // Validar longitud del puzzle
    if (puzzle.length !== 81) {
      return res.json({ error: "Expected puzzle to be 81 characters long" });
    }

    // Validar caracteres del puzzle
    if (/[^0-9.]/.test(puzzle)) {
      return res.json({ error: "Invalid characters in puzzle" });
    }

    // Convertir fila de letra a índice numérico
    const rowIndex = row.charCodeAt(0) - 'A'.charCodeAt(0);
    const colIndex = parseInt(column) - 1;
    const cellIndex = rowIndex * 9 + colIndex;

    // Comprobar si el valor ya está colocado en la coordenada
    if (puzzle[cellIndex] === value) {
      return res.json({ valid: true });
    }

    // Validar colocación en fila, columna y región
    let validRow = solver.checkRowPlacement(puzzle, row, column, value);
    let validCol = solver.checkColPlacement(puzzle, row, column, value);
    let validReg = solver.checkRegionPlacement(puzzle, row, column, value);

    let conflicts = [];
    if (validRow && validCol && validReg) {
      res.json({ valid: true });
    } else {
      if (!validRow) conflicts.push("row");
      if (!validCol) conflicts.push("column");
      if (!validReg) conflicts.push("region");
      res.json({ valid: false, conflict: conflicts });
    }
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;
    if (!puzzle) {
      res.json({ error: "Required field missing" });
      return;
    }
    if (puzzle.length != 81) {
      res.json({ error: "Expected puzzle to be 81 characters long" });
      return;
    }
    if (/[^0-9.]/g.test(puzzle)) {
      res.json({ error: "Invalid characters in puzzle" });
      return;
    }
    let solvedString = solver.solve(puzzle);
    if (!solvedString) {
      res.json({ error: "Puzzle cannot be solved" });
    } else {
      res.json({ solution: solvedString });
    }
  });
};