import { Link } from "react-router-dom";
import { Container } from "@/layout/Section";

const NotFound = () => (
  <section className="py-24">
    <Container className="max-w-2xl">
      <h1 className="text-4xl md:text-5xl">Página não encontrada</h1>
      <p className="mt-4 text-lg text-muted-foreground">O endereço pode ter mudado. Veja onde podemos ajudar:</p>
      <ul className="mt-6 space-y-2 text-lg">
        <li><Link to="/" className="font-semibold text-accent hover:underline">Página inicial</Link></li>
        <li><Link to="/servicos" className="font-semibold text-accent hover:underline">Serviços</Link></li>
        <li><Link to="/contato" className="font-semibold text-accent hover:underline">Contato</Link></li>
      </ul>
    </Container>
  </section>
);

export default NotFound;
