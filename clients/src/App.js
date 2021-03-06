import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Join from './components/join/Join';
import Chat from './components/chat/Chat';

const App = () =>{
    return(
    <BrowserRouter>
        <Route path="/" exact component={Join} />
        <Route path="/chat"  component={Chat} />
    </BrowserRouter>
    );
}

export default App;