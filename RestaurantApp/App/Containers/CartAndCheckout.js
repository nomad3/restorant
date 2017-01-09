import React, { PropTypes } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CartRow from '../Components/CartRow'
import CartTotal from '../Components/CartTotal'
import RoundedButton from '../Components/RoundedButton'
import I18n from '../I18n/I18n.js'

// Styles
import styles from './Styles/CartAndCheckoutStyle'

class CartAndCheckout extends React.Component {

   constructor (props) {
     super(props)
     this.state = {}
   }

   static propTypes = {
     items: PropTypes.array,
   }

   setQty = (index,qty) => {
     console.log("I:"+index+" Qty:"+qty);
     console.log(this.props);
     this.props.updateCart(index,qty);
   }

  render () {
    return (
      <ScrollView style={styles.container}>
        {(this.props.items||[]).map((section,i) => (
          <CartRow action={this.setQty} index={i} element={section} />
        ))}
        <CartTotal items={this.props.items||[]} />
        <RoundedButton onPress={()=>{
          NavigationActions.submitScreen();
        }}>
          {I18n.t('continueToCheckout')}
        </RoundedButton>
      </ScrollView>
    )
  }
}

CartAndCheckout.propTypes = {
  updateCart: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (index,qty) => dispatch(Actions.updateCart(index,qty)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartAndCheckout)
