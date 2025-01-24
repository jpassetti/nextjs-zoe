"use client";
import { Fragment } from "react";

import CTA from "../components/custom/CTA";
import HomepageAbout from "@/components/custom/Homepage/About";
import Showcase from "../components/custom/Homepage/Showcase";
import HomepageServices from "@/components/custom/Homepage/Services";

export default function Home() {
 return (
  <Fragment>
   <Showcase />
   <HomepageAbout />
   <HomepageServices />
   <CTA />
  </Fragment>
 );
}
