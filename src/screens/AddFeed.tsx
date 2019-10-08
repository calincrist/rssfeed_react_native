import React, { useState } from 'react'
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from 'native-base'
import { Alert, ActivityIndicator } from 'react-native'
import { addFeed, fetchFeed } from '../actions'
import { useNavigation } from '../hooks/useNavigation'

const AddFeed = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const handleAddPress = async () => {
    if (url.length < 0) {
      return
    }

    setLoading(true)
    try {
      const feed = await fetchFeed(url)
      await addFeed(url, feed)
      setLoading(false)
      navigation.goBack()
    } catch (error) {
      Alert.alert("Couldn't find any rss feed on that url")
      console.warn(error)
      setLoading(false)
    }
  }

  return (
    <Container style={{ padding: 10 }}>
      <Content>
        <Form>
          <Item>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="RSS feed's url"
              onChangeText={changedURL => setUrl(changedURL)}
            />
          </Item>
          <Button block style={{ marginTop: 20 }} onPress={handleAddPress}>
            {loading && (
              <ActivityIndicator color="white" style={{ margin: 10 }} />
            )}
            <Text>Add</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

AddFeed.navigationOptions = () => ({
  title: 'Add RSS feed'
})

export default AddFeed
