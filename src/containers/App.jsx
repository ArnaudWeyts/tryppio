import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import './App.css';
import Intro from '../components/Intro';
import { addPreference } from '../actions/user';
import { routeToPage } from '../actions/routing';
import { nextQuestion } from '../actions/questions';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.answerCallback = this.answerCallback.bind(this);
  }

  answerCallback(answer) {
    const { current, maxQuestions } = this.props.questions;
    if (answer) {
      this.props.addPreference(answer);
    }
    if (current + 1 === maxQuestions) {
      this.props.routeToPage('home');
    }
    this.props.nextQuestion();
  }

  render() {
    const {
      routing: { page },
      questions,
    } = this.props;

    return (
      <div className="App">
        <Layout>
          <Content style={{ height: '100vh' }}>
            {page === 'intro' && <Intro questions={questions} answer={this.answerCallback} />}
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  routing: state.routing,
  questions: state.questions,
});

const mapDispatchToProps = dispatch => ({
  addPreference: preference => dispatch(addPreference(preference)),
  routeToPage: page => dispatch(routeToPage(page)),
  nextQuestion: () => dispatch(nextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
