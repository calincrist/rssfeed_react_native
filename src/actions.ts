import store from './store'
import xml2json from 'simple-xml2json'

export async function fetchFeed(url: string) {
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
