import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-xl leading-6 space-y-2">
        <p>
          Hi, I'm <strong>Jonathan</strong> 👋 I'm a software engineer at
          Northwestern Mutual and this is a sample site built using Next.js!
        </p>
      </section>
      <section className="text-xl leading-6 mt-4">
        <h2 className="text-2xl font-semibold leading-6 my-4">Blog</h2>
        <ul className="space-y-4">
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a className="font-semibold text-blue-500 hover:text-blue-700">
                  {title}
                </a>
              </Link>
              <br />
              <span className="text-sm text-gray-500">{date}</span>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
