import React from 'react';
import { LoginMenu } from "./Sign.js";
import renderer from 'react-test-renderer';


describe('Components', () => {

  it('render LoginMenu for not authenticated users', () => {
    const tree = renderer
      .create(<LoginMenu isAuthenticated={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render LoginMenu for authenticated users', () => {
    const tree = renderer
      .create(<LoginMenu isAuthenticated={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
