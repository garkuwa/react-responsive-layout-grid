import styled from 'styled-components';
import { getPaddingCss } from './helpers';
import { ICenteredContainerProps } from './models';

const CenteredContainer = styled.div.attrs<ICenteredContainerProps>(() => ({
    className: 'centeredContainer',
}))<ICenteredContainerProps>`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: flex-start;
    margin: 0 auto;
    max-width: ${props => props.maxWidth};
    width: ${props => props.width};
    ${props => getPaddingCss(props)}
`;

CenteredContainer.defaultProps = {
    maxWidth: '100%',
    width: '100%',
};

export default CenteredContainer;
