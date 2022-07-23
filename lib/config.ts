import { IDefaultMediaFeature, IResponsiveGridConfig } from './models';

export const GENERAL_CONFIG = {
  SPACING_BASE: 8,
  MAX_COLUMNS: 12,
};

export const DeviceSize = {
  sm: '480px',
  md: '767px',
  lg: '1024px',
  xlg: '1200px',
};

export const DEFAULT_MEDIA_FEATURES: IDefaultMediaFeature<string> = {
  mobileMin: `(min-width: ${DeviceSize.sm})`,
  mobileMax: `(max-width: ${DeviceSize.sm})`,
  tabletMin: `(min-width: ${DeviceSize.md})`,
  tabletMax: `(max-width: ${DeviceSize.md})`,
  desktopMin: `(min-width: ${DeviceSize.lg})`,
  desktopMax: `(max-width: ${DeviceSize.lg})`,
  xlDesktopMin: `(min-width: ${DeviceSize.xlg})`,
  xlDesktopMax: `(max-width: ${DeviceSize.xlg})`,
};

export enum GridBreakpoints {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XLG = 'xlg',
}

export enum GridItemOffsetCssVarNames {
  SM = `--offset-sm`,
  MD = '--offset-md',
  LG = '--offset-lg',
  XLG = '--offset-xlg',
}

export const GRID_BREAKPOINT_ORDER = [
  GridBreakpoints.SM,
  GridBreakpoints.MD,
  GridBreakpoints.LG,
  GridBreakpoints.XLG,
];

export const GridColumnType = {
  AUTO_SIZE: -1,
  TAKE_REMAINING_SPACE: -2,
};

export const initResponsiveLayoutGrid = ({
  maxColumns,
  spacingBase,
  smBreakpoint,
  mdBreakpoint,
  lgBreakpoint,
  xlgBreakpoint,
}: IResponsiveGridConfig) => {
  if (maxColumns) GENERAL_CONFIG.MAX_COLUMNS = maxColumns;
  if (spacingBase) GENERAL_CONFIG.SPACING_BASE = spacingBase;
  if (smBreakpoint) {
    DeviceSize.sm = `${spacingBase}px`;
    DEFAULT_MEDIA_FEATURES.mobileMin = `(min-width: ${DeviceSize.sm})`;
    DEFAULT_MEDIA_FEATURES.mobileMax = `(max-width: ${DeviceSize.sm})`;
  }
  if (mdBreakpoint) {
    DeviceSize.md = `${mdBreakpoint}px`;
    DEFAULT_MEDIA_FEATURES.tabletMin = `(min-width: ${DeviceSize.md})`;
    DEFAULT_MEDIA_FEATURES.tabletMax = `(max-width: ${DeviceSize.md})`;
  }
  if (lgBreakpoint) {
    DeviceSize.lg = `${lgBreakpoint}px`;
    DEFAULT_MEDIA_FEATURES.desktopMin = `(min-width: ${DeviceSize.lg})`;
    DEFAULT_MEDIA_FEATURES.desktopMax = `(max-width: ${DeviceSize.lg})`;
  }
  if (xlgBreakpoint) {
    DeviceSize.xlg = `${xlgBreakpoint}px`;
    DEFAULT_MEDIA_FEATURES.xlDesktopMin = `(min-width: ${DeviceSize.xlg})`;
    DEFAULT_MEDIA_FEATURES.xlDesktopMax = `(max-width: ${DeviceSize.xlg})`;
  }
};
