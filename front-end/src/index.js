import React from "react";
import ReactDOM from "react-dom";
import './styles/main.scss';
import * as serviceWorker from './serviceWorker';
import MasterPage from "./MasterPage";
import MasterPageLogin from "./MasterPageLogin";

var page;
var loggedIn = localStorage.getItem("token");

if(loggedIn)
	page = <MasterPage />
else
	page = <MasterPageLogin />

ReactDOM.render(page, document.getElementById("root"));
