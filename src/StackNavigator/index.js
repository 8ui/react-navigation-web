import React from 'react';

import SwipeableViews from 'react-swipeable-views';

import { defaultContent } from './defaults';

import { Bar } from './bar';

const renderScene = (props) => {
  const Component = props.router.getComponentForRouteName(props.scene.routeName);

  const navigate = props.navigation.navigate;
  props.navigation.navigate = (route, params, action) => {
    props.handleClick(props.navigation.state.index + 1);
    navigate(route, params, action);
  };
  const back = props.navigation.goBack;
  props.navigation.goBack = (route, params, action) => {
    props.handleClick(props.navigation.state.index);
    back(route, params, action);
  };
  const MyRoute = props.navigation.state.routes[props.scene.routeName];

  if (props.config.headerMode === 'screen' && (MyRoute.header || MyRoute.visible === undefined)) {
    const title = MyRoute.title || props.scene.routeName;
    return <div key={props.navigation.state.index}>
      <Bar
        titleStyle={MyRoute.titleStyle || {}}
        route={props.scene.routeName}
        navigation={props.navigation}
        router={props.router}
        config={props.config}
      />
      <Component index={props.navigation.state.index} {...props} />
    </div>;
  }
  return <Component index={props.navigation.state.index} {...props} />;
};

class StackNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  handleClick(index) {
    this.setState({
      index
    })
  }
  render() {
    return (
      <div style={{display: 'flex', flex:1, flexDirection: 'column'}}>
        <SwipeableViews containerStyle={{width: '100%'}} style={{height: '100%', display: 'flex'}} index={this.state.index}>
          {this.props.navigation.state.routes.map(
            (scene, index) => renderScene({
              ...this.props,
              scene,
              index,
              handleClick: this.handleClick.bind(this)
            })
          )}
        </SwipeableViews>
      </div>
    );
  }
}

export default StackNavigator;
