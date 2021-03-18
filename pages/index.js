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
