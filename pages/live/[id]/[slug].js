import { useState } from 'react'
import { END } from 'redux-saga'
import { wrapper } from '../../../redux/store/store'
import { URLS } from '../../../redux/apis/urls'
import onMobile from '../../../utils/onMobile'

import Feed from '../../../components/Feed'
import Chat from '../../../components/Chat'
import LiveBottomButtons from '../../../components/LiveBottomButtons'
//import fontawesomeSubset from 'fontawesome-subset'

import styled from 'styled-components'

const WIDTHS = {
  LEFT: {
    PC: '250px',
    MOB: '100%'
  },
  FEED: {
    PC: '65%',
    MOB: '100%'
  },
  BOTTOM_ROW_HEIGHT: '50px'
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const TopRow = styled.div`
  height: calc(100% - ${WIDTHS.BOTTOM_ROW_HEIGHT});
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;

  @media only screen and (min-width: 1024px) {
    height: 100%;
  }
`

const BottomRow = styled.div`
  position: relative;
  height: ${WIDTHS.BOTTOM_ROW_HEIGHT};

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`

const PartnersPanel = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: ${props => (props.isPicked ? '0' : '100%')};
  @media only screen and (min-width: 1024px) {
    width: ${WIDTHS.LEFT.PC};
    left: 0;
    height: 100%;
  }
`

const FeedContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: ${props => (props.isPicked ? '0' : '100%')};
  @media only screen and (min-width: 1024px) {
    position: absolute;
    left: ${WIDTHS.LEFT.PC};
    top: 0;
    width: calc(${WIDTHS.FEED.PC} - ${WIDTHS.LEFT.PC});
    height: 100%;
  }
`

const ChatContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: ${props => (props.isPicked ? '0' : '100%')};
  height: 100%;

  @media only screen and (min-width: 1024px) {
    position: absolute;
    left: ${WIDTHS.FEED.PC};
    top: 0;
    width: calc(100% - ${WIDTHS.FEED.PC});
    height: 100%;
  }
`

function LivePage({ postData }) {
  const [picked, setPicked] = useState(1)

  // console.log(postData)
  const { acf } = postData
  return (
    <Container>
      <TopRow>
        <PartnersPanel isPicked={picked === 0}>ss</PartnersPanel>
        <FeedContainer isPicked={picked === 1}>
          <Feed
            startTime={acf.start_time.replace(' ', 'T')} //to match ISO format for subsequent saga requestss
            endTime={acf.end_time.replace(' ', 'T')}
            adsID={acf.reklamy && acf.reklamy !== '' ? acf.reklamy : null}
          />
        </FeedContainer>
        <ChatContainer isPicked={picked === 2}>
          <Chat isOpened={true} />
        </ChatContainer>
      </TopRow>
      <BottomRow picked={picked}>
        {onMobile() && (
          <LiveBottomButtons
            pickedIndex={picked}
            onSitePicked={index => setPicked(index)}
          />
        )}
      </BottomRow>
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
      `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}${params.id}?_embed=wp:featuredmedia,author&_fields=id,type,date,excerpt,slug,title,tags,acf`
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
