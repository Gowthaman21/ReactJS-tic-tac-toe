import styled from 'styled-components'

export const Box= styled.span`
    height:100px;
    width:100px;
    border-width:1px;
    border-style: solid;
    border-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:5em;

    ${props => props.pos==='l' && `
        border-left: none;
    `}
    ${props => props.pos==='r' && `
        border-right : none;
    `}
`;
