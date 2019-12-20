import * as React from 'react';
import { Link } from 'react-router-dom';
import { store } from 'src';
import { constant } from 'src/constant';
const moment = require('moment');

export const article = () => {
  return React.useMemo(() => {
    return store.getState().r_rooms.list.map(m => (
      <div key={m.id}>
        <div className="card">
          <div className="card-header text-center" id="index_card_header">
            <i className="fa fa-commenting" aria-hidden="true"></i>
            {m.count}
            &nbsp; &nbsp;
            <i className="fa fa-file" aria-hidden="true"></i>
            {constant.GENRE[m.genreId]}
            <br />
            <i className="fa fa-clock-o" aria-hidden="true"></i>
            {moment(m.updated_at).format('YYYY-MM-DD HH:mm:ss')}
            &nbsp;&nbsp;
          </div>
          <div className="card-body">
            <Link to={`/board/${m.id}/1`}>{m.name}</Link>
          </div>
        </div>
        <br />
      </div>
    ));
  }, [JSON.stringify(store.getState().r_rooms.list)]);
};
