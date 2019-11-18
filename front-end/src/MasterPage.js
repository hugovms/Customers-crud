import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Row, Col } from "./components";

import GetRoutes from "./Routes";

const routes = GetRoutes();

var userName = "";

export default class MasterPage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    async componentDidMount() {
        userName = localStorage.getItem("userName");

        try {
            
        } catch (err) {
            if(err.message.indexOf("401") > -1)
            {
                localStorage.removeItem("token");
                document.location = "/";
            }
        }
    }


    logout = () => {
        localStorage.removeItem("token");
        document.location = "/";
    }
    
    render() {
        
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div className="wrapper">
                    <nav className="navbar-default nav-open">
                        <ul>
                            <li className="text-center h2 text-white mb-4 mt-3">
                                SurittecCrud
                            </li>
                        </ul>
                        <ul>

                            {
                                routes.map((route, index) => {
                                    var link = route.path;

                                    if(route.showMenu) {
                                        return (
                                            <li key={index}>
                                                <Link to={link} > 
                                                    <i className={route.icon}></i>
                                                    {route.title}
                                                </Link>
                                            </li>
                                        );
                                    }
                                    else return "";
                                })
                            }

                            <li>
                                <a href="." onClick={this.logout}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    Sair
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="page-wrapper nav-open">
                        <Row className="page-heading">
                            
                        </Row>

                        <div className="wrapper-content">
                            <Switch>
                                { routes.map(
                                (route, index) => 
                                    <Route key={index} exact={route.exact} path={route.path} component={route.component} />
                                ) 
                                }
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}