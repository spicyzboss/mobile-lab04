import { Component } from 'react';
import { Text, View, Button } from 'react-native';

type IncrementState = {
  count: number;
  visible: boolean;
}

class Increment extends Component<{}, IncrementState> {
  state = {
    count: 0,
    visible: true,
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<IncrementState>) {
    console.log("componentDidUpdate called.");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount called.");
  }

  componentDidMount() {
    console.log("componentDidMount called.");
  }

  increment = () => {
    this.setState(s => ({
      count: s.count + 1
    }))
  };

  hide = () => {
    this.setState(s => ({
      visible: false,
      count: 0,
    }))
  }

  show = () => {
    this.setState(s => ({
      visible: true
    }))
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {
          this.state.visible ?
          <>
            <Text style={{ fontSize: 50 }}>{ this.state.count }</Text>
            <Button title='INCREMENT' onPress={this.increment} />
            <Button title='UNMOUNT' onPress={this.hide} />
          </>
          :
          <Button title='MOUNT' onPress={this.show} />
        }
      </View>
    )
  }
}

export default Increment;
