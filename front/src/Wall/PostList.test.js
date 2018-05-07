import React from 'react';
import { PostList } from "./PostList.js";
import renderer from 'react-test-renderer';
import { EXPECTED_BODY, MockApp } from './Mocks.js';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import moxios from 'moxios';


describe('API', () => {

  describe('methods', () => {

    it('list posts of the wall', () => {
      const posts = EXPECTED_BODY.LIST_OF_POSTS.data.posts;
      const tree = renderer
        .create(<PostList posts={posts} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

  })

});
