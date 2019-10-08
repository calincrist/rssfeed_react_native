import store from './store'
import xml2json from 'simple-xml2json'
import { IFeed } from './store'

export const fetchFeed = async (url: string) => {
  const response = await fetch(url)
  const xml = await response.text()
  const json = xml2json.parser(xml)

  return {
    entry:
      (json.feed && json.feed.entry) || (json.rss && json.rss.channel.item),
    title:
      (json.feed && json.feed.title) || (json.rss && json.rss.channel.title),
    updated: (json.feed && json.feed.updated) || null
  }
}

export const selectFeed = (feed: IFeed) => {
  store.selectFeed(feed)
}

export const selectEntry = (entry: string) => {
  store.selectEntry(entry)
}

export const addFeed = async (url: string, feed: IFeed) => {
  store.addFeed(url, feed)
}

export const removeFeed = async (url: string) => {
  store.removeFeed(url)
}
