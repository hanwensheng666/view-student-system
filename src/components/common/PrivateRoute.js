import React from 'react';
import { connect } from 'react-redux';
import { Route , Redirect} from 'react-router-dom'

/**
 * 路由前置判断（已登录用户，直接跳转；未登录用户，提示并跳转登录）
 * @returns {Object} React Route 组件
 */
class PrivateRoute extends React.Component {
  render() {
    const { component: Component, isLogin, ...rest } = this.props;
    return (
      <Route
        {...rest}    
        render={props =>
          isLogin ? <Component {...props} /> : <Redirect to='/login' /> 
        }
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    name: state.auth.userInfo.name
  };
};
export default connect(mapStateToProps)(PrivateRoute);
