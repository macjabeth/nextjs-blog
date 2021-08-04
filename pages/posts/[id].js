import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <h1 className="font-bold text-xl mt-8">{postData.title}</h1>
      <Date
        className="font-semibold text-sm block mb-8 mt-1 text-gray-500"
        dateString={postData.date}
      />

      <div
        className="posts"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
