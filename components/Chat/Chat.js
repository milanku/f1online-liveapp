import styled from 'styled-components'
import onClient from '../../utils/onClient'

const Container = styled.div`
  /*position: fixed;
  top: 100px;
  right: 0;
  height: calc(100vh - 100px);
  width: calc(50vw - 515px + 350px);
  z-index: 10;
  */
  height: 100%;

  //${props => (props.isOpened ? 'position: fixed;' : 'display: none')};
  //height: calc(100vh - 69px);
  width: 100vw;
  top: 69px;
  right: 0;
  z-index: 5;

  @media only screen and (min-width: 1024px) {
    height: 100%;
    width: 100%;
    z-index: 15;
    box-shadow: 0 34px 8px rgba(0, 0, 0, 0.4);
  }
`

function Chat({ isOpened }) {
  return (
    <Container isOpened={isOpened}>
      {onClient() ? (
        /*<iframe
          //className={`${styles.chatFrame}`}
          width="100%"
          height="100%"
          src="https://chat.f1online.sk/channel/chatf1online?layout=embedded"
          frameBorder="0"
          style={{ position: "relative", zIndex: "15" }}
        />*/
        <iframe
          height="100%"
          width="100%"
          //src={`https://www.youtube.com/live_chat?v=o0ollig71T4&embed_domain=f1online.sk`}
          src={`https://www.youtube.com/live_chat?v=o0ollig71T4&embed_domain=localhost`}
          //src={`https://www.youtube.com/live_chat?v=o0ollig71T4&embed_domain=192.168.1.14`}
          frameBorder="0"
          style={{ position: 'relative', zIndex: '15' }}
        />
      ) : null}
    </Container>
  )
}

export default Chat
