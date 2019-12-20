import * as React from 'react';
import { connect } from 'react-redux';

/**
 * reducer
 */
import { Props } from 'src/action_reducer';
import { a_rooms } from 'src/action_reducer/r_simple-sidebar';

// component
import { simple_sidebar } from 'src/component/simple-sidebar';
import { loading } from 'src/component/loading';

// api
import { search_componentDidMount } from 'src/api';

/**
 * サーチ
 */
const search = React.memo(
  (p: Props) => {
    // state
    const [str, setStr] = React.useState(p.match.params.str);

    const _checkStr = () => {
      if (str !== p.match.params.str) {
        setStr(p.match.params.str);
        return true;
      }

      return false;
    };

    const _child = simple_sidebar(
      [{ key: '検索' }],
      `/search/${p.match.params.str}/`,
      _checkStr(),
      p.match.params.num == undefined ? 1 : Number(p.match.params.num)
    );

    /**
     * componentDidMount
     */
    React.useEffect(() => {
      const _num =
        p.match.params.num === undefined ? 0 : Number(p.match.params.num) - 1;

      search_componentDidMount(_num, str);

      return () => {};
    }, []);

    /**
     * componentWillUnmount
     */
    React.useEffect(() => {
      return () => {
        p.dispatch(a_rooms.set_display(false));
      };
    }, []);

    if (!p.r_rooms.display) {
      return <>{loading()}</>;
    }

    return <>{_child}</>;
  },
  (prevProps: Props, nextProps: Props) => {
    const reducer_name = 'r_rooms';

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

export default connect(store => store)(search);
