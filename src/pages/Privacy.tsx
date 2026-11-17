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
      <h2>Cookies, medição e anúncios</h2>
      <p>
        Usamos ferramentas de medição e publicidade somente depois que você aceita no aviso de cookies. Se você recusar,
        elas não são carregadas e a navegação continua normal. Para mudar sua escolha, limpe os dados do site no navegador
        e o aviso aparecerá de novo.
      </p>
      <ul>
        <li>
          <strong>Google Analytics e Google Ads:</strong> registram páginas visitadas, origem da visita e ações como cliques
          em contato e envio de formulário, para medir o desempenho do site e dos anúncios.
        </li>
        <li>
          <strong>Conversões otimizadas do Google:</strong> quando você envia o formulário e aceitou os cookies, o e-mail e o
          telefone informados são compartilhados com o Google de forma criptografada (hash), para que o Google possa medir
          se o contato veio de um anúncio. O Google não recebe esses dados em texto aberto.
        </li>
        <li>
          <strong>Meta Pixel (Facebook e Instagram):</strong> coleta dados de navegação neste site para medir e direcionar
          anúncios nas plataformas da Meta.
        </li>
      </ul>
      <p>
        Esses dados são tratados também segundo as políticas de privacidade do Google e da Meta.
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
