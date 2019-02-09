import React from 'react';

import { render, cleanup } from '../../test-utils';
import ProductDetail from '../product-detail';

describe('Launch Detail View', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(
            <ProductDetail
                id={1}
                site={'earth'}
                rocket={{ name: 'that one', type: 'big' }}
            />,
        );
    });
});
