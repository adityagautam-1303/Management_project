import React from "react";
import Hero from "../components/Hero";
import Aboutus from "../components/Aboutus";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";
const Home = ()=>{
  return (
    <>
    <Hero
    title={"Welcome to Wellness Way Hospital"}
    imageUrl={"/hero.png"}
    />
    <Aboutus imageUrl={"/about.png"}>
    </Aboutus>
    <Departments></Departments>
    <MessageForm></MessageForm>
    </>
  )
}

export default Home