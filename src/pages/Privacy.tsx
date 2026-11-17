import { CONTACT } from "@/lib/site";
import Breadcrumbs from "@/layout/Breadcrumbs";
import { Container } from "@/layout/Section";

const Privacy = () => (
  <Container className="max-w-3xl py-12 md:py-16">
    <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Política de privacidade", path: "/privacidade" }]} />
    <h1 className="mt-8 text-4xl md:text-5xl">Política de privacidade</h1>
    <div className="prose prose-lg mt-8 max-w-none prose-headings:font-serif prose-headings:font-normal">
      <p>
        Esta política explica como a LEXA Go trata os dados pessoais recebidos por meio deste site, em conformidade com a
        Lei Geral de Proteção de Dados (Lei 13.709/2018).
      </p>
      <h2>Dados que coletamos</h2>
      <p>
        Quando você preenche um formulário, recebemos nome, e-mail e, se informados, WhatsApp, empresa e a descrição da sua
        necessidade. Junto com a mensagem, registramos a página de onde o contato foi enviado e a origem da visita (por
        exemplo, se você chegou por uma busca, um anúncio ou uma rede social), para entender quais canais nos trazem
        contatos.
      </p>
      <h2>Para que usamos</h2>
      <p>
        Usamos esses dados apenas para responder ao seu contato, preparar uma proposta quando solicitada e melhorar a
        comunicação do site. Não vendemos nem compartilhamos seus dados para fins de marketing de terceiros.
      </p>
      <h2>Cookies e ferramentas de medição</h2>
      <p>
        Quando ativadas, ferramentas como Google Analytics, Google Ads e Meta Pixel só são carregadas depois que você
        aceita no aviso de cookies. Você pode recusar sem prejuízo para a navegação.
      </p>
      <h2>Por quanto tempo guardamos</h2>
      <p>Mantemos os dados pelo tempo necessário para o atendimento e para obrigações legais.</p>
      <h2>Seus direitos</h2>
      <p>
        Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail{" "}
        <a href={`mailto:${CONTACT.emailGeneral}`}>{CONTACT.emailGeneral}</a>.
      </p>
    </div>
  </Container>
);

export default Privacy;
