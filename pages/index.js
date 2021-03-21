export default function Index() {
  return null;
}

export async function getServerSideProps({ res, params }) {
  res.statusCode = 302;
  res.setHeader("Location", `https://f1online.sk/`);
  return { props: {} };
}
