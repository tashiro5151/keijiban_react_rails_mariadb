import * as React from 'react';
import { Link } from 'react-router-dom';

import { constant } from 'src/constant';
import { chart_sidebar } from 'src/api';

export const sidebar = () => {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading"></div>
      <div className="list-group list-group-flush">
        {Object.keys(constant.GENRE).map(key => {
          return (
            <Link
              key={key}
              to={`/rooms/${key}/1`}
              className="list-group-item list-group-item-action bg-light"
              onClick={async () => {
                await chart_sidebar(key);
              }}
            >
              {constant.GENRE[key]}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
