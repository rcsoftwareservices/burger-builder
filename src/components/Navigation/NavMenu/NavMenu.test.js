import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavMenu from './NavMenu';
import NavMenuItem from './NavMenuItem/NavMenuItem';

configure({adapter: new Adapter()});

describe('<NavMenu />', () => {
   it('should render two <NavMenu /> elements if not authenticated', () => {
        const wrapper = shallow(<NavMenu />);
        expect(wrapper.find(NavMenuItem)).toHaveLength(2);
   });
});