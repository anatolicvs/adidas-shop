import React from 'react';
import styled, { css } from 'react-emotion';
import { Link } from '@reach/router';
import { unit } from '../styles';

export default ({ product }) => {
    const {
        id,
        name,
        title,
        imageUri,
        isBooked } = product;
    return (
        <StyledLink
            to={`/product/${id}`}
            style={{ backgroundImage: `url(${imageUri})` }}>
            <h3>{name}</h3>
        </StyledLink>
    );
};

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

export const cardClassName = css({
    padding: `${unit * 4}px ${unit * 5}px`,
    borderRadius: 7,
    color: '#ffffff',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
});

const padding = unit * 2;
const StyledLink = styled(Link)(cardClassName, {
    display: 'block',
    height: 193,
    marginTop: padding,
    textDecoration: 'none',
    ':not(:last-child)': {
        marginBottom: padding * 2,
    },
});


/*
<div class="tile">
    <div class="tile__main" style="background-image: url(&quot;https://assets.adidas.com/images/w_320,h_320,f_auto,q_80,fl_lossy/7e9680514ef94bdeb1a0a92600cbb241_9366/Zapatilla_Gazelle_Azul_B41654_01_standard.jpg&quot;);">
        <div class="tile__main--type">
    originals
    </div>
        <div class="tile__main--flag">
            <span class="yarn-icon yarn-icon--footwear">
            </span>
        </div>
    </div>
    <div class="tile__footer">
        <div class="tile__footer__group">Gazelle</div>
        <div class="tile__footer__subheader">
            <div class="tile__footer__subheader__text">
        A ONE-TO-ONE REISSUE OF THE '91 GAZELLES.
          </div>
        </div>
    </div>
</div>

<StyledLink
            to={`/product/${id}`}
            style={{
                backgroundImage: `url(${imageUri})`
            }}>
            <h3>{name}</h3>
            <h5>{title}</h5>
</StyledLink>
*/
