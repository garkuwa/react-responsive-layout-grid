import { StyledComponent } from 'styled-components';
import {
  ICenteredContainerProps,
  IGridContainerProps,
  IGridItemProps,
  IResponsiveGridConfig,
} from './lib/models';

export const GridContainer: StyledComponent<
  'div',
  any,
  IGridContainerProps,
  never
>;
export const GridItem: StyledComponent<'div', any, IGridItemProps, never>;
export const CenteredContainer: StyledComponent<
  'div',
  any,
  ICenteredContainerProps,
  never
>;
export const initResponsiveLayoutGrid: ({
  maxColumns,
  spacingBase,
  smBreakpoint,
  mdBreakpoint,
  lgBreakpoint,
  xlgBreakpoint,
}: IResponsiveGridConfig) => void;
export const DeviceSize: {
  sm: string;
  md: string;
  lg: string;
  xlg: string;
};
