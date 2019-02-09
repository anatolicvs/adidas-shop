import React from 'react';

import { render, cleanup } from '../../test-utils';
import ProductTile from '../product-tile';

describe('Launch Tile', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(
            <ProductTile
                product={{
                    id: "5c5d273a404753b93ea1c71f",
                    name: "Manchester United Üçüncü Takım Forması",
                    title: "Manchester United Üçüncü Takım Forması",
                    imageUri: "https://www.adidas.com.tr/dis/dw/image/v2/aagl_prd/on/demandware.static/-/Sites-adidas-products/default/dw39b0fb65/zoom/DP6022_000_plp_model.jpg?sw=230&sfrm=jpg",
                    isBooked: false
                }}
            />,
        );
    });
});
