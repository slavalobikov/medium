import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import GlobalFeed from "./Pages/globalFeed/GlobalFeed";
import Article from "./Pages/article/Article";


export default () => {
    return(
        <Switch>
            <Route path={'/'} component={GlobalFeed} exact></Route>
            <Route path={'/articles/:slug'} component={Article}></Route>
        </Switch>
    )
}

