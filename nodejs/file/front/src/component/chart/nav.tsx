import * as React from 'react';
import { Modal, Button, Navbar } from 'react-bootstrap';

import { constant } from 'src/constant';
import { a_rooms } from 'src/action_reducer/r_simple-sidebar';
import { store } from 'src';

import { chart_create_borad } from 'src/api';

export const nav = () => {
  const [showModal, setshowModal] = React.useState(false);

  return (
    <>
      <Navbar bg="light">
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setshowModal(true)}
              >
                板をつくる
              </button>
              <Modal show={showModal} onHide={() => setshowModal(false)}>
                <Modal.Header closeButton>
                  <h5 id="exampleModalLabel">板をつくる</h5>
                </Modal.Header>
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">板名</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="50文字内"
                      maxLength={50}
                      value={store.getState().r_rooms.roomName}
                      onChange={e =>
                        store.dispatch(a_rooms.set_roomName(e.target.value))
                      }
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">ジャンル</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      value={store.getState().r_rooms.genre}
                      onChange={e => {
                        store.dispatch(a_rooms.set_genre(e.target.value));
                      }}
                    >
                      {Object.keys(constant.GENRE).map(key => {
                        return (
                          <option key={key} value={key}>
                            {constant.GENRE[key]}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={async () => {
                      setshowModal(false);

                      await chart_create_borad();
                    }}
                  >
                    作成
                  </Button>
                </Modal.Footer>
              </Modal>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
