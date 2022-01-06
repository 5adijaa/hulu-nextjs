import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Results from '../components/Results'
import requests from '../utils/requests'

export default function Home({results}) {
  console.log(results)
  return (
    <div className=''>
      <Head>
        <title>Hulu 2.0</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>

      {/* Header Component */}
      <Header/>

      {/* Navbar Component */}
      <Nav/>

      {/* Results Component */}
      <Results results={results} />
    </div>
  )
}

export async function getServerSideProps(context){
  // pull the genre from the URL
  const genre = context.query.genre

  // make a get request to the TMDB server
  const request = await fetch(`https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchTrending}`,{
    headers: {
      'Content-Type': 'application/json', 
      'User-Agent': 'Mozilla/5.0'
    }
  })
  .then(response => response.json())

  // after getting the request, make return this data as a prop to the Component
  return {
    props: { // will be passed to the page component as props
      results: request.results
    }
  }
}


