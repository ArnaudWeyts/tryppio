import { Layout } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import './App.css';

import Map from '../components/Map';
import IntroForm from './IntroForm';
import Overview from './Overview';

import { IAppPropsExtended } from '../types/app';

const { Content } = Layout;

class App extends React.Component<IAppPropsExtended> {
  constructor(props: IAppPropsExtended) {
    super(props);

    this.renderMap = this.renderMap.bind(this);
  }

  public render() {
    return (
      <Layout>
        <Content style={{ height: '100vh', textAlign: 'center' }}>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => <Redirect to="/form" />}
            />
            <Route path="/form" component={IntroForm} />
            <Route path="/overview" component={Overview} />
            <Route path="/map" render={this.renderMap} />
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
