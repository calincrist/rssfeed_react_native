import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import FeedsList from '../screens/FeedsList'
// import FeedDetail from './src/screens/FeedDetail.js'
// import EntryDetail from './src/screens/EntryDetail.js'
import AddFeed from '../screens/AddFeed'

const Navigator = createStackNavigator(
  {
    FeedsList: { screen: FeedsList },
    // FeedDetail: { screen: FeedDetail },
    // EntryDetail: { screen: EntryDetail },
    AddFeed: { screen: AddFeed }
  },
  {
    initialRouteName: 'FeedsList'
  }
)

const AppContainer = createAppContainer(Navigator)
export default AppContainer
