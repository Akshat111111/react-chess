import HistoryActions from '../actions/HistoryActions.js';
import BoardStore from '../stores/BoardStore.js';
import HistoryStore from '../stores/HistoryStore.js';
import React from 'react';

export default class History extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = HistoryStore.getState();
  }

  componentDidMount() {
    this._isMounted = true;
    BoardStore.on("reset", () => {
      if (this._isMounted) {
        this.setState(HistoryStore.getState());
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  goToBeginning() {
    HistoryActions.goToBeginning();
  }

  goBack() {
    HistoryActions.goBack();
  }

  goForward() {
    HistoryActions.goForward();
  }

  goToEnd() {
    HistoryActions.goToEnd();
  }

  renderHistory() {
    let n = 1;
    let history = '';
    HistoryStore.getState().items.forEach(function (item, index) {
      if (index % 2 === 0) {
        history += n + '. ' + item.pgn;
        n++;
      } else {
        history = history + ' ' + item.pgn + ' ';
      }
    });

    return (
      <p>{history}</p>
    );
  }

  render() {
    return (
      <div>
        <div className="browser">
          <button
            disabled={HistoryStore.getState().back >= HistoryStore.getState().items.length}
            onClick={() => this.goToBeginning()}>&lt;&lt;
          </button>
          <button
            disabled={HistoryStore.getState().back >= HistoryStore.getState().items.length}
            onClick={() => this.goBack()}>&lt;
          </button>
          <button
            disabled={HistoryStore.getState().back === 0}
            onClick={() => this.goForward()}>&gt;
          </button>
          <button
            disabled={HistoryStore.getState().back === 0}
            onClick={() => this.goToEnd()}>&gt;&gt;
          </button>
        </div>
        <div className="history">
          {this.renderHistory()}
        </div>
      </div>
    );
  }
}
