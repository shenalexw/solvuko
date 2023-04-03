interface HelpJson {
  titles: string[];
  list: {
    [key: string]: string[];
  };
}

const helpJson: HelpJson = {
  titles: ["Rules", "Generate", "Play", "Solve"],
  list: {
    Rules: [
      "The game board is a 9x9 grid, divided into nine 3x3 sub-grids.",
      "The objective is to fill the grid with digits from 1 to 9 such that each row, column, and 3x3 sub-grid contains each digit exactly once.",
      "The board initially contains some numbers, called 'givens' or 'clues', which cannot be changed.",
      "To solve the puzzle, the player must fill in the remaining empty squares with digits that obey the above rules.",
      "Each puzzle has only one solution."
    ],
    Generate: [
      "The default board is generated at an easy difficulty level.",
      "To adjust the difficulty, select an option from the menu in the top left corner.",
      "Alternatively, if you prefer to start with a completely blank grid, click on the 'Blank' button to clear the board.",
    ],
    Play: [
      "The puzzle is partially filled with numbers in each grid, these numbers cannot be changed.",
      "All of the blank cells in the puzzle can be filled with numbers from 1 to 9.",
      "Click on a cell to select it, it will be highlighted in a darker shade.",
      "You can input a number between 1 and 9, 0 or Backspace to clear the cell, or use the tab and arrow keys to navigate.",
      "If you input an invalid move, the cell will be outlined in red.",
      "Keep filling in the blank cells until the puzzle is complete with no red outlines.",
    ],
    Solve: [
      "If you find the puzzle too difficult, click the 'Solve' button to fill in the solutions automatically.",
      "Ensure that no cells have red outlines or the solver won't be able to complete the puzzle.",
      "If you want to clear the solutions, click the 'Reset' button so you can try again."
      ]
  },
};

export default helpJson;
