import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'jquery/dist/jquery.js';
import '@popperjs/core/dist/cjs/popper.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import App from "./components/dashboard";

import {
    RecoilRoot
} from 'recoil';

ReactDOM.render(
    <RecoilRoot>
        <HashRouter>
            <App />
        </HashRouter>
    </RecoilRoot>,
    document.getElementById('root')
);
