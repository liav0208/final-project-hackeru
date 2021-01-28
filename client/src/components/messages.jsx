import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Inbox from "./inbox";
import Outbox from "./outbox";


class Messages extends Component {
  state = {};

  render() {
    const { url } = this.props.match;
    return (
      <div className="messages">
        <div className="messages__header">
          <h1 className="title">Messages</h1>
          <div className="messages-links">
            <NavLink className="message-link" to={`${url}/inbox`}>
              Inbox
            </NavLink>
            <NavLink className="message-link" to={`${url}/outbox`}>
              outbox
            </NavLink>
          </div>
        </div>

        <Switch>
          <Route path={`${url}/inbox`} component={Inbox} />
          <Route path={`${url}/outbox`} component={Outbox} />
        </Switch>
      </div>
    );
  }
}

export default Messages;
