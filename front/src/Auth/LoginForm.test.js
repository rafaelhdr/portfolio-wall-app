import React from 'react';
import { LoginForm } from "./LoginForm.js";
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
      const wrapper = shallow(<LoginForm
        setUser={(user) => mockApp.setUser(user)}
      />);

      wrapper.instance().handleChangeUsername({ target: { value: 'george', } });
      wrapper.instance().handleChangePassword({ target: { value: 'password', } });
      wrapper.instance().handleSubmit({ preventDefault: () => { } })

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: EXPECTED_BODY.LOGIN_SUCCESSFUL,
        }).then(function () {
          expect(mockApp.setUserCalled).toBe(true);
          done();
        })
      })
    });

  })

});
