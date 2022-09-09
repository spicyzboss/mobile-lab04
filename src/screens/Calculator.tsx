import { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

type CalculatorState = {
  numberStack: string[];
  operationStack: string[];
  number: string;
  history: string[];
}

class Calculator extends Component<{}, CalculatorState> {
  state = {
    numberStack: [],
    operationStack: [],
    number: "0",
    history: [],
  }

  setNewNumber = (v: string) => {
    this.setState(s => ({
      number: s.number === "0" || s.number === "+" || s.number === "-" || s.number === "*" || s.number === "/" ? v : s.number + v
    }))
  }

  deleteNumber = () => {
    this.setState(s => ({
      number: s.number.slice(0, s.number.length-1) || "0"
    }))
  }

  add = () => {
    this.setState(s => ({
      numberStack: [...s.numberStack, s.number],
      operationStack: [...s.operationStack, "+"],
    }));
    this.setState(s => ({
      number: '+',
    }));
  }

  subtract = () => {
    this.setState(s => ({
      numberStack: [...s.numberStack, s.number],
      operationStack: [...s.operationStack, "-"],
    }));
    this.setState(s => ({
      number: '-',
    }));
  }

  multiply = () => {
    this.setState(s => ({
      numberStack: [...s.numberStack, s.number],
      operationStack: [...s.operationStack, "*"],
    }));
    this.setState(s => ({
      number: '*',
    }));
  }

  divide = () => {
    this.setState(s => ({
      numberStack: [...s.numberStack, s.number],
      operationStack: [...s.operationStack, "/"],
    }));
    this.setState(s => ({
      number: '/',
    }));
  }

  equal = (v: string) => {
    this.setState(s => ({
      number: this.operation(s.numberStack[0], s.number, s.operationStack[0]).toString(),
      numberStack: [],
      operationStack: [],
      history: [...s.history, `${s.numberStack[0]} ${s.operationStack[0]} ${s.number}`]
    }))
  }

  operation = (a: string, b: string, op: string): number => {
    let num1 = parseFloat(a);
    let num2 = parseFloat(b);
    if (op === "+") return num1 + num2;
    else if (op === "-") return num1 - num2;
    else if (op === "*") return num1 * num2;
    else return num1 / num2;
  }

  NUMPAD = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    ".", "0", "=",
  ];

  OPERATIONS: [string, () => void][] = [
    ["DEL", this.deleteNumber],
    ["+", this.add],
    ["-", this.subtract],
    ["*", this.multiply],
    ["/", this.divide]
  ];

  render() {
    return (
      <View>
        <View
          style={CalculatorStyle.topWrapper}
        >
          <View style={{ height: '50%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 60 }}>{ this.state.history[this.state.history.length-1] }</Text>
          </View>
          <View style={{ height: '50%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 60 }}>{ this.state.number }</Text>
          </View>
        </View>
        <View
          style={CalculatorStyle.padWrapper}
        >
            <View style={CalculatorStyle.numpadWrapper}>
              {
                this.NUMPAD.map(v => {
                  if (v === "=") {
                    return (
                      <TouchableOpacity style={CalculatorStyle.numpad} onPress={() => this.equal(v)}>
                        <Text style={CalculatorStyle.numpadText}>{ v }</Text>
                      </TouchableOpacity>
                    )
                  } else {
                    return (
                      <TouchableOpacity style={CalculatorStyle.numpad} onPress={() => this.setNewNumber(v)}>
                        <Text style={CalculatorStyle.numpadText}>{ v }</Text>
                      </TouchableOpacity>
                    )
                  }
                })
              }
            </View>
            <View style={CalculatorStyle.operationPadWrapper}>
              {
                this.OPERATIONS.map(v => (
                  <TouchableOpacity style={CalculatorStyle.operationPad} onPress={() => v[1]()}>
                    <Text style={CalculatorStyle.operationPadText}>{ v[0].toString() }</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
        </View>
      </View>
    )
  }
}

const CalculatorStyle = StyleSheet.create({
  topWrapper: {
    backgroundColor: 'white',
    height: '45%',
    display: 'flex',
  },
  padWrapper: {
    backgroundColor: 'gray',
    height: '55%',
    display: 'flex',
    flexDirection: 'row',
  },
  numpadWrapper: { flex: 1, flexDirection: 'row', flexWrap: 'wrap' },
  operationPadWrapper: { display: 'flex', width: '25%', backgroundColor: 'lightgray' },
  numpad: { height: 100, width: 100, justifyContent: 'center', alignItems: 'center' },
  numpadText: { fontSize: 30 },
  operationPad: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  operationPadText: { fontSize: 30 },
})

export default Calculator;
