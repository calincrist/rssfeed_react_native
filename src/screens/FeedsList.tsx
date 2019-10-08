import React from 'react'
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon
} from 'native-base'
import { observer, inject } from 'mobx-react'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationScreenComponent
} from 'react-navigation'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useNavigation } from '../hooks/useNavigation'
import { Store, IFeed } from '../store'

interface IFeedsListProps {
  store: Store
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const FeedsList: NavigationScreenComponent<
  NavigationParams,
  NavigationScreenProp<NavigationState, NavigationParams>
> = ({ store }) => {
  const { feeds } = store
  const navigation = useNavigation()

  const handleFeedPress = (feed: IFeed) => {
    store.selectFeed(feed)
    navigation.navigate('FeedDetail', { feedUrl: feed.url })
  }

  return (
    <Container>
      <Content>
        <List>
          {feeds &&
            feeds.map((feed: IFeed, index: number) => (
              <ListItem key={index} onPress={handleFeedPress(feed)}>
                <Text>{feed.title}</Text>
              </ListItem>
            ))}
        </List>
      </Content>
    </Container>
  )
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>

FeedsList.navigationOptions = ({ navigation }: { navigation: Navigation }) => ({
  title: 'My Feeds',
  headerRight: (
    <Button transparent onPress={() => navigation.navigate('AddFeed')}>
      <Icon name="add" />
    </Button>
  )
})

export default inject('store')(observer(FeedsList))
