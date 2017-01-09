import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics, ApplicationStyles } from '../Themes/'
import I18n from '../I18n/I18n.js'


// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import AllComponentsScreen from '../Containers/AllComponentsScreen'
import UsageExamplesScreen from '../Containers/UsageExamplesScreen'
import LoginScreen from '../Containers/LoginScreen'
import ListviewExample from '../Containers/ListviewExample'
import ListviewGridExample from '../Containers/ListviewGridExample'
import MapviewExample from '../Containers/MapviewExample'
import APITestingScreen from '../Containers/APITestingScreen'
import ThemeScreen from '../Containers/ThemeScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'
import MenuList from '../Containers/Menu'
import FoodListPerCategory from '../Containers/FoodListPerCategory'
import ProductScreen from '../Containers/ProductScreen'
import CartAndCheckout from '../Containers/CartAndCheckout'
import SubmitScreen from '../Containers/SubmitScreen'
import Contact from '../Containers/Contact'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>

            <Scene initial key='menuList' component={MenuList} title='Menu'  renderLeftButton={NavItems.hamburgerButton} renderRightButton={NavItems.cartButton} />
            <Scene key='foodList' component={FoodListPerCategory} title='FoodListPerCategory'  renderRightButton={NavItems.cartButton} />
            <Scene key='productScreen' component={ProductScreen} title='Product Screen'  renderRightButton={NavItems.cartButton} />
            <Scene key='cartandcheckout' component={CartAndCheckout} title='Order' />
            <Scene key='submitScreen' component={SubmitScreen} title='Submit' />
            <Scene key='contact' component={Contact} title='Contact' />



            <Scene key='presentationScreen' component={PresentationScreen} title='Ignite'   />
            <Scene key='componentExamples' component={AllComponentsScreen} title='Components' />
            <Scene key='usageExamples' component={UsageExamplesScreen} title='Usage' rightTitle='Example' onRight={() => window.alert('Example Pressed')} />
            <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
            <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
            <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid' />
            <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example' />
            <Scene key='apiTesting' component={APITestingScreen} title='API Testing' />
            <Scene key='theme' component={ThemeScreen} title='Theme' />
            <Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info' />

          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
