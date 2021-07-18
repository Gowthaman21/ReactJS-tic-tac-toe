import React, { useState, useEffect } from 'react'
import { Box } from './styled'

const App = () =>{
    
    const [Val, setVal] = useState(true)
    const [arr, setArr] = useState([[null,null,null],[null,null,null],[null,null,null]])
    const [msg, setMsg] = useState('')
    var boxes=document.getElementsByClassName('col')
    function chose(e , a, b){
        
        e.target.setAttribute('style', 'pointer-events:none')
        if(Val){
            e.target.innerHTML="<XO>x</XO>"
        }
        else{
            e.target.innerHTML="<XO>o</XO>"
        }
        let newArr=[...arr]
        newArr[a][b]= Val ? 1 : 0;
        setArr(newArr)
        setVal(!Val)
        console.log(arr)
    }

    function disable(){
        document.getElementsByClassName('turns')[0].setAttribute('style', 'display:none')
        for (var i = 0, max = boxes.length; i < max; i++) {
            boxes[i].setAttribute('style', 'pointer-events:none')
        }
    }

    function reset(){
        let newArr=[[null,null,null],[null,null,null],[null,null,null]]
        setArr(newArr)
        for (var i = 0, max = boxes.length; i < max; i++) {
            boxes[i].setAttribute('style', 'pointer-events:auto')
            boxes[i].innerHTML='';
        }
        document.getElementsByClassName('turns')[0].setAttribute('style', 'display:block')
        setVal(true);
        setMsg('')
    }


    function checkWinner(){
        arr.forEach(e => {
            if (e[0] === 1 && e[1] === 1 && e[2] === 1){
                setMsg('Player1 Wins')
                disable()
            }
            if (e[0] === 0 && e[1] === 0 && e[2] === 0){
                setMsg('Player2 Wins')
                disable()
            }
        });
        let cnt = 0
        for (let i = 0; i < 3; i++) {
            if (arr[cnt][i] === 1 && arr[cnt + 1][i] === 1 && arr[cnt + 2][i] === 1) {
                setMsg('Player1 Wins')
                disable()
            }
            if (arr[cnt][i] === 0 && arr[cnt + 1][i] === 0 && arr[cnt + 2][i] === 0) {
                setMsg('Player2 Wins')
                disable()
            }
        }
        if (arr[0][0] ===1 && arr[1][1] ===1 && arr[2][2] ===1) {
            setMsg('Player1 Wins')
            disable()
        }

        if (arr[0][0] === 0 && arr[1][1] === 0 && arr[2][2] === 0) {
            setMsg('Player2 Wins')
            disable()
        }

        if (arr[2][0] === 1 && arr[1][1] === 1 && arr[0][2] ===1) {
            setMsg('Player1 Wins')
            disable()
        }

        if (arr[2][0] === 0 && arr[1][1] === 0 && arr[0][2] === 0) {
            setMsg('Player2 Wins')
            disable()
        }
    }

    useEffect(() => {
        checkWinner()
    }, [arr])

    return(
        <>
            <h1 className='text-center'>
                Let's Upgrade React.JS
            </h1>
            <h2 className='text-center'>
                Day 3 Assignment
            </h2>
            <h2 className='text-center'>
                Tic Tac Toe
            </h2>
            <div className='container justify-content-center d-grid'>
                <div className='row'>
                    <Box className='col border-top-0' pos='l' onClick={(e)=>chose(e, 0 , 0)}></Box>
                    <Box className='col border-top-0' onClick={(e)=>chose(e, 0 , 1)}></Box>
                    <Box className='col border-top-0' pos='r' onClick={(e)=>chose(e, 0 , 2)}></Box>
                </div>
                <div className='row'>
                    <Box className='col' pos='l' onClick={(e)=>chose(e , 1 , 0)}></Box>
                    <Box className='col' onClick={(e)=>chose(e , 1 , 1)}></Box>
                    <Box className='col' pos='r' onClick={(e)=>chose(e , 1 , 2)}></Box>
                </div>
                <div className='row'>
                    <Box className='col border-bottom-0' pos='l' onClick={(e)=>chose(e , 2 , 0)}></Box>
                    <Box className='col border-bottom-0' onClick={(e)=>chose(e , 2 , 1)}></Box>
                    <Box className='col border-bottom-0' pos='r' onClick={(e)=>chose(e , 2 , 2)}></Box>
                </div>
            </div>
            <div className='text-center turns'>
                { Val ? <h2 className='text-info'>Player 1's turn</h2> : <h2 className='text-danger'>Player 2's turn</h2>}    
            </div>
            <h3 className='text-center text-success'>{msg}</h3>
            <div className='d-flex justify-content-center'>
            { msg && 
            <button className='btn btn-lg btn-warning text-light m-auto' onClick={reset} >Reset</button>
            }
            </div>
        </>
    );
}
export default App;