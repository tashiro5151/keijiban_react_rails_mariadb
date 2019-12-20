import * as React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

/**
 * store
 */
import { store } from 'src';

/**
 * component
 */
import { article } from 'src/component/chart/article';
import { sidebar } from 'src/component/chart/sidebar';
import { search_area } from 'src/component/chart/search_area';
import { nav } from 'src/component/chart/nav';

/**
 * api
 */
import { chart_pagination } from 'src/api';

export const simple_sidebar = (
  breadcrumb: { key: string }[],
  url: string,
  reset?: boolean,
  num?: number
) => {
  window.scrollTo(0, 0);

  // state
  const [toggle, setToggle] = React.useState(false);
  const [pId, setPid] = React.useState(num);

  reset ? setPid(1) : '';

  // 子コンポーネント
  const _article = article();
  const _sidebar = sidebar();
  const _search_area = search_area();
  const _nav = nav();

  return (
    <>
      <div className={`d-flex ${toggle ? 'toggled' : ''}`} id="wrapper">
        {_sidebar}

        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <button
              className="btn btn-primary"
              id="menu-toggle"
              onClick={() => setToggle(!toggle)}
            >
              ジャンル
            </button>

            {_nav}
          </nav>

          <nav aria-label="パンくずリスト">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item">
                <Link to="/">ホーム</Link>
              </li>
              {breadcrumb.map(m => {
                return (
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    key={m.key}
                  >
                    {m.key}
                  </li>
                );
              })}
              <li className="breadcrumb-item active" aria-current="page">
                {`${store.getState().r_rooms.count}件`}
              </li>
            </ol>
          </nav>

          <section>
            <article className="mx-auto">
              {_search_area}

              <br />

              {_article}
            </article>

            <div className="d-flex justify-content-center">
              <Pagination
                activePage={pId}
                itemsCountPerPage={10}
                totalItemsCount={store.getState().r_rooms.count}
                onChange={async (num: number) => {
                  await chart_pagination(url, num);
                  setPid(num);
                }}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
