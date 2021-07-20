import React, { useState, useEffect } from 'react'
import { Box , Input} from './styled'
import { Button, Modal } from 'react-bootstrap'

const App = () =>{
    
    const [Val, setVal] = useState(true)
    const [arr, setArr] = useState([[null,null,null],[null,null,null],[null,null,null]])
    const [msg, setMsg] = useState('')
    const [name, setName] =useState({'player1':'', 'player2':''})
    const [show, setShow] = useState(true);
    const handleClose = () => {
        
        if( name.player1 === ''){
            let temp='player1'
            setName(prevState => ({
                ...prevState,
                [temp]: 'Player1'
            }));
        }
        if( name.player2 === ''){
            let temp='player2'
            setName(prevState => ({
                ...prevState,
                [temp]: 'Player2'
            }));
        }
        setShow(false);
    }

    var boxes=document.getElementsByClassName('col')
    var symbol='x'
    function changeSymbol(e){
        console.log(e.target.value)
        symbol=e.target.value
        console.log('symbol',symbol)
        if(symbol === 'o')
            setVal(!Val)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setName(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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
        if(symbol === 'o')
            setVal(!Val)
        else
            setVal(!Val)
        setMsg('')
    }


    function checkWinner(){
        arr.forEach(e => {
            if (e[0] === 1 && e[1] === 1 && e[2] === 1){
                setMsg(name.player1+' Wins')
                disable()
                return
            }
            if (e[0] === 0 && e[1] === 0 && e[2] === 0){
                setMsg(name.player2+' Wins')
                disable()
                return
            }
        });
        let cnt = 0
        for (let i = 0; i < 3; i++) {
            if (arr[cnt][i] === 1 && arr[cnt + 1][i] === 1 && arr[cnt + 2][i] === 1) {
                setMsg(name.player1+' Wins')
                disable()
                return
            }
            if (arr[cnt][i] === 0 && arr[cnt + 1][i] === 0 && arr[cnt + 2][i] === 0) {
                setMsg(name.player2+' Wins')
                disable()
                return
            }
        }
        if (arr[0][0] ===1 && arr[1][1] ===1 && arr[2][2] ===1) {
            setMsg(name.player1+' Wins')
            disable()
            return
        }

        if (arr[0][0] === 0 && arr[1][1] === 0 && arr[2][2] === 0) {
            setMsg(name.player2+' Wins')
            disable()
            return
        }

        if (arr[2][0] === 1 && arr[1][1] === 1 && arr[0][2] ===1) {
            setMsg(name.player1+' Wins')
            disable()
            return
        }

        if (arr[2][0] === 0 && arr[1][1] === 0 && arr[0][2] === 0) {
            setMsg(name.player2+' Wins')
            disable()
            return
        }
        if (!(arr[0].includes(null) || arr[1].includes(null) || arr[2].includes(null))) {
            disable()
            setMsg('Draw')
            return 
        }
    }

    useEffect(() => {
        checkWinner()
    }, [arr])

    return(
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                <Modal.Title>Select Your Symbol</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-3">
                        <Input type="text" className="form-control info" id="p1" value={name.player1} onChange={handleChange} name='player1' />
                        <label htmlFor="p1">Player 1 (X)</label>
                    </div>
                    <div className="form-floating mb-3">
                        <Input type="text" className="form-control info" id="p2" value={name.player2} onChange={handleChange} name='player2' />
                        <label htmlFor="p2">Player 2 (O)</label>
                    </div>
                    <div className="form-floating">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={changeSymbol}>
                            <option value="x">{name.player1}</option>
                            <option value="o">{name.player2}</option>
                        </select>
                        <label htmlFor="floatingSelect">Who plays First</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" id='submit' onClick={handleClose}>Submit</Button>
                </Modal.Footer>
            </Modal>
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
            { name.player1 && name.player2 && 
            <div className='text-center turns'>
                { Val ? <h2 className='text-info'>{name.player1}'s' turn</h2> : <h2 className='text-danger'>{name.player2}'s turn</h2>}    
            </div>
            }
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