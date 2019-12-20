import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { store } from 'src';
import { a_board } from 'src/action_reducer/r_board';

import { create_message } from 'src/api';

export const post_area = (id: string) => {
  const [showModal, setshowModal] = React.useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setshowModal(true)}
      >
        投稿する
      </button>

      <Modal show={showModal} onHide={() => setshowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 id="exampleModalLabel">投稿する</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">名前</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="名前"
              value={store.getState().r_board.name}
              onChange={e => store.dispatch(a_board.set_name(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="formGroupExampleInput">投稿内容</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="150文字以内"
              maxLength={150}
              value={store.getState().r_board.message}
              onChange={e =>
                store.dispatch(a_board.set_message(e.target.value))
              }
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={async () => {
              setshowModal(false);

              create_message(id);
            }}
          >
            投稿
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
