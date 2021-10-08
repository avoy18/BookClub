import styled, {
    createGlobalStyle
} from 'styled-components';

export const GlobalStyle = createGlobalStyle `
    body {
        font-family: 'Work Sans';
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
    }
`

export const Pill = styled.div `
    background: rgb(167, 225, 248);
    border: 2px solid black;
    border-radius: 30px;
    height: 20px;
    width: 20px;
    padding: 8px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    display: flex;
`


export const Close = styled.button `
    background: none;
    border: 0px;
    cursor: pointer;
    width: 24px;
    height: 24px;
    padding: 0px;
    position: relative;

    &::before, &::after{
        background-color: #000;
        content: '';
        height: 24px;
        width: 2px;
        position: absolute;
        top: 0px;
        left: 9px;
    }

    &::before{
        transform: rotate(45deg);
    }

    &::after{
       transform: rotate(-45deg);
    }
`