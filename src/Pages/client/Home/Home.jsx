import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import Hero from '../../../components/Hero/Hero'
import './Home.css'
import About from '../../../components/About/About'
import PackageCards from '../../../components/PackageCard/PackageCard'
import Footer from '../../../components/Footer/Footer'


function Home() {
    return (
        <div className="container">
            <Navbar />
            <Hero />
            <About/>
            <PackageCards />
            <Footer/>
        </div>
    )
}

export default Home
