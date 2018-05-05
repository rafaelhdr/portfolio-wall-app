import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<App />);
});

it('set user authenticate to the front', () => {
  const wrapper = shallow(<App />);

  expect(wrapper.state('isAuthenticated')).toEqual(false);
  wrapper.instance().setUser({first_name: 'George', last_name: 'Orwell', username: 'george'});
  expect(wrapper.state('isAuthenticated')).toEqual(true);
})
