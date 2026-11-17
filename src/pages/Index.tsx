import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Channels from "@/components/Channels";
import Results from "@/components/Results";
import Process from "@/components/Process";
import Team from "@/components/Team";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Lexa Go | Consultoria comercial e aceleração de vendas para editoras</title>
        <meta name="description" content="Consultoria especializada em estratégia comercial, gestão de canais e aceleração de vendas para editoras. Marketplaces, mercado físico, e-books, audiobooks e inteligência comercial." />
        <link rel="canonical" href="https://lexagobr.com/" />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Channels />
        <Results />
        <Process />
        <Team />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
