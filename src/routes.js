import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import GlobalFeed from "./Pages/globalFeed/GlobalFeed";
import Article from "./Pages/article/Article";
import Authentication from "./Pages/authentication/Authentication";
import TagFeed from "./Pages/TagFeed/TagFeed";
import YourFeed from "./Pages/YourFeed/YourFeed";
import CreateArtikle from "./Pages/CreateArtikle/CreateArtikle";
import EditArticle from "./Pages/EditArticle/EditArticle";
import Settings from "./Pages/Settings/Settings";
import UserProfile from "./Pages/UserProfile/UserProfile";


export default () => {
    return(
        <Switch>
            <Route path={'/'} component={GlobalFeed} exact></Route>
            <Route path={'/profile/:slug'} component={UserProfile} ></Route>
            <Route path={'/profile/:slug/favorites'} component={UserProfile} ></Route>
            <Route path={'/articles/new'} component={CreateArtikle} ></Route>
            <Route path={'/articles/:slug/edit'} component={EditArticle} ></Route>
            <Route path={'/feed'} component={YourFeed} ></Route>
            <Route path={'/settings'} component={Settings} ></Route>
            <Route path={'/tags/:slug'} component={TagFeed}></Route>
            <Route path={'/login'} component={Authentication} ></Route>
            <Route path={'/register'} component={Authentication} ></Route>
            <Route path={'/articles/:slug'} component={Article}></Route>
        </Switch>
    )
}

