import React from 'react';
import renderer from 'react-test-renderer';
import { checkUser } from "./Me.js";
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

    it('check user', (done) => {
      var mockApp = new MockApp()

      checkUser((user) => mockApp.setUser(user))

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: EXPECTED_BODY.ME_SUCCESSFUL,
        }).then(function () {
          expect(mockApp.setUserCalled).toBe(true);
          done();
        })
      })
    });

  })

});
