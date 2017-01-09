import React, { PropTypes } from 'react'
import { View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import MenuCategoryRow from '../Components/MenuCategoryRow'
import Parallax from "react-native-parallax";
import * as firebase from 'firebase';
import Config from '../Config/App'

// Initialize Firebase
const firebaseConfig = Config.firebaseConfig;
const firebaseApp = firebase.initializeApp(firebaseConfig);


// For empty lists
import AlertMessage from '../Components/AlertMessageComponent'

import FCM from 'react-native-fcm';

// Styles
import styles from './Styles/MenuStyle'

class Menu extends React.Component {

  constructor (props) {
    super(props)

    this.state={
      items:[]
    }

    /* ***********************************************************
    * STEP 2a
    * Get an instance to the Fiebase DB
    *************************************************************/
    this.itemsRef = firebaseApp.database().ref("Categories");

  }

  componentDidMount() {
    console.log("Component Mounted");


    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
        console.log("Token: "+token);
        FCM.subscribeToTopic('/topics/news');
        // store fcm token in your server
    });

    this.listenForItems(this.itemsRef);
  }

  onPress(index){
    //window.alert('Rounded Button Pressed!'+index);
    NavigationActions.foodList({title:this.state.items[index].title,items:this.state.items[index].items});
  }

  /* ***********************************************************
  * STEP 3a
  * 'listenForItems' function to receive and update the items from Firebase
  *************************************************************/
  listenForItems(itemsRef) {

    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      var theReceivedItems=snap.val().items;
      console.log(theReceivedItems);
      for(var i=0;i<theReceivedItems.length;i++){
        console.log(theReceivedItems[i].name);
        items.push({
          title: theReceivedItems[i].name,
          items: theReceivedItems[i].items,
          description:theReceivedItems[i].description,
          photo:{ uri: theReceivedItems[i].photo }
          //_key: child.key
        });
      }
      /*theReceivedItems.forEach((child) => {
        console.log(child.val().name);
        items.push({
          title: child.val().name,
          _key: child.key
        });
      });*/

      this.setState({
        items: items
      });

    });
  }



  render () {
    return (



      <Parallax.ScrollView style={styles.scrollView}>
                  {this.state.items.map((section, i) => (
                      <Parallax.Image
                          key={i}
                          style={styles.image}
                          overlayStyle={styles.overlay}
                          onPress={()=>this.onPress(i)}
                          source={section.photo}
                          parallaxFactor={0.3}>
                          <Text style={styles.title}>{section.title}</Text>
                          <Text style={styles.description}>{section.description}</Text>
                      </Parallax.Image>
                  ))}
              </Parallax.ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
