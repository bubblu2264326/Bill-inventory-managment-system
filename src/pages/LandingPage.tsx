import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
    </>
  );
}