import { shallow } from 'enzyme';
import { expect } from 'chai';

import {
  BOOK_LIST_SET,
  BOOK_LIST_SET_SENDING_DATA
} from '../../../src/config/actions-types';

import initialState from '../../../src/config/initial-state';

import {
  bookListSet,
  bookListSetSendingData
} from '../../../src/actions/book-list-actions';

describe("Book List Actions", () => {
  it("Set the entire book list to the reducer", () => {
    const bookListData = [{id: 1, title: 'a', user_id: 1, someUnwantedTrashData: 'trash here'}];
    const reducerAction = bookListSet(bookListData);

    expect(reducerAction.type).to.equal(BOOK_LIST_SET);
    expect(reducerAction.bookList.sendingData).to.equal(initialState.bookList.sendingData);
    expect(
      reducerAction.bookList.books[0].id
    ).to.equal(bookListData[0].id);

    // Also removes unwanted data
    expect(
      reducerAction.bookList.books[0].someUnwantedTrashData
    ).to.equal(undefined);
  });

  it("Set the entire book list to the reducer", () => {
    const reducerAction = bookListSetSendingData(true);

    expect(reducerAction.type).to.equal(BOOK_LIST_SET_SENDING_DATA);
    expect(reducerAction.sendingData).to.equal(true);
  });
});