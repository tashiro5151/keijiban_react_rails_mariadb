/**
 * コアモジュール
 */
import { combineReducers, Dispatch } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

/**
 * reducer
 */
import r_rooms, { i_rooms } from 'src/action_reducer/r_simple-sidebar';
import r_board, { i_board } from 'src/action_reducer/r_board';

/**
 * Props
 */
export interface Props {
  dispatch: Dispatch;
  history: History;
  r_rooms: i_rooms;
  r_board: i_board;
  match: {
    params: {
      id: string;
      num: string;
      str: string;
    };
  };
}

export default history =>
  combineReducers({
    router: connectRouter(history),
    r_rooms: r_rooms,
    r_board: r_board
  });
