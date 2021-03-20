import { useState } from 'react'
import { END } from 'redux-saga'
import { wrapper } from '../../../redux/store/store'
import { URLS } from '../../../redux/apis/urls'
import onMobile from '../../../utils/onMobile'

import styled from 'styled-components'
import Feed from '../components/Feed'


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const FeedPanelContainer = styled.div`
  width: ${WIDTHS.FEED.PC};
  height: 100%;
`

export default function Home() {
  return (
    <Container>
      <FeedPanelContainer>
        <Feed />
      </FeedPanelContainer>
    </Container>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    /*fontawesomeSubset(
      {
        solid: [
          'circle-notch',
          'chevron-up',
          'chevron-down',
          'spin',
          'fa-spin',
          'paperclip',
          'play-circle',
          'circle',
          'comment-slash',
          'burn',
          'external-link-alt',
          'euro-sign',
          'heart',
          'flag',
          'rss',
          'arrows-alt-h',
          'home'
        ],
        regular: [
          'comments',
          'comment',
          'heart',
          'flag',
          'clock',
          'copyright',
          'newspaper'
        ],
        brands: ['facebook-f', 'youtube', 'twitter', 'instagram']
      },
      'public/fonts/FontAwesome'
    )
*/
    store.dispatch(END)
    const response = await fetch(
      `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}${params.id}?tags=&wp:featuredmedia,author&_fields=id,type,date,excerpt,slug,title,tags,acf`
    )
      .then(res => res.json())
      .then(res => res)
    await store.sagaTask.toPromise()

    if (response.data) {
      let message = 'Pri zobrazovaní tejto stránky nastala chyba.'
      if (response.data.status === 404) {
        message = 'Žiaľ, takýto článok sme nenašli.'
      }

      return {
        props: { postData: { error: message } }
      }
    }

    return {
      props: {
        postData: response
      }
    }
  }
)

export default LivePage
