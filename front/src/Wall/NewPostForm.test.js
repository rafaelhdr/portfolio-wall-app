import React from 'react';
import { NewPostForm } from "./NewPostForm.js";
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

    it('add new post to the site', (done) => {
      var mockApp = new MockApp();
      const wrapper = shallow(<NewPostForm
        updatePosts={() => mockApp.updatePosts()}
      />);

      wrapper.instance().handleChangeMessage({ target: { value: 'I am the message :)', } });
      wrapper.instance().handleSubmit({ preventDefault: () => { } })

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: EXPECTED_BODY.NEW_POST_SUCCESSFUL,
        }).then(function () {
          expect(mockApp.updatePostsCalled).toBe(true);
          done();
        })
      })
    });

  })

});
