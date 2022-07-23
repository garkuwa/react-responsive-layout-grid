import React from 'react';

interface IGridMargins {
  m?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
}

export interface IGridPaddings {
  p?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
}

export interface IGridContainerProps extends IGridPaddings, IGridMargins {
  children?: React.ReactNode;
  fullHeight?: boolean;
  containerHeight?: string;
  containerWidth?: string;
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-evenly'
    | 'space-around'
    | 'stretch';
  alignItems?:
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'space-between';
  spacing?: number;
  flexWrap?: 'nowrap' | 'wrap';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
}

export interface IGridItemProps extends IGridPaddings {
  sm?: number | boolean;
  md?: number | boolean;
  lg?: number | boolean;
  xlg?: number | boolean;
}

export interface ICenteredContainerProps extends IGridPaddings {
  maxWidth?: string;
  width?: string;
}

export interface IMediaFeature<T> {
  [feature: string]: T;
}

export interface IDefaultMediaFeature<T> extends IMediaFeature<T> {
  mobileMin: T;
  mobileMax: T;
  tabletMin: T;
  tabletMax: T;
  desktopMin: T;
  desktopMax: T;
  xlDesktopMin: T;
  xlDesktopMax: T;
}

export interface IResponsiveGridConfig {
  maxColumns?: number;
  spacingBase?: number;
  smBreakpoint?: number;
  mdBreakpoint?: number;
  lgBreakpoint?: number;
  xlgBreakpoint?: number;
}
