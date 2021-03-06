import React from 'react';
import { RegisterForm } from "./RegisterForm.js";
import renderer from 'react-test-renderer';
import { EXPECTED_BODY, MockApp } from './Mocks.js'
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

    it('register visitor', (done) => {
      var mockApp = new MockApp()
      const wrapper = shallow(<RegisterForm
        setUser={(user) => mockApp.setUser(user)}
      />);

      wrapper.instance().handleChangeUsername({ target: { value: 'george', } });
      wrapper.instance().handleChangeFirstName({ target: { value: 'George', } });
      wrapper.instance().handleChangeLastName({ target: { value: 'Orwell', } });
      wrapper.instance().handleChangeEmail({ target: { value: 'george@orwell.com', } });
      wrapper.instance().handleChangePassword({ target: { value: 'password', } });
      wrapper.instance().handleSubmit({ preventDefault: () => { } })

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: EXPECTED_BODY.REGISTER_SUCCESSFUL,
        }).then(function () {
          expect(mockApp.setUserCalled).toBe(true);
          done();
        })
      })

    });

    it('register visitor fail', (done) => {
      var mockApp = new MockApp()
      const wrapper = shallow(<RegisterForm
        setUser={(user) => mockApp.setUser(user)}
      />);

      wrapper.instance().handleChangeUsername({ target: { value: 'george', } });
      wrapper.instance().handleChangeFirstName({ target: { value: 'George', } });
      wrapper.instance().handleChangeLastName({ target: { value: 'Orwell', } });
      wrapper.instance().handleChangeEmail({ target: { value: 'george@orwell.com', } });
      wrapper.instance().handleChangePassword({ target: { value: 'password', } });
      wrapper.instance().handleSubmit({ preventDefault: () => { } })

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: EXPECTED_BODY.REGISTER_FAIL,
        }).then(function () {
          expect(mockApp.setUserCalled).toBe(false);
          done();
        })
      })

    });

  })

});
