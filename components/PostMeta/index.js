import Head from "next/head";
import decodeHtml from "../../utils/decodeHtml";

function PostMeta({ title, excerpt, id, date, slug, _embedded }) {
  const regex = /(<([^>]+)>)/gi;
  const metaText = decodeHtml(excerpt.rendered).replace(regex, "");
  const metaDesc = `${
    metaText.length > 140 ? `${metaText.substr(0, 140)}\u2026` : metaText
  }`;

  return (
    <Head>
      <title key="meta_title">{`${decodeHtml(
        title.rendered
      )} | ${"Magazín F1 - F1online.sk"}`}</title>
      <meta key="meta_oglocale" property="og:locale" content="sk_SK" />
      <meta name="robots" content="index, follow" />
      <meta
        key="meta_publishtime"
        property="article:published_time"
        content={date}
      />
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="description" content={metaDesc} />
      <meta key="meta_type" property="og:type" content="article" />
      <meta
        key="meta_ogtitle"
        property="og:title"
        content={`${decodeHtml(
          title.rendered
        )} | ${"Magazín F1 - F1online.sk"}`}
      />
      <meta
        key="meta_description"
        property="og:description"
        content={metaDesc}
      />
      <meta
        key="meta_url"
        property="og:url"
        content={`https://f1online.sk/clanky/${id}/${slug}`}
      />
      <meta
        key="meta_image"
        property="og:image"
        content={
          _embedded["wp:featuredmedia"][0].source_url
            ? _embedded["wp:featuredmedia"][0].source_url
            : "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png"
        }
      />
      <meta
        name="twitter:image"
        content={
          _embedded["wp:featuredmedia"][0].source_url
            ? _embedded["wp:featuredmedia"][0].source_url
            : "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png"
        }
      />
      <meta name="twitter:site" content="@f1onlinesk" />
      <meta
        name="twitter:title"
        content={`${decodeHtml(
          title.rendered
        )} | ${"Magazín F1 - F1online.sk"}`}
      />
      <meta
        key="meta_image_height"
        property="og:image:height"
        content={_embedded["wp:featuredmedia"][0].media_details.height}
      />
      <meta
        key="og_image_width"
        property="og:image:width"
        content={_embedded["wp:featuredmedia"][0].media_details.width}
      />
      <meta
        key="twitter_image_height"
        name="twitter:image:height"
        content={_embedded["wp:featuredmedia"][0].media_details.height}
      />
      <meta
        key="twitter_image_width"
        name="twitter:image:width"
        content={_embedded["wp:featuredmedia"][0].media_details.width}
      />
    </Head>
  );
}

export default PostMeta;
