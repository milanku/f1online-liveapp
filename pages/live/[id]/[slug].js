import { useState, useEffect } from "react";
import { END } from "redux-saga";
import { wrapper } from "../../../redux/store/store";
import { URLS } from "../../../redux/apis/urls";
import onMobile from "../../../utils/onMobile";

import Feed from "../../../components/Feed";
import Chat from "../../../components/Chat";
import LiveBottomButtons from "../../../components/LiveBottomButtons";
//import fontawesomeSubset from 'fontawesome-subset'

import * as S from "./styled546895";
import PartnerPanel from "../../../components/PartnerPanel";
import PostMeta from "../../../components/PostMeta";

function LivePage({ postData }) {
  const [picked, setPicked] = useState(0);

  // console.log(postData)
  return (
    <S.Container>
      <PostMeta key={postData.id + 100000} {...postData} />
      <S.TopRow>
        <S.PartnersPanel isPicked={picked === 0}>
          <PartnerPanel
            articleTitle={postData.title.rendered}
            id={postData.id}
            slug={postData.slug}
          />
        </S.PartnersPanel>
        <S.FeedContainer isPicked={picked === 1}>
          <Feed acf={postData.acf} />
        </S.FeedContainer>
        <S.ChatContainer isPicked={picked === 2}>
          <Chat isOpened={true} />
        </S.ChatContainer>
      </S.TopRow>
      <S.BottomRow picked={picked}>
        <LiveBottomButtons
          pickedIndex={picked}
          onSitePicked={index => setPicked(index)}
        />
      </S.BottomRow>
    </S.Container>
  );
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
    store.dispatch(END);
    const response = await fetch(
      `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}${params.id}?_embed=wp:featuredmedia,author&_fields=id,type,date,excerpt,slug,title,tags,acf`
    )
      .then(res => res.json())
      .then(res => res);
    await store.sagaTask.toPromise();

    if (response.data) {
      let message = "Pri zobrazovaní tejto stránky nastala chyba.";
      if (response.data.status === 404) {
        message = "Žiaľ, takýto článok sme nenašli.";
      }

      return {
        props: { postData: { error: message } },
      };
    }

    return {
      props: {
        postData: response,
      },
    };
  }
);

export default LivePage;
