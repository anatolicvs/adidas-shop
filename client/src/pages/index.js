import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Product from './product';
import Products from './products';
import Cart from './cart';
import Profile from './profile';
import { Footer, PageContainer } from '../components';

export default function Pages() {
    return (
        <Fragment>
            <PageContainer>
                <Router primary={false} component={Fragment}>
                    <Products path="/" />
                    <Product path="product/:productId" />
                    <Cart path="cart" />
                    <Profile path="profile" />
                </Router>
            </PageContainer>
            <Footer />
        </Fragment>
    );
}
