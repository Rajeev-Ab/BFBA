
import Home from '../screens/home/home'
import TabBar from '../screens/tabBar/tabBar'
import Inquire from '../screens/inquire/inquire'
import { StackNavigator } from 'react-navigation';

const Navigator = StackNavigator({
    Home:{screen:Home},
     TabBar:{screen:TabBar},
     Inquire:{screen:Inquire}
},{
    headerMode: 'none'
});

export default Navigator;
