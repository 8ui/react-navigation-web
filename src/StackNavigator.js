import React from 'react';

import SwipeableViews from 'react-swipeable-views';

const renderScene = (props) => {
  const Component = props.router.getComponentForRouteName(props.scene.routeName);
  
  const navigate = props.navigation.navigate;
  props.navigation.navigate = (route, params, action) => {
    props.handleClick(props.index + 1);
    navigate(route, params, action);
  };
  const back = props.navigation.goBack;
  props.navigation.goBack = (route, params, action) => {
    props.handleClick(props.index);
    back(route, params, action);
  };

  return <Component index={props.index} key={props.index} {...props} />;
};

class StackNavigator extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
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
      <div>
        <SwipeableViews index={this.state.index}>
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