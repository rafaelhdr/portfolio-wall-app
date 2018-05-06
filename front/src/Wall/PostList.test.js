import React from 'react';
import { PostList } from "./PostList.js";
import renderer from 'react-test-renderer';
import { EXPECTED_BODY, MockApp } from './Mocks.js';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import moxios from 'moxios';


describe('API', () => {

  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })

  describe('methods', () => {

    it('login visitor', (done) => {
      var mockApp = new MockApp()
      const wrapper = shallow(<PostList />);

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: EXPECTED_BODY.LIST_OF_POSTS,
        }).then(function () {
          done();
        })
      })
    });

  })

});
