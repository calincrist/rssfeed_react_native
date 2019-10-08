import { observable } from 'mobx'
import { AsyncStorage } from 'react-native'

export interface IFeed {
  title: string
  url: string
  entry: string
  updated: boolean
}

export class Store {
  @observable feeds
  @observable selectedFeed
  @observable selectedEntry

  private persistFeeds = async () => {
    await AsyncStorage.setItem('@feeds', JSON.stringify(this.feeds))
  }

  public retrieveFeeds = async () => {
    const feeds = await AsyncStorage.getItem('@feeds')
    if (!feeds) {
      return []
    }
    this.feeds = JSON.parse(feeds) || []
  }

  public addFeed = async (url: string, feed: IFeed) => {
    this.feeds.push({
      url,
      title: feed.title,
      entry: feed.entry,
      updated: feed.updated
    })

    await this.persistFeeds()
  }

  public removeFeed = async (url: string) => {
    this.feeds = this.feeds.filter((f: IFeed) => {
      return f.url !== url
    })
    await this.persistFeeds()
  }

  public selectFeed(feed: IFeed) {
    this.selectedFeed = feed
  }

  public selectEntry(entry: string) {
    this.selectedEntry = entry
  }
}

const store = new Store()
export default store
