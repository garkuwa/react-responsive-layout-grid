import styled from 'styled-components';
import { GENERAL_CONFIG } from './config';
import { getGridItemOffsets, getPaddingCss, getMarginCss } from './helpers';
import { IGridContainerProps } from './models';

const GridContainer = styled.div.attrs<IGridContainerProps>(() => ({
  className: 'gridContainer',
}))<IGridContainerProps>`
  box-sizing: border-box;

  ${(props) => `
        align-items: ${props.alignItems};
        display: flex;
        flex-direction: ${props.flexDirection};
        flex-grow: ${props.fullHeight ? 1 : 'unset'};
        flex-wrap: ${props.flexWrap};
        height: ${
          props.containerHeight !== 'unset'
            ? props.containerHeight
            : props.fullHeight
            ? '100%'
            : props.containerHeight
        };
        width: ${props.containerWidth};
        justify-content: ${props.justifyContent};
        gap: ${(props.spacing || 0) * GENERAL_CONFIG.SPACING_BASE}px;

        ${getGridItemOffsets(props)}

        ${getPaddingCss(props)}
        ${getMarginCss(props)}
    
        >.gridItem {
            --column-size: calc(100% / ${GENERAL_CONFIG.MAX_COLUMNS});
        }
   `}
`;

GridContainer.defaultProps = {
  alignItems: 'stretch',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  containerHeight: 'unset',
  containerWidth: 'unset',
};

export default GridContainer;
