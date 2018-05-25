import React from 'react';
import { Layout, Icon } from 'antd';
import { connect } from 'dva';
import { Route, Switch } from 'dva/router';
import DocumentTitle from 'react-document-title';
import pathToRegexp from 'path-to-regexp';

import GlobalFooter from '../components/GlobalFooter';
import GlobalHeader from '../components/GlobalHeader';
import NotFound from '../routes/Exception/404';
import logo from '../assets/logo.svg';

import styles from './SiderLayout.less';

const { Content, Footer } = Layout;

@connect(({ user }) => ({
  currentUser: user,
}))
export default class AppLayout extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Tixguru';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - Tixguru`;
    }
    return title;
  }

  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch({ type: 'login/logout' });
    }
  };

  render() {
    // const { currentUser: { email } = {} } = this.props;
    const matchRoute = this.props.routerData[this.props.match.path];
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <Layout className={styles.layout}>
          <Layout.Header>
            <GlobalHeader
              logo={logo}
              onMenuClick={this.handleMenuClick}
              currentUser={this.props.currentUser}
            />
          </Layout.Header>
          <Content className={styles.content}>
            <Layout style={{ background: '#fff', minHeight: window.innerHeight - 100 }}>
              {/* <Layout.Sider width={300} className={styles.sider}>
                <h1>User Profile</h1>
                <div>
                  Email
                  <p>{email}</p>
                </div>
                <h2>Verifications</h2>
                <div className={styles.verification}>
                  <Icon type="check-circle-o" />Email Verification
                </div>
                <div className={styles.verification}>
                  <Icon type="exclamation-circle-o" />
                  <Link to="/app">Wallet Verification</Link>
                </div>
              </Layout.Sider> */}
              <Content style={{ padding: '0 24px', minHeight: '100%' }}>
                <Switch>
                  {matchRoute && (
                    <Route
                      path={this.props.match.path}
                      component={matchRoute.component}
                      exact={this.props.match.isExact}
                    />
                  )}
                  <Route render={NotFound} />
                </Switch>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter
              copyright={
                <React.Fragment>
                  Copyright <Icon type="copyright" /> 2018 Tixguru
                </React.Fragment>
              }
            />
          </Footer>
        </Layout>
      </DocumentTitle>
    );
  }
}
