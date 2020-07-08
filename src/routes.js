import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import GlobalFeed from "./Pages/globalFeed/GlobalFeed";
import Article from "./Pages/article/Article";
import Authentication from "./Pages/authentication/Authentication";


export default () => {
    return(
        <Switch>
            <Route path={'/'} component={GlobalFeed} exact></Route>
            <Route path={'/login'} component={Authentication} ></Route>
            <Route path={'/register'} component={Authentication} ></Route>
            <Route path={'/articles/:slug'} component={Article}></Route>
        </Switch>
    )
}

