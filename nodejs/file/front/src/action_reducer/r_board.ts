/**
 * 定数
 */
const board_set_list = 'board_set_list';
const board_set_name = 'board_set_name';
const board_set_message = 'board_set_message';
const board_set_display = 'board_set_display';

import { i_messagesList } from 'src/interface';

export interface i_board {
  type: string;
  list?: i_messagesList[];
  count?: number;
  name?: string;
  message?: string;
  display?: boolean;
}

/**
 * 初期値
 */
const initialState: i_board = {
  type: '',
  list: [],
  count: 0,
  name: '名無し',
  message: '',
  display: false
};

/**
 * reducer
 */
export default function r_board(state = initialState, action: i_board) {
  let param: i_board = {
    type: action.type
  };

  switch (action.type) {
    case board_set_list:
      param.list = action.list;
      param.count = action.count;
      param.display = action.display;
      return Object.assign({}, state, param);

    case board_set_name:
      if (action.name.length <= 15) {
        param.name = action.name;
        return Object.assign({}, state, param);
      }

      return state;

    case board_set_message:
      if (action.message.length <= 150) {
        param.message = action.message;
        return Object.assign({}, state, param);
      }
      return state;

    case board_set_display:
      param.display = action.display;
      return Object.assign({}, state, param);
    default:
      return state;
  }
}

/**
 * action
 */
export const a_board = {
  set_list: (params: {
    list: i_messagesList[];
    count: number;
    display: boolean;
  }) => {
    return {
      type: board_set_list,
      list: params.list,
      count: params.count,
      display: params.display
    };
  },
  set_name: (name: string) => {
    return { type: board_set_name, name: name };
  },
  set_message: (message: string) => {
    return { type: board_set_message, message: message };
  },
  set_display: (display: boolean) => {
    return { type: board_set_display, display: display };
  }
};
