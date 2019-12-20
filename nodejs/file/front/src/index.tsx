/**
 * コアモジュール
 */
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';

import createRootReducer from 'src/action_reducer';

/**
 * history
 */
export const history = createBrowserHistory();

/**
 * store
 */
export const store = createStore(
  createRootReducer(history),
  {},
  compose(applyMiddleware(routerMiddleware(history)))
);

/**
 * component
 */
import info from 'src/component/info';
import genre from 'src/component/genre';
import search from 'src/component/search';
import board from './component/_board';

/**
 * render
 */
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={info} />
        <Route exact path="/rooms/:num" component={info} />
        <Route exact path="/rooms/:id/:num" component={genre} />
        <Route exact path="/search/:str" component={search} />
        <Route exact path="/search/:str/:num" component={search} />
        <Route exact path="/board/:id/:num" component={board} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);

/**
 * 戻るボタンでリロード
 * https://teratail.com/questions/61484
 */
window.addEventListener('popstate', e => {
  window.location.reload();
});
