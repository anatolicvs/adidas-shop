import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

import Button from './button';

import { ReactComponent as Logo } from '../assets/adidas.svg';
import { ReactComponent as Curve } from '../assets/curve.svg';
import { ReactComponent as Adidas } from '../assets/adidas-logo.svg';
import { colors, unit } from '../styles';

export default class LoginForm extends Component {
    state = { email: '' };

    onChange = event => {
        const email = event.target.value;
        this.setState(s => ({ email }));
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.login({ variables: { email: this.state.email } });
    };

    render() {
        return (
            <Container>
                <Header>
                    <StyledCurve />
                    <StyledLogo />
                </Header>
                <StyledAdidasLogo />
                <Heading>Adidas Shop</Heading>
                <StyledForm onSubmit={this.onSubmit}>
                    <StyledInput
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        data-testid="login-input"
                        onChange={this.onChange}
                    />
                    <Button type="submit">Log in</Button>
                </StyledForm>
            </Container>
        );
    }
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: unit * 6,
    color: 'white',
    //backgroundColor: colors.secondary,
    //backgroundImage: `url(${space})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

export const FormContainer = styled('div')({
    width: '100%',
    maxWidth: 550,
    padding: unit * 3.5,
    borderRadius: 3,
    boxShadow: '6px 6px 1px rgba(0, 0, 0, 0.25)',
    color: colors.text,
    backgroundColor: 'white',
});

const svgClassName = css({
    display: 'block',
    fill: 'currentColor',
});

const Header = styled('header')(svgClassName, {
    width: '100%',
    marginBottom: unit * 5,
    padding: unit * 2.5,
    position: 'relative',
});

const StyledLogo = styled(Logo)(size(56), {
    display: 'block',
    margin: '0 auto',
    position: 'relative',
});

const StyledCurve = styled(Curve)(size('100%'), {
    fill: colors.primaryBlack,
    position: 'absolute',
    top: 0,
    left: 0,
});

const Heading = styled('h1')({
    color: "black",
    margin: `${unit * 3}px 0 ${unit * 6}px`,
});

const StyledAdidasLogo = styled(Adidas)(svgClassName, {
    width: 250,
});

export const StyledForm = styled('form')({
    width: '100%',
    maxWidth: 550,
    padding: unit * 3.5,
    borderRadius: 3,
    boxShadow: '6px 6px 1px rgba(0, 0, 0, 0.25)',
    color: colors.text,
    backgroundColor: 'white',
});

export const StyledInput = styled('input')({
    width: '100%',
    marginBottom: unit * 2,
    padding: `${unit * 1.25}px ${unit * 2.5}px`,
    border: `1px solid ${colors.grey}`,
    fontSize: 16,
    outline: 'none',
    ':focus': {
        borderColor: colors.primary,
    },
});
