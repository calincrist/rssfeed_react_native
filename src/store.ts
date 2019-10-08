import { decorate, observable } from 'mobx'
import { AsyncStorage } from 'react-native'

export interface IEntry {
  title: string
  description: string
  link: string
  pubdate: string
}

export interface IFeed {
  title: string
  url: string
  entry: IEntry[]
  updated: boolean
}

export class Store {
  public feeds: IFeed[] = []
  public selectedFeed: IFeed = null
  public selectedEntry: string = null

  private persistFeeds = async () => {
    console.log('Persiting feeds:', {
      feeds: this.feeds
    })
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
    console.log({
      url,
      feed
    })
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

decorate(Store, {
  feeds: observable,
  selectFeed: observable,
  selectEntry: observable
})

const store = new Store()
export default store
