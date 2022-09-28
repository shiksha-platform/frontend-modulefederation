import { Box } from 'native-base'
import React from 'react'
import Scroll from 'react-infinite-scroll-component'

export default function InfiniteScroll({ items, fetchMoreData, children }) {
  return (
    <Scroll
      dataLength={items.length}
      next={fetchMoreData}
      style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
      inverse={true} //
      hasMore={true}
      loader={<h4>Loading...</h4>}
      scrollableTarget='scrollableDiv'
    >
      {children}
    </Scroll>
  )
}
