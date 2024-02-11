import React from 'react';
import { CarouselUI } from '../ui/CarouselUI';
import { HomeBlogGrid } from './HomeBlogGrid';

export const HomeScreen = () => {
  return (
    <>
      <section className="hero is-primary is-bold">
        <div className="hero-body animate__animated animate__fadeIn">
          <div className="container is-fluid">
            <h1 className="title">
              Blog Web
            </h1>
            <h2 className="subtitle">
              Proyecto para practicar React
            </h2>
          </div>
        </div>
      </section>
      {/* <section className="hero has-background-link-light">
        <div className="hero-body">
          <p className="title animate__animated animate__fadeIn">Trabajos</p>
        </div>
        <CarouselUI />
      </section> */}
      <HomeBlogGrid />
    </>
  )
}
