import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

// pages
import Error404 from './error.404.view';
// import TestApiClass from './test.api.component';
// import HomeMain from './home.main.view';
// import PostNewView from './posts/post.new.view';
// import UserRegisterView from './user/user.register.view';
// import UserLogOutView from './user/user.logout.view';
// import UserLoginView from './user/user.login.view';

class RouterHolder extends React.Component {

    render() {

        return (
            <div>
                <Switch>
                    {/* <Route path="/" exact component={HomeMain} />
                    <Route path="/test" component={TestApiClass} />
                    <Route path="/NewPost" component={PostNewView} />
                    <Route path="/Account/Register" component={UserRegisterView} />
                    <Route path="/Account/Logout" component={UserLogOutView} />
                    <Route path="/Account/Login" component={UserLoginView} /> */}
                    <Route component={Error404} />
                </Switch>
            </div>
        );

    }

}

export default RouterHolder;