import { get_request, post_request } from 'src/util/do_request';
import { a_rooms } from 'src/action_reducer/r_simple-sidebar';
import { a_board } from 'src/action_reducer/r_board';
import { store, history } from 'src';
import { constant } from 'src/constant';
import { i_messagesList, i_roomsList } from 'src/interface';

/**
 * 投稿
 * @param id
 */
export const create_message = async (id: string) => {
  if (store.getState().r_board.name.length === 0) {
    alert('名前を入力してください');
    return;
  }

  if (store.getState().r_board.message.length === 0) {
    alert('投稿内容がありません');
    return;
  }

  await post_request({
    url: `${constant.REQUEST_URL[process.env.NODE_ENV]}/talks`,
    body: JSON.stringify({
      room_id: id,
      name: store.getState().r_board.name,
      message: store.getState().r_board.message
    })
  });

  store.dispatch(a_board.set_message(''));

  // reload
  location.reload();
};

/**
 * ページネーション
 * @param url
 * @param num
 */
export const board_pagination = async (id: string, num: number) => {
  const _ret = await get_request<{ list: i_messagesList[]; count: number }>({
    url: `${constant.REQUEST_URL[process.env.NODE_ENV]}/talks/${id}/${num - 1}`
  });

  _ret !== undefined
    ? store.dispatch(
        a_board.set_list({
          list: _ret.list,
          count: _ret.count,
          display: true
        })
      )
    : '';

  history.push(`/board/${id}/${num}`);
};

export const board_componentDidMount = (num: number, id: string) => {
  fetch(`${constant.REQUEST_URL[process.env.NODE_ENV]}/talks/${id}/${num}`, {
    method: 'get',
    headers: constant.HEADER
  })
    .then(async res => {
      if (res.status !== 200) {
        return;
      }

      const _ret = (await res.json()) as {
        list: i_messagesList[];
        count: number;
      };

      store.dispatch(
        a_board.set_list({
          list: _ret.list,
          count: _ret.count,
          display: true
        })
      );
    })
    .catch(err => {});
};

/**
 * ジャンル初回
 * @param num
 * @param id
 */
export const genre_componentDidMount = (num: number, id: string) => {
  fetch(`${constant.REQUEST_URL[process.env.NODE_ENV]}/rooms/${id}/${num}`, {
    method: 'get',
    headers: constant.HEADER
  })
    .then(async res => {
      if (res.status !== 200) {
        return;
      }

      const _ret = (await res.json()) as { list: i_roomsList[]; count: number };

      store.dispatch(
        a_rooms.set_list({
          list: _ret.list,
          count: _ret.count,
          display: true
        })
      );
    })
    .catch(err => {});
};

/**
 * サーチ初回
 * @param num
 * @param search_str
 */
export const search_componentDidMount = (num: number, search_str: string) => {
  fetch(
    `${constant.REQUEST_URL[process.env.NODE_ENV]}/search/${search_str}/${num}`,
    {
      method: 'get',
      headers: constant.HEADER
    }
  )
    .then(async res => {
      if (res.status !== 200) {
        return;
      }

      const _ret = (await res.json()) as { list: i_roomsList[]; count: number };

      store.dispatch(
        a_rooms.set_list({
          list: _ret.list,
          count: _ret.count,
          display: true
        })
      );
    })
    .catch(err => {});
};

/**
 * info初回
 * @param num
 */
export const info_componentDidMount = (num: number) => {
  fetch(`${constant.REQUEST_URL[process.env.NODE_ENV]}/rooms/${num}`, {
    method: 'get',
    headers: constant.HEADER
  })
    .then(async res => {
      if (res.status !== 200) {
        return;
      }

      const _ret = (await res.json()) as { list: i_roomsList[]; count: number };

      store.dispatch(
        a_rooms.set_list({
          list: _ret.list,
          count: _ret.count,
          display: true
        })
      );
    })
    .catch(err => {});
};

/**
 * 板作成
 */
export const chart_create_borad = async () => {
  if (store.getState().r_rooms.roomName.length === 0) {
    alert('板の名前を入力してください');
    return;
  }

  const _ret = await post_request({
    url: `${constant.REQUEST_URL[process.env.NODE_ENV]}/rooms`,
    body: JSON.stringify({
      name: store.getState().r_rooms.roomName,
      genreId: Number(store.getState().r_rooms.genre)
    })
  });

  store.dispatch(a_rooms.set_roomName(''));

  _ret !== undefined ? history.push(`/board/${_ret['id']}/1`) : '';
};

/**
 * ページネーション
 * @param url
 * @param num
 */
export const chart_pagination = async (url: string, num: number) => {
  const _ret = await get_request<{ list: i_roomsList[]; count: number }>({
    url: `${constant.REQUEST_URL[process.env.NODE_ENV]}${url}${num - 1}`
  });

  _ret !== undefined
    ? store.dispatch(
        a_rooms.set_list({
          list: _ret.list,
          count: _ret.count,
          display: true
        })
      )
    : '';

  history.push(`${url}${num}`);
};

/**
 * 検索
 */
export const chart_search = async () => {
  const _search_str =
    store.getState().r_rooms.search === ''
      ? (window.location.href = '/')
      : store.getState().r_rooms.search;

  const _ret = await get_request<{ list: i_roomsList[]; count: number }>({
    url: `${constant.REQUEST_URL[process.env.NODE_ENV]}/search/${_search_str}/0`
  });

  _ret !== undefined
    ? store.dispatch(
        a_rooms.set_list({
          list: _ret.list,
          count: _ret.count,
          display: true
        })
      )
    : '';

  history.push(`/search/${_search_str}/1`);
};

/**
 * サイドバークリック時
 * @param key
 */
export const chart_sidebar = async (key: string) => {
  if (window.parent.screen.width < 500) {
    document.getElementById('menu-toggle').click();
  }

  const _ret = await get_request<{ list: i_roomsList[]; count: number }>({
    url: `${constant.REQUEST_URL[process.env.NODE_ENV]}/rooms/${key}/0`
  });
  _ret !== undefined
    ? store.dispatch(
        a_rooms.set_list({
          list: _ret.list,
          count: _ret.count,
          display: true
        })
      )
    : '';
};
