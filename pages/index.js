import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from '../components/layout'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className='text-xl leading-6 space-y-2'>
        <p>Hi, I'm <strong>Jonathan</strong> 👋 I'm a software engineer at
        Northwestern Mutual and this is a sample site built using Next.js!</p>
      </section>
    </Layout>
  );
}
