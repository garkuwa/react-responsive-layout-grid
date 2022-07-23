import { Children, ReactElement } from 'react';
import {
  GridBreakpoints,
  GRID_BREAKPOINT_ORDER,
  GridColumnType,
  GridItemOffsetCssVarNames,
  GENERAL_CONFIG,
} from './config';
import { IGridContainerProps, IGridItemProps, IGridPaddings } from './models';

export const isBoolean = (value: any) => typeof value === 'boolean';
export const isNumber = (value: any) => typeof value === 'number';

export const calculateColumnWidth = (
  offsetCsVarName: string,
  size?: number | boolean
) =>
  ` calc(var(--column-size) * ${size}${
    size && size === GENERAL_CONFIG.MAX_COLUMNS
      ? ''
      : ` - var(${offsetCsVarName})`
  })`;

interface IBreakpointGridReduceState {
  itemsPerRowGrid: number[]; // format itemIndex: the number of the items in that row
  currentRowBuffer: number[];
  isWaitingForFullWidthItem: boolean;
}

const sumUpItemsInArray = (array: number[]) => array.reduce((a, b) => a + b, 0);

export const calcNumberOfItemsInABufferRow = (
  accumulator: IBreakpointGridReduceState
) => {
  const lastResultElementIndex = accumulator.itemsPerRowGrid.length;

  for (
    let i = lastResultElementIndex;
    i < lastResultElementIndex + accumulator.currentRowBuffer.length;
    i += 1
  ) {
    accumulator.itemsPerRowGrid[i] = accumulator.currentRowBuffer.includes(-1)
      ? 1
      : accumulator.currentRowBuffer.length;
  }
};

export const findBreakpointsNeighbor = (
  breakpointName: GridBreakpoints,
  props: IGridItemProps
): GridBreakpoints | undefined => {
  const indexOfCurrent = GRID_BREAKPOINT_ORDER.indexOf(breakpointName);
  const leftNeighbors = GRID_BREAKPOINT_ORDER.slice(
    0,
    indexOfCurrent
  ).reverse();
  const closestLeftNeighbor = leftNeighbors.find((i) => props[i] !== undefined);

  if (closestLeftNeighbor) return closestLeftNeighbor;

  const rightNeighbors = GRID_BREAKPOINT_ORDER.slice(indexOfCurrent);
  const closestRightNeighbor = rightNeighbors.find(
    (i) => props[i] !== undefined
  );

  return closestRightNeighbor;
};

const mapGridBreakpointsToNumberOfColumns = (
  children: React.ReactNode,
  breakpoint: GridBreakpoints
) =>
  Children.map(children as ReactElement[], (i) => {
    const currentBreakpoint = i?.props?.[breakpoint];

    if (!i?.props || (isBoolean(currentBreakpoint) && !currentBreakpoint))
      return GridColumnType.AUTO_SIZE;

    if (isNumber(currentBreakpoint)) return currentBreakpoint;

    if (isBoolean(currentBreakpoint) && currentBreakpoint)
      return GridColumnType.TAKE_REMAINING_SPACE;

    const neighbor = findBreakpointsNeighbor(breakpoint, i.props);

    if (neighbor && isNumber(i.props[neighbor])) return i.props[neighbor];

    if (neighbor && isBoolean(i.props[neighbor]) && i.props[neighbor])
      return GridColumnType.TAKE_REMAINING_SPACE;

    return GridColumnType.AUTO_SIZE;
  });

// returns an array: itemIdex: factual columns number
export const calculateItemNumberInRowForABreakpoint = (
  children: React.ReactNode,
  breakpoint: GridBreakpoints
) =>
  [...mapGridBreakpointsToNumberOfColumns(children, breakpoint), 0].reduce(
    (accumulator, current, index, array) => {
      if (current === GENERAL_CONFIG.MAX_COLUMNS) {
        accumulator.isWaitingForFullWidthItem = false;
      }

      if (
        accumulator.isWaitingForFullWidthItem &&
        current !== GENERAL_CONFIG.MAX_COLUMNS &&
        index !== array.length - 1
      ) {
        accumulator.currentRowBuffer.push(current);
        return accumulator;
      }

      if (current === GridColumnType.AUTO_SIZE)
        accumulator.isWaitingForFullWidthItem = true;

      if (
        current === GridColumnType.AUTO_SIZE ||
        sumUpItemsInArray(accumulator.currentRowBuffer) + current >
          GENERAL_CONFIG.MAX_COLUMNS ||
        index === array.length - 1
      ) {
        calcNumberOfItemsInABufferRow(accumulator);
        accumulator.currentRowBuffer = [current];
        return accumulator;
      }

      accumulator.currentRowBuffer.push(current);
      return accumulator;
    },
    {
      itemsPerRowGrid: [],
      currentRowBuffer: [],
      isWaitingForFullWidthItem: false,
    } as IBreakpointGridReduceState
  ).itemsPerRowGrid;

export const getColumnCSS = (
  breakpointName: GridBreakpoints,
  props: IGridItemProps,
  offsetCssVarName: string
): string => {
  const currentColumnSize = props[breakpointName];
  // size in %
  if (isNumber(currentColumnSize))
    return `
        flex-basis: ${calculateColumnWidth(
          offsetCssVarName,
          currentColumnSize
        )};
        flex-shrink: 1;
    `;

  // autosize or take the remaining space
  if (isBoolean(currentColumnSize))
    return `flex-grow: ${currentColumnSize ? '1;' : '0;'};`;

  // undefined, so look at the neighbors
  const bestNeighbor = findBreakpointsNeighbor(breakpointName, props);

  return bestNeighbor
    ? getColumnCSS(bestNeighbor, props, offsetCssVarName)
    : '';
};

export const calculateItemSizeOffset = (itemsInARow: number, spacing: number) =>
  (spacing * GENERAL_CONFIG.SPACING_BASE * (itemsInARow - 1)) / itemsInARow;

export const getGridItemOffsets = (props: IGridContainerProps) => {
  const spacingNumber = props.spacing || 0;
  const childrenElements = props.children as Element[];
  const smGrid = calculateItemNumberInRowForABreakpoint(
    props.children,
    GridBreakpoints.SM
  );
  const mdGrid = calculateItemNumberInRowForABreakpoint(
    props.children,
    GridBreakpoints.MD
  );
  const lgGrid = calculateItemNumberInRowForABreakpoint(
    props.children,
    GridBreakpoints.LG
  );
  const xlgGrid = calculateItemNumberInRowForABreakpoint(
    props.children,
    GridBreakpoints.XLG
  );

  return (
    Array.isArray(childrenElements) ? childrenElements : [childrenElements]
  ).reduce((accumulator, _, index) => {
    accumulator.push(`
        >.gridItem:nth-child(${index + 1}) {
            ${GridItemOffsetCssVarNames.SM}: ${calculateItemSizeOffset(
      smGrid[index],
      spacingNumber
    )}px;
            ${GridItemOffsetCssVarNames.MD}: ${calculateItemSizeOffset(
      mdGrid[index],
      spacingNumber
    )}px;
            ${GridItemOffsetCssVarNames.LG}: ${calculateItemSizeOffset(
      lgGrid[index],
      spacingNumber
    )}px;
            ${GridItemOffsetCssVarNames.XLG}: ${calculateItemSizeOffset(
      xlgGrid[index],
      spacingNumber
    )}px;
        }
    `);
    return accumulator;
  }, [] as string[]);
};

export const getPaddingCss = ({ p, pt, pr, pb, pl }: IGridPaddings) =>
  p || pt || pr || pb || pl || pt
    ? `
        ${p ? `padding: ${p * GENERAL_CONFIG.SPACING_BASE}px` : ''};
        ${pt ? `padding-top: ${pt * GENERAL_CONFIG.SPACING_BASE}px` : ''};
        ${pr ? `padding-right: ${pr * GENERAL_CONFIG.SPACING_BASE}px` : ''};
        ${pb ? `padding-bottom: ${pb * GENERAL_CONFIG.SPACING_BASE}px` : ''};
        ${pl ? `padding-left: ${pl * GENERAL_CONFIG.SPACING_BASE}px` : ''};
    `
    : '';

export const getMarginCss = ({ m, mt, mr, mb, ml }: IGridContainerProps) =>
  m || mt || mr || mb || ml || mt
    ? `
        ${m ? `margin: ${m * GENERAL_CONFIG.SPACING_BASE}px` : ''};
        ${mt ? `margin-top: ${mt * GENERAL_CONFIG.SPACING_BASE}px` : ''};
        ${mr ? `margin-right: ${mr * GENERAL_CONFIG.SPACING_BASE}px` : ''};
        ${mb ? `margin-bottom: ${mb * GENERAL_CONFIG.SPACING_BASE}px` : ''};
        ${ml ? `margin-left: ${ml * GENERAL_CONFIG.SPACING_BASE}px` : ''};
    `
    : '';
