import { useEffect } from 'react'
import { END } from 'redux-saga'
import { wrapper } from '../../../redux/store/store'
import { URLS } from '../../../redux/apis/urls'

function LivePage(props) {
  console.log(props)
  return <div>LVE</div>
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
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
