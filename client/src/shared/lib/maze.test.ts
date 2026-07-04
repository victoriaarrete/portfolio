import { describe, it, expect } from 'vitest';
import { generateMaze, hashString, seededRandom, MAZE_COLS, MAZE_ROWS } from './maze';

const seeded = (path: string) => generateMaze(MAZE_COLS, MAZE_ROWS, seededRandom(hashString(path)));

const render = (grid: ReturnType<typeof generateMaze>) =>
  grid.map((row) => row.map((cell) => cell.ch).join('')).join('\n');

describe('generateMaze', () => {
  it('is deterministic for the same seed and distinct across seeds', () => {
    expect(render(seeded('/resume'))).toBe(render(seeded('/resume')));
    expect(render(seeded('/resume'))).not.toBe(render(seeded('/projects')));
  });

  it('traces one continuous entrance→exit trail', () => {
    const grid = seeded('/anything');
    const steps = new Map<number, [number, number]>();
    grid.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (cell.step != null) {
          expect(steps.has(cell.step)).toBe(false);
          steps.set(cell.step, [r, c]);
        }
      }),
    );

    // Entrance is the left edge of the top corridor row; steps are contiguous
    // and each consecutive pair is grid-adjacent (the trailing "→" marker sits
    // one column past the exit, still adjacency-1 from it).
    expect(steps.get(0)).toEqual([1, 0]);
    for (let i = 1; i < steps.size; i++) {
      const [pr, pc] = steps.get(i - 1)!;
      const [r, c] = steps.get(i)!;
      expect(Math.abs(r - pr) + Math.abs(c - pc)).toBe(1);
    }
  });
});
