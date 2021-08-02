import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className='text-xl leading-6 space-y-2'>
        <p>Hi, I'm <strong>Jonathan</strong> 👋 I'm a software engineer at
        Northwestern Mutual and this is a sample site built using Next.js!</p>
      </section>
      <section className='text-xl leading-6 mt-4'>
        <h2 className='text-2xl font-semibold leading-6 my-4'>Blog</h2>
        <ul className='space-y-4'>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
