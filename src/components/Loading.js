import React from 'react';
import './Loading.css';
import loading from './loading.svg';

function Loading(props) {

    return (
    <div className="Loading">
        <header className="Loading-header">
            <img src={loading} className="Loading-logo" alt="loading" />
        </header>
    </div>
    );
}

export default Loading;
