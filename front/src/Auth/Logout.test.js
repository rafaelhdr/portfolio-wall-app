import React from 'react';
import { Logout } from "./Logout.js";
import renderer from 'react-test-renderer';
import { EXPECTED_BODY } from './Mocks.js';
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

    it('logout user', (done) => {
      class MockApp {
        constructor() {
          this.setUserCalled = false;
        }
        setUser(user) {
          this.setUserCalled = true;
        }
      }
      var mockApp = new MockApp()
      const wrapper = shallow(<Logout
        setUser={(user) => mockApp.setUser(user)}
      />);

      wrapper.instance().handleLogout({ preventDefault: () => { } })

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: EXPECTED_BODY.LOGOUT_SUCCESSFUL,
        }).then(function () {
          expect(mockApp.setUserCalled).toBe(true);
          done();
        })
      })
    });

  })

});
