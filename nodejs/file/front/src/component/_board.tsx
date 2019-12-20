import * as React from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

/**
 * reducer
 */
import { Props } from 'src/action_reducer';
import { a_board } from 'src/action_reducer/r_board';

/**
 * component
 */
import { article } from 'src/component/board/article';
import { post_area } from 'src/component/board/post_area';
import { loading } from 'src/component/loading';

// api
import { board_componentDidMount, board_pagination } from 'src/api';

const board = React.memo(
  (p: Props) => {
    // state
    const [num, setNum] = React.useState(Number(p.match.params.num));

    // 子コンポーネント
    const _article = article();
    const _post_area = post_area(p.match.params.id);

    /**
     * componentDidMount
     */
    React.useEffect(() => {
      const _num =
        p.match.params.num === undefined ? 0 : Number(p.match.params.num) - 1;

      board_componentDidMount(_num, p.match.params.id);

      return () => {};
    }, []);

    /**
     * componentWillUnmount
     */
    React.useEffect(() => {
      return () => {
        p.dispatch(a_board.set_display(false));
      };
    }, []);

    if (!p.r_board.display) {
      return <>{loading()}</>;
    }

    return (
      <>
        <header>
          <div className="d-flex justify-content-center">
            <Link to="/">
              <img
                src="/img/logo1.png"
                className="img-fluid"
                alt="Responsive image"
              />
            </Link>
          </div>
        </header>

        <nav aria-label="パンくずリスト">
          <ol className="breadcrumb mb-1">
            <li className="breadcrumb-item">
              <Link to="/">ホーム</Link>
            </li>
            <li className="breadcrumb-item">板</li>
            <li className="breadcrumb-item">{`${p.r_board.count}件`}</li>
          </ol>
        </nav>

        <br />

        <div className="d-flex justify-content-center">{_post_area}</div>

        <br />

        <section>
          <article className="mx-auto">
            <br />

            <div className="d-flex justify-content-center">
              <Pagination
                activePage={num}
                itemsCountPerPage={100}
                totalItemsCount={p.r_board.count}
                onChange={async (num: number) => {
                  board_pagination(p.match.params.id, num);
                  setNum(num);
                }}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>

            {_article}

            {p.r_board.count > 30 ? (
              <div className="d-flex justify-content-center">
                <Pagination
                  activePage={num}
                  itemsCountPerPage={100}
                  totalItemsCount={p.r_board.count}
                  onChange={async (num: number) => {
                    board_pagination(p.match.params.id, num);
                    setNum(num);
                  }}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            ) : (
              ''
            )}
          </article>
        </section>
      </>
    );
  },
  (prevProps: Props, nextProps: Props) => {
    const reducer_name = 'r_board';

    try {
      // apiリクエストが終了した時
      if (!prevProps[reducer_name].display && nextProps[reducer_name].display) {
        return false;
      }

      // 画面遷移時
      if (prevProps[reducer_name].display && !nextProps[reducer_name].display) {
        return true;
      }

      if (
        JSON.stringify(prevProps[reducer_name]) !==
        JSON.stringify(nextProps[reducer_name])
      ) {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
);

export default connect(store => store)(board);
