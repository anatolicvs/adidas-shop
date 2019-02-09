import React from 'react';
import styled from 'react-emotion';

import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './product-tile';

const ProductDetail = (
    {
        id,
        name,
        title,
        imageUri,
        isBooked }) => (
        <Card
            style={{
                backgroundImage: `url(${imageUri})`,
            }}>
            <h3>
                {name} ({title})
            </h3>
        </Card>
    );

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled('div')(cardClassName, {
    height: 365,
    marginBottom: unit * 4,
});

export default ProductDetail;
