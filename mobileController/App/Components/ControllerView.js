var React = require('react-native');
var IconIon = require('react-native-vector-icons/Ionicons');
var Orientation = require('react-native-orientation');
var api = require('../Utils/api');
var Settings = require('./Settings');
var _ = require('lodash');

var {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StatusBarIOS,
  VibrationIOS,
  PanResponder
} = React;

class ControllerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //used to scale sizes of buttons depending on phone resolution
      circleButtonSize: undefined,
      arrowButtonSize: undefined,
      selectStartButtonSize: undefined,
      //used to detect changes in the D-Pad
      dPadButton: undefined, //currently pressed D-pad button
      previousDPadButton: undefined,
      dPadButtonChange: false, //has the user rolled their finger from one of the arrow buttons to another: used to see when to release the first button
    }
  }

  componentWillMount() {
      this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

        onPanResponderGrant: (evt, gestureState) => {
          // The gesture has started
          // console.log('grant gestureState', gestureState.numberActiveTouches);
          // console.log('grant evt', evt);

          // var x2 = gestureState.moveX;
          // var y2 = gestureState.moveY;

          // var distanceToUp = Math.sqrt( (140-x2)*(140-x2) + (132.5-y2)*(132.5-y2) );
          // var distanceToRight = Math.sqrt( (186.5-x2)*(186.5-x2) + (180-y2)*(180-y2) );
          // var distanceToDown = Math.sqrt( (140-x2)*(140-x2) + (228.5-y2)*(228.5-y2) );
          // var distanceToLeft = Math.sqrt( (94.5-x2)*(94.5-x2) + (180-y2)*(180-y2) );

          // var closest = Math.min(distanceToUp, distanceToRight, distanceToDown, distanceToLeft);

          // if(closest===distanceToUp) {
          //   console.log('up arrow pressed');
          // } else if (closest===distanceToRight) {
          //   console.log('right arrow pressed');
          // } else if (closest===distanceToDown) {
          //   console.log('down arrow pressed');
          // } else if (closest===distanceToLeft) {
          //   console.log('left arrow pressed');
          // }

        },
        onPanResponderMove: (evt, gestureState) => {
          // console.log('move gestureState', gestureState);

          var x2 = gestureState.moveX;
          var y2 = gestureState.moveY;

          var distanceToUp = Math.sqrt( (140-x2)*(140-x2) + (132.5-y2)*(132.5-y2) );
          var distanceToRight = Math.sqrt( (186.5-x2)*(186.5-x2) + (180-y2)*(180-y2) );
          var distanceToDown = Math.sqrt( (140-x2)*(140-x2) + (228.5-y2)*(228.5-y2) );
          var distanceToLeft = Math.sqrt( (94.5-x2)*(94.5-x2) + (180-y2)*(180-y2) );

          var closest = Math.min(distanceToUp, distanceToRight, distanceToDown, distanceToLeft);

          if(closest===distanceToUp) {
            // console.log('up arrow pressed');
            this._upArrowPressIn(); 
          } else if (closest===distanceToRight) {
            // console.log('right arrow pressed');
            this._rightArrowPressIn(); 
          } else if (closest===distanceToDown) {
            // console.log('down arrow pressed');
            this._downArrowPressIn(); 
          } else if (closest===distanceToLeft) {
            // console.log('left arrow pressed');
            this._leftArrowPressIn(); 
          }
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
          var x2 = gestureState.moveX;
          var y2 = gestureState.moveY;

          //TODO: don't hardcode theses points of the D-Pad buttons
          var distanceToUp = Math.sqrt( (140-x2)*(140-x2) + (132.5-y2)*(132.5-y2) );
          var distanceToRight = Math.sqrt( (186.5-x2)*(186.5-x2) + (180-y2)*(180-y2) );
          var distanceToDown = Math.sqrt( (140-x2)*(140-x2) + (228.5-y2)*(228.5-y2) );
          var distanceToLeft = Math.sqrt( (94.5-x2)*(94.5-x2) + (180-y2)*(180-y2) );

          var closest = Math.min(distanceToUp, distanceToRight, distanceToDown, distanceToLeft);

          if(closest===distanceToUp) {
            // console.log('up arrow released');
            this._upArrowPressOut(); 
          } else if (closest===distanceToRight) {
            // console.log('right arrow released');
            this._rightArrowPressOut(); 
          } else if (closest===distanceToDown) {
            // console.log('down arrow released');
            this._downArrowPressOut(); 
          } else if (closest===distanceToLeft) {
            // console.log('left arrow released');
            this._leftArrowPressOut(); 
          }
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      });
    }


  componentDidMount() {
    Orientation.lockToLandscapeRight(); //this will lock the view to Landscape

    //buttons must scale with size of the phone   
    if(Dimensions.get('window').width===375) { //iPhone 6/6s
      this.setState({
        circleButtonSize: 62,
        arrowButtonSize: 52,
        selectStartButtonSize: 45
      })
    } else if (Dimensions.get('window').width===414) { //iPhone 6+/6s+
      this.setState({
        circleButtonSize: 68,
        arrowButtonSize: 58,
        selectStartButtonSize: 45
      })
    } else if (Dimensions.get('window').width===320) { //iPhone 5/5s
      this.setState({
        circleButtonSize: 53,
        arrowButtonSize: 44,
        selectStartButtonSize: 40
      })
    }
  }

  //Right thumb buttons: A, B, X, Y
  _APressIn() {
    console.log('A pressed');
  }
  _APressOut(event) {
    console.log('A released')
  }

  _BPressIn() {
    console.log('B pressed')
  }
  _BPressOut() {
    console.log('B released')
  }

  _XPressIn() {
    console.log('X pressed')
  }
  _XPressOut() {
    console.log('X released')
  }

  _YPressIn() {
    console.log('Y pressed')
  }
  _YPressOut() {
    console.log('Y released')
  }

  //Left thumb buttons: Direction pad
  _upArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='up') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      if(this.state.dPadButton==='down') {
        this._downArrowPressOut();
      } else if(this.state.dPadButton==='left') {
        this._leftArrowPressOut();
      } else if(this.state.dPadButton==='right') {
        this._rightArrowPressOut();
      }
    }
    console.log('up arrow pressed');
    this.setState({dPadButton: "up"});
  }
  _upArrowPressOut() {
    console.log('up arrow released');
    this.setState({dPadButton: undefined});
  }

  _downArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='down') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      // this.setState({previousDPadButton:this.state.dPadButton});
      if(this.state.dPadButton==='up') {
        this._upArrowPressOut();
      } else if(this.state.dPadButton==='left') {
        this._leftArrowPressOut();
      } else if(this.state.dPadButton==='right') {
        this._rightArrowPressOut();
      }
    }
    console.log('down arrow pressed');
    this.setState({dPadButton: "down"});
  }
  _downArrowPressOut() {
    console.log('down arrow released');
    this.setState({dPadButton: undefined});
  }

  _rightArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='right') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      // this.setState({previousDPadButton:this.state.dPadButton});
      if(this.state.dPadButton==='down') {
        this._downArrowPressOut();
      } else if(this.state.dPadButton==='left') {
        this._leftArrowPressOut();
      } else if(this.state.dPadButton==='up') {
        this._upArrowPressOut();
      }
    }
    console.log('right arrow pressed');
    this.setState({dPadButton: "right"});
  }
  _rightArrowPressOut() {
    console.log('right arrow released');
    this.setState({dPadButton: undefined});
  }

  _leftArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='left') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      // this.setState({previousDPadButton:this.state.dPadButton});
      if(this.state.dPadButton==='down') {
        this._downArrowPressOut();
      } else if(this.state.dPadButton==='up') {
        this._upArrowPressOut();
      } else if(this.state.dPadButton==='right') {
        this._rightArrowPressOut();
      }
    }
    console.log('left arrow pressed');
    this.setState({dPadButton: "left"});
  }
  _leftArrowPressOut() {
    console.log('left arrow released');
    this.setState({dPadButton: undefined});
  }

  //Index finger buttons: Left and Right Shoulders. 
  //TODO: implement shoulder buttons on screen, or ideally with volume rocker
  _rightShoulderPressIn() {
    console.log('right shoulder pressed')
  }
  _rightShoulderPressOut() {
    console.log('right shoulder released')
  }

  _leftShoulderPressIn() {
    console.log('left shoulder pressed')
  }
  _leftShoulderPressOut() {
    console.log('left shoulder released')
  }

  //Start and Select buttons; never held down, so an onPress event is used instead of an onPressIn and onPressOut pair
  _startPress() {
    console.log('start pressed')
  }
  _selectPress() {
    console.log('select released')
  }

  _onResponderTerminationRequest(evt) {
    console.log('termination request');
    return false;
  }

  _onStartShouldSetResponderCapture(evt) {
    console.log('button pressed')
    console.log('X:', evt.nativeEvent.locationX, 'Y:', evt.nativeEvent.locationY);
  }

  _onResponderRelease() {
    console.log('button released');
  } 

  _onResponderTerminate() {
    console.log('has been terminated');
  }

  render() {
    StatusBarIOS.setHidden('true');
    return (
      <View style={styles.imageContainer}>
        <Image source={require('./Assets/snescontrollercropped.jpg')} style={styles.image}> 

          <View style={styles.AButton} onTouchStart={this._APressIn.bind(this)} onTouchEnd={this._APressOut.bind(this)}> 
            <IconIon name="record" size={this.state.circleButtonSize} color="#a82530"/>
          </View>
          <View style={styles.BButton} onTouchStart={this._BPressIn.bind(this)} onTouchEnd={this._BPressOut.bind(this)}> 
            <IconIon name="record" size={this.state.circleButtonSize} color="#d9a04c"/>
          </View>
          <View style={styles.XButton} onTouchStart={this._XPressIn.bind(this)} onTouchEnd={this._XPressOut.bind(this)}> 
            <IconIon name="record" size={this.state.circleButtonSize} color="#3645ba"/>
          </View>
          <View style={styles.YButton} onTouchStart={this._YPressIn.bind(this)} onTouchEnd={this._YPressOut.bind(this)}> 
            <IconIon name="record" size={this.state.circleButtonSize} color="#428a43"/>
          </View>

          <View {...this._panResponder.panHandlers}>
            <View style={styles.upButton} onTouchStart={this._upArrowPressIn.bind(this)}  onTouchEnd={this._upArrowPressOut.bind(this)}> 
              <IconIon name="stop" size={this.state.arrowButtonSize} color="rgba(0,0,0,0.2)"/>
            </View>
            <View style={styles.downButton} onTouchStart={this._downArrowPressIn.bind(this)} onTouchEnd={this._downArrowPressOut.bind(this)}> 
              <IconIon name="stop" size={this.state.arrowButtonSize} color="rgba(0,0,0,0.2)"/>
            </View>
            <View style={styles.leftButton} onTouchStart={this._leftArrowPressIn.bind(this)} onTouchEnd={this._leftArrowPressOut.bind(this)}> 
              <IconIon name="stop" size={this.state.arrowButtonSize} color="rgba(0,0,0,0.2)"/>
            </View>
            <View style={styles.rightButton} onTouchStart={this._rightArrowPressIn.bind(this)} onTouchEnd={this._rightArrowPressOut.bind(this)}> 
              <IconIon name="stop" size={this.state.arrowButtonSize} color="rgba(0,0,0,0.2)"/>
            </View>
          </View>



          <View style={styles.selectButton}> 
            <TouchableOpacity onPressIn={this._selectPress.bind(this)}>
              <IconIon name="edit" size={this.state.selectStartButtonSize} color="rgba(0,0,0,0.08)"/>
            </TouchableOpacity>
          </View>
          <View style={styles.startButton}> 
            <TouchableOpacity onPressIn={this._startPress.bind(this)}>
              <IconIon name="edit" size={this.state.selectStartButtonSize} color="rgba(0,0,0,0.08)"/>
            </TouchableOpacity>
          </View>

        </Image>
      </View>

    );
  }
}

var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').width,
  },
  AButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.3875,
    left: Dimensions.get('window').height * 0.848,
  },
  BButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.5215,
    left: Dimensions.get('window').height * 0.7525,
  },
  XButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.255,
    left: Dimensions.get('window').height * 0.752,
  },
  YButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.3875,
    left: Dimensions.get('window').height * 0.655,
  },
  rightButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.405,
    left: Dimensions.get('window').height * 0.24,
  },
  downButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.51,
    left: Dimensions.get('window').height * 0.18,
  },
  upButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.30,
    left: Dimensions.get('window').height * 0.18,
  },
  leftButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.405,
    left: Dimensions.get('window').height * 0.12,
  },
  selectButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.47,
    left: Dimensions.get('window').height * 0.38,
  },
  startButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.47,
    left: Dimensions.get('window').height * 0.49,
  }
});

module.exports = ControllerView;