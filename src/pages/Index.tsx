import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Courses from "@/components/Courses";
import KatalogTabs from "@/components/KatalogTabs";
import KatalogFoto from "@/components/KatalogFoto";
import KatalogVideo from "@/components/KatalogVideo";
import Footer from "@/components/Footer";

const Index = () => (
  <main>
    <Header />
    <Hero />
    <About />
    <Courses />
    <KatalogTabs />
    <KatalogFoto />
    <KatalogVideo />
    <Footer />
  </main>
);

export default Index;
