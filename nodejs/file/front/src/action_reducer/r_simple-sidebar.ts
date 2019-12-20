/**
 * 定数
 */
const rooms_set_list = 'rooms_set_list';
const rooms_set_roomName = 'rooms_set_roomName';
const rooms_set_display = 'rooms_set_display';
const rooms_set_genre = 'rooms_set_genre';
const rooms_set_search = 'rooms_set_search';

import { i_roomsList } from 'src/interface';

export interface i_rooms {
  type: string;
  list?: i_roomsList[];
  count?: number;
  roomName?: string;
  genre?: string;
  search?: string;
  display?: boolean;
}

/**
 * 初期値
 */
const initialState: i_rooms = {
  type: '',
  list: [],
  count: 0,
  roomName: '',
  genre: '0',
  search: '',
  display: false
};

/**
 * reducer
 */
export default function r_rooms(state = initialState, action: i_rooms) {
  let param: i_rooms = {
    type: action.type
  };

  switch (action.type) {
    case rooms_set_list:
      param.list = action.list;
      param.count = action.count;
      param.display = action.display;
      return Object.assign({}, state, param);

    case rooms_set_roomName:
      if (action.roomName.length <= 50) {
        param.roomName = action.roomName;
        return Object.assign({}, state, param);
      }

      return state;

    case rooms_set_genre:
      param.genre = action.genre;
      return Object.assign({}, state, param);

    case rooms_set_search:
      param.search = action.search;
      return Object.assign({}, state, param);

    case rooms_set_display:
      param.display = action.display;
      return Object.assign({}, state, param);
    default:
      return state;
  }
}

/**
 * action
 */
export const a_rooms = {
  set_list: (params: {
    list: i_roomsList[];
    count: number;
    display: boolean;
  }) => {
    return {
      type: rooms_set_list,
      list: params.list,
      count: params.count,
      display: params.display
    };
  },
  set_roomName: (roomName: string) => {
    return { type: rooms_set_roomName, roomName: roomName };
  },
  set_genre: (genre: string) => {
    return { type: rooms_set_genre, genre: genre };
  },
  set_search: (search: string) => {
    return { type: rooms_set_search, search: search };
  },
  set_display: (display: boolean) => {
    return { type: rooms_set_display, display: display };
  }
};
