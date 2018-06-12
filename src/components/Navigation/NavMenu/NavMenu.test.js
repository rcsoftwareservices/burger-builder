import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavMenu from './NavMenu';
import NavMenuItem from './NavMenuItem/NavMenuItem';

configure({adapter: new Adapter()});

describe('<NavMenu />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavMenu />);
   });

    it('should render two <NavMenu /> elements if not authenticated', () => {
        expect(wrapper.find(NavMenuItem)).toHaveLength(2);
   });

    it('should render three <NavMenu /> elements if authenticated', () => {
        // wrapper = wrapper = shallow(<NavMenu isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavMenuItem)).toHaveLength(3);
    });

    it('should render three <NavMenu /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavMenuItem link="/logout">Logout</NavMenuItem>)).toEqual(true);
    });

});