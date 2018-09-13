import { Layout } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Map from '../components/Map';
import NoMatch from '../components/NoMatch';
import Splash from '../components/Splash';
import IntroForm from './IntroForm';
import Login from './Login';
import Overview from './Overview';
import Signup from './Signup';

import { IAppPropsExtended } from '../types/app';

let { Content } = Layout;

Content = styled(Content)`
  height: 100vh;
  text-align: center;
`;

class App extends React.Component<IAppPropsExtended> {
  constructor(props: IAppPropsExtended) {
    super(props);

    this.renderMap = this.renderMap.bind(this);
  }

  public render() {
    return (
      <Layout>
        <Content>
          <Switch>
            <Route exact={true} path="/" component={Splash} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/form" component={IntroForm} />
            <Route path="/overview" component={Overview} />
            <Route path="/map" render={this.renderMap} />
            <Route component={NoMatch} />
          </Switch>
        </Content>
      </Layout>
    );
  }

  private renderMap() {
    return <Map activities={this.props.trip.activities} />;
  }
}

const mapStateToProps = (state: IState) => ({
  questions: state.questions,
  trip: state.trip,
  user: state.user
});

export default withRouter(connect(mapStateToProps)(App));
