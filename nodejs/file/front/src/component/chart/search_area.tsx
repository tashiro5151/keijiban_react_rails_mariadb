import * as React from 'react';

import { store } from 'src';
import { chart_search } from 'src/api';
import { a_rooms } from 'src/action_reducer/r_simple-sidebar';

export const search_area = () => {
  return (
    <div className="mx-auto" style={{ maxWidth: 400 }}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="検索"
          aria-label=""
          aria-describedby="basic-addon1"
          maxLength={15}
          value={store.getState().r_rooms.search}
          onChange={e => store.dispatch(a_rooms.set_search(e.target.value))}
          onKeyDown={async e => {
            if (e.keyCode !== 13) {
              return;
            }

            await chart_search();
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-info"
            type="button"
            onClick={async () => {
              await chart_search();
            }}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
