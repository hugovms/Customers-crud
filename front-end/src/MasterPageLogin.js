import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./pages/Login";

const MasterPageLogin = () => (
	<div  className="panel-login middle-box">
		<form>
			<Router>
				<div>
					<Route exact path="/" component={Login} />
				</div>
			</Router>
		</form>
	</div>
);

export default MasterPageLogin;
