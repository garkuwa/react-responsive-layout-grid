import styled from 'styled-components';
import {
  DEFAULT_MEDIA_FEATURES,
  GridBreakpoints,
  GridItemOffsetCssVarNames,
} from './config';
import { getPaddingCss, getMarginCss, getColumnCSS } from './helpers';
import { IGridItemProps } from './models';

const GridItem = styled.div.attrs<IGridItemProps>(({ sm, md, lg, xlg }) => {
  const smClass = sm !== undefined ? `sm-${sm} ` : '';
  const mdClass = md !== undefined ? `md-${md} ` : '';
  const lgClass = lg !== undefined ? `lg-${lg} ` : '';
  const xlgClass = xlg !== undefined ? `xlg-${xlg} ` : '';

  return {
    className: `gridItem ${smClass}${mdClass}${lgClass}${xlgClass}`,
  };
})<IGridItemProps>`
  box-sizing: border-box;

  ${(props) => getPaddingCss(props)};
  ${(props) => getMarginCss(props)};

  ${(props) =>
    `
        @media ${DEFAULT_MEDIA_FEATURES.desktopMin} {
            ${getColumnCSS(
              GridBreakpoints.XLG,
              props,
              GridItemOffsetCssVarNames.XLG
            )}
        }
    `}

  ${(props) =>
    `
        @media ${DEFAULT_MEDIA_FEATURES.tabletMin} and  ${
      DEFAULT_MEDIA_FEATURES.desktopMax
    } {
            ${getColumnCSS(
              GridBreakpoints.LG,
              props,
              GridItemOffsetCssVarNames.LG
            )}
        }
    `}

    ${(props) =>
    `
        @media ${DEFAULT_MEDIA_FEATURES.mobileMin} and ${
      DEFAULT_MEDIA_FEATURES.tabletMax
    } {
            ${getColumnCSS(
              GridBreakpoints.MD,
              props,
              GridItemOffsetCssVarNames.MD
            )}
        }
    `}


    ${(props) =>
    `
        @media ${DEFAULT_MEDIA_FEATURES.mobileMax} {
            ${getColumnCSS(
              GridBreakpoints.SM,
              props,
              GridItemOffsetCssVarNames.SM
            )}
        }
    `};
`;

export default GridItem;
