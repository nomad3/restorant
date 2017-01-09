import React, { PropTypes } from 'react'
import { ScrollView, Text,Alert } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import TextInputIcon from '../Components/TextInputIcon'
import I18n from '../I18n/I18n.js'
import Config from '../Config/App'
import RoundedButton from '../Components/RoundedButton'
import * as firebase from 'firebase';

var dateFormat = require('dateformat');





// Styles
import styles from './Styles/SubmitScreenStyle'

class SubmitScreen extends React.Component {

  constructor(props) {
   super(props);
   this.ordersFirebase = firebase.database().ref("Orders");
   this.state = {
     name: null,
     phone:null,
     email:null,
     address:null,
     notes:null};
 }

 static propTypes = {
   items: PropTypes.array,
   name: PropTypes.string,
   phone: PropTypes.string,
   email: PropTypes.string,
   address: PropTypes.string,
   notes: PropTypes.string,
 }

 handleChangeName = (text) => {
   this.setState({ name: text })
 }

 handleChangeEmail = (text) => {
   this.setState({ email: text.toLowerCase() })
 }

 handleChangePhone = (text) => {
   this.setState({ phone: text })
 }

 handleChangeAddress = (text) => {
   this.setState({ address: text })
 }

 handleChangeNotes = (text) => {
   this.setState({ notes: text })
 }

 goBack=()=>{
   NavigationActions.pop();
   NavigationActions.pop();
   console.log("POP");
 }

 /**
 * This createas the actual email text
 */
 composeOrder=()=>{
   console.log(this.state)
   console.log(this.props.items);

   var message="\n=============\n";
   var subTotal=0;
   (this.props.items||[]).map((section,i) => {
     message+=(section.name+"\n");
     message+=(section.description+"\n");
     message+=("Qty:"+section.qty+"\n");
     message+=("Price:"+section.qty+" x "+Config.priceToPriceWithCurrency(section.price)+"\n");
     message+=("-------------\n");
     subTotal+=(section.qty*section.price);
   })
   message=="\n=============\n";

   //calculate tax
   var tax=((subTotal/100)*Config.tax);

   //Calucalte total
   var TOTAL=subTotal+tax;
   message+=("Subtotal:"+Config.priceToPriceWithCurrency(subTotal)+"\n");
   message+=("Tax:"+Config.priceToPriceWithCurrency(tax)+"\n");

   message+=("TOTAL:"+Config.priceToPriceWithCurrency(TOTAL)+"\n\n\n\n")

   message+="Name:    "+this.state.name+"\n";
   message+="Phone:   "+this.state.phone+"\n";
   message+="Address: "+this.state.address+"\n";
   message+="Notes:   "+this.state.notes+"\n";
   return message;
 }

 /**
 * Precheck For the order send
 */
 submitOrder=()=>{


   if(this.state.name!=null&&this.state.address!=null&&this.state.email!=null&&this.state.phone!=null&&this.state.notes!=null){
     //It is ok
     this.saveOrderInFirebase()
   }else{
     Alert.alert(
       I18n.t('missingInformation'),
       I18n.t('missingInfo')
     );
   }

 }

 /**
 * SAVE ORDER IN FIREBASE
 */
 saveOrderInFirebase=()=>{
   console.log(this.props.items);
   console.log(this.state);
   var savingObject={items:this.props.items};
   for (var key in this.state) {
      // skip loop if the property is from prototype
      if (!this.state.hasOwnProperty(key)) continue;

      savingObject[key]=this.state[key];

  }
  savingObject.status="new";
  var now = new Date();
  savingObject.date=dateFormat(now, "isoDateTime");
  this.ordersFirebase.push(savingObject);

  var message=this.composeOrder();
  console.log(message);
  this.sengGridSend(message);
 }

  /**
  * SEND GRID SEND
  */
  sengGridSend=(message)=>{
    fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization':'Bearer '+Config.SENDGRID_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      "personalizations": [
        {
          "to": [
            {
              "email": Config.sendToEmail
            }
          ],
          "subject": "New order from "+this.state.name
        }
      ],
      "from": {
        "email": this.state.email
      },
      "content": [
        {
          "type": "text",
          "value": message
        }
      ]
    })
  }).then((response)=>{
    Alert.alert(
      I18n.t('orderReceived'),
      I18n.t('orderMessage')
    );
    this.props.clearCart();
    this.goBack();
  })

  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <TextInputIcon onChangeText={this.handleChangeName} ref='name' icon="user" placeholder={I18n.t('name')}></TextInputIcon>
        <TextInputIcon onChangeText={this.handleChangeEmail} ref='email' icon="envelope-o" placeholder={I18n.t('email')}></TextInputIcon>
        <TextInputIcon onChangeText={this.handleChangePhone} icon="phone" placeholder={I18n.t('phone')}></TextInputIcon>
        <TextInputIcon onChangeText={this.handleChangeAddress} icon="map-marker" placeholder={I18n.t('address')}></TextInputIcon>
        <TextInputIcon onChangeText={this.handleChangeNotes} icon="pencil-square-o" placeholder={I18n.t('notes')}></TextInputIcon>
        <RoundedButton onPress={this.submitOrder}>
          {I18n.t('submitOrder')}
        </RoundedButton>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(Actions.clearCart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitScreen)
