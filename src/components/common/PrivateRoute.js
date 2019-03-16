import React from 'react';
import { connect } from 'react-redux';
import { Route , Redirect} from 'react-router-dom'
import { IDENTITY } from '@/basic/config/identity'
import Error from '@/containers/Error/Error'
/**
 * 路由前置判断（已登录用户，直接跳转；未登录用户，提示并跳转登录）
 * @returns {Object} React Route 组件
 */

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, isLogin,identity,verifiy = IDENTITY.ALL, ...rest } = this.props;
    let c = null;
    let pass = isLogin && 
    (
      verifiy === IDENTITY.ALL ||  verifiy === identity || 
      (verifiy === IDENTITY.TEACHER_MANAGER && (identity === 1 || identity === 2))
    )
    if(pass){//已登录 无需验证身份 或 或身份验证通过
      c = (<Route
        {...rest}    
        render={props =>
          <Component {...props} />
        }
      />)
    }else{//不通过
      c = (<Route
        {...rest}    
        render={props =>
          isLogin ? <Error msg='您没有权限访问此页面哦！' /> : <Redirect to='/login' /> 
        }
      />)
    }
    return (
      <div>
        {c}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    name: state.auth.userInfo.name,
    identity:state.auth.userInfo.identity
  };
};
export default connect(mapStateToProps)(PrivateRoute);
