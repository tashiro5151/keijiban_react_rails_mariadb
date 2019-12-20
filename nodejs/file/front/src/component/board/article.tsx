import * as React from 'react';

import { store } from 'src';
const moment = require('moment');
const reactStringReplace = require('react-string-replace');

export const article = () => {
  return React.useMemo(() => {
    return store.getState().r_board.list.map((m, i) => (
      <div key={i}>
        <div className="card">
          <div className="card-header text-center" id="board_card_header">
            {m.name}
            <br />
            <i className="fa fa-clock-o" aria-hidden="true"></i>
            {moment(m.created_at).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div className="card-body">
            <p className="card-text">
              {m.message.split('\n').map((m, i) => (
                <span key={i}>
                  {reactStringReplace(m, /(https?:\/\/\S+)/g, (match, j) => (
                    <a
                      href={match}
                      key={match + j}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {match}
                    </a>
                  ))}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>

        <br />
      </div>
    ));
  }, [JSON.stringify(store.getState().r_board.list)]);
};
