import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';

import { BackIconButton } from '../shared/styles';

import lockSvg from '../img/lock.svg';
import mailSvg from '../img/mail.svg';

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20em 0 7.5em 0;
`;

const Input = styled.div`
  border-bottom: 2px #000 solid;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  padding: 0 0.2em;
`;

const Icon = styled.img`
  min-width: 1.75em;
  min-height: 1.75em;
`;

const TextInput = styled.input`
  border: none;
  background: none;
  font-size: 20px;
  outline: none;
  width: 100%;
  padding-left: 0.5em;

  &::placeholder {
    color: #bbbbbb;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  flex-grow: 1;
`;

class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { username: '', password: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      // this.props.dispatch(login(username, password));
    }
  }

  public render() {
    return (
      <React.Fragment>
        <BackIconButton onClick={this.props.history.goBack} />
        <FormContainer name="form" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input>
              <Icon src={mailSvg} />
              <TextInput
                type="text"
                placeholder="email"
                name="username"
                onChange={this.handleChange}
              />
            </Input>
            <Input>
              <Icon src={lockSvg} />
              <TextInput
                type="password"
                placeholder="password"
                name="password"
                onChange={this.handleChange}
              />
            </Input>
            <Link style={{ color: '#000' }} to="resetpassword">
              Forgot password?
            </Link>
          </FormGroup>
          <Button type="submit" color="#000">
            log in
          </Button>
        </FormContainer>
      </React.Fragment>
    );
  }
}

export default connect()(Login);
