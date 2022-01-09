import React, { useState, useEffect } from 'react';

const Home = () => {
    const [users , setUser] = useState([]);
    useEffect(() => {
        console.log("hello bro")
    } , []);
    
    return (
        <div> <h1>Hello</h1>
            
        </div>
    );
}

export default Home;