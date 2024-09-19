import { randomImages } from "../lib/constants";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function isSolvable(tiles: number[]) {
  let product = 1;
  for (let i = 1, l = tiles.length - 1; i <= l; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
    }
  }
  return Math.round(product) === 1;
}

export function isSolved(tiles: number[]) {
  for (let i = 0, l = tiles.length; i < l; i++) {
    if (tiles[i] !== i) {
      return false;
    }
  }
  return true;
}

// Get the row/col pair from a linear index.
export function getMatrixPosition(index: number, size: number) {
  return {
    row: Math.floor(index / size),
    col: index % size,
  };
}

export function getVisualPosition(row: number, col: number, width: number, height: number) {
  return {
    x: col * width,
    y: row * height,
  };
}

export function shuffle(tiles: number[]): number[] {
  const shuffledTiles = [
    ...tiles
      .filter((t) => t !== tiles.length - 1)
      .sort(() => Math.random() - 0.5),
    tiles.length - 1,
  ];

  return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
    ? shuffledTiles
    : shuffle(shuffledTiles);
}

export function canSwap(srcIndex: number, destIndex: number, size: number) {
  const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex, size);
  const { row: destRow, col: destCol } = getMatrixPosition(destIndex, size);
  return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

export function swap(tiles: number[], src: number, dest: number) {
  const tilesResult = [...tiles];
  [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
  return tilesResult;
}

export function updateURLParameter(url: string, param: string, paramVal: string) {
  let newAdditionalURL = "";
  let tempArray = url.split("?");
  const baseURL = tempArray[0];
  const additionalURL = tempArray[1];
  let temp = "";
  if (additionalURL) {
    tempArray = additionalURL.split("&");
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split("=")[0] !== param) {
        newAdditionalURL += temp + tempArray[i];
        temp = "&";
      }
    }
  }

  const rows_txt = temp + "" + param + "=" + paramVal;
  return baseURL + "?" + newAdditionalURL + rows_txt;
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

export function getRandomImage(givenUrl: string) {
  let newURL = givenUrl;
  while (newURL === givenUrl) {
    newURL = randomImages[Math.floor(Math.random() * randomImages.length)];
  }
  return newURL;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
