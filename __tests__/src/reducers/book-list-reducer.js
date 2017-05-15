import { shallow } from 'enzyme';
import { expect } from 'chai';

import {
  BOOK_LIST_SET,
  BOOK_LIST_SET_SENDING_DATA
} from '../../../src/config/actions-types';

import {
  bookListSet
} from '../../../src/actions/book-list-actions';

import initialState from '../../../src/config/initial-state';

import { bookListReducer } from '../../../src/reducers';

describe("Book List Reducer", () => {
  it("Set book list into the store", () => {
    const bookList = bookListReducer(initialState.bookList, bookListSet(
      [{id: 1, title: 'A', user_id: 1}]
    ));

    expect(bookList.sendingData).to.equal(false);
    expect(bookList.books).to.be.instanceof(Array);
  });

  it("Set book list sending data into the store", () => {
    const bookList = bookListReducer(initialState.bookList, {
      type: BOOK_LIST_SET_SENDING_DATA,
      sendingData: true
    });

    expect(bookList.sendingData).to.equal(true);
    expect(bookList.books).to.be.instanceof(Array);
  });
});