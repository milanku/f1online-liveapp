import styled from 'styled-components'
import Feed from '../components/Feed'

const WIDTHS = {
  LEFT: {
    PC: '250px',
    MOB: '100%'
  },
  FEED: {
    PC: '600px',
    MOB: '100%'
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const PartnersPanel = styled.div`
  width: ${WIDTHS.LEFT.PC};
  height: 100%;
`

const FeedPanelContainer = styled.div`
  width: ${WIDTHS.FEED.PC};
  height: 100%;
`

export default function Home() {
  return (
    <Container>
      <PartnersPanel>ss</PartnersPanel>
      <FeedPanelContainer>
        <Feed />
      </FeedPanelContainer>
    </Container>
  )
}
