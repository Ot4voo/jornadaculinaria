import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, BookOpen, ChefHat, Check, ChevronDown, Globe2, Layers3, Leaf, LockKeyhole, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { books } from '@/data/collection';
import { purchase } from '@/data/purchase';
import heroImage from '@/assets/hero-simple.jpg';

const coverImages = Object.entries(import.meta.glob<string>('../assets/cover-*.jpg', { eager: true, query: '?url', import: 'default' })).sort(([a], [b]) => a.localeCompare(b)).map(([, url]) => url);

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Jornada Culinária pelo Mundo | 16 e-books, 651 receitas' },
    { name: 'description', content: 'Explore uma coleção de 16 e-books com 651 receitas de 14 países, culinárias africanas e tradição afro-brasileira. Novos sabores para a sua cozinha.' },
    { property: 'og:title', content: 'Jornada Culinária pelo Mundo — uma coleção de sabores' },
    { property: 'og:description', content: '16 e-books e 651 receitas organizadas por níveis de dificuldade para cozinhar em casa e explorar a diversidade culinária.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Brand() {
  return <div className="flex min-w-0 items-center gap-3"><span className="brand-icon shrink-0"><Utensils size={19} strokeWidth={1.3} /></span><span className="brand-name">Jornada Culinária<br /><span className="text-muted-foreground">pelo Mundo</span></span></div>;
}

function BuyLink({ children = 'Quero conhecer a coleção', variant = 'culinary' }: { children?: React.ReactNode; variant?: 'culinary' | 'editorial' }) {
  return <Button variant={variant} asChild size="lg" className="h-12 px-6 text-xs"><a href="#compra">{children}<ArrowRight size={16} /></a></Button>;
}

function BookCard({ book }: { book: (typeof books)[number] }) {
  const index = books.indexOf(book);
  const title = book.title.replace(' — Volume I', '');
  return <article className="book-card">
    <div className="book-stage"><div className="book-cover" data-tone={book.tone}>
      <div className="book-brand">Jornada Culinária pelo Mundo</div>
      <div className="book-title">{title}{index === 15 && <small>Volume I</small>}</div>
      <div className="book-art"><img src={coverImages[index]} alt={`Composição culinária ilustrativa para ${book.place}`} loading="lazy" width={400} height={400} /></div>
      <div className="book-footer">Uma coleção de sabores e tradições</div>
    </div></div>
    <div className="book-meta"><h3>{book.title}</h3><p>{index === 0 ? '48 receitas + 3 adaptações' : `${book.recipes} receitas`}</p>{index >= 8 && index <= 9 && <p>{book.place}</p>}</div>
  </article>;
}

const faq = [
  ['Quantos e-books vêm na coleção?', 'A Jornada Culinária pelo Mundo reúne 16 e-books: 14 sobre países, um sobre culinárias africanas e um sobre a tradição culinária afro-brasileira.'],
  ['Quantas receitas estão incluídas?', 'São 651 receitas no total: 648 receitas dos volumes originais incluídos e 3 adaptações adicionais no e-book Itália à Mesa. A edição italiana reúne 48 receitas originais e essas 3 adaptações.'],
  ['Quais culinárias fazem parte?', 'Itália, França, Líbano, Japão, Brasil, México, Índia, Espanha, Argentina, Estados Unidos, Reino Unido, Coreia, China e Peru, além das culinárias africanas e da tradição afro-brasileira. O e-book peruano é Peru à Mesa — Volume I, com 36 receitas.'],
  ['As receitas são organizadas por nível?', 'Sim. As receitas são organizadas por níveis de dificuldade e preparadas para cozinheiros domésticos no Brasil. Conforme o volume, há orientações sobre técnicas, ingredientes e possíveis substituições disponíveis no país.'],
  ['As receitas citadas são oficiais dos chefs?', 'Os nomes indicam referências ou inspirações editoriais em volumes específicos, sem implicar parceria, patrocínio ou endosso. As receitas atribuídas a Cheff Otto são adaptações editoriais de receitas publicadas por ele e ajustadas para esta coleção. Metzi é uma referência de restaurante.'],
  ['Como recebo o produto?', 'A coleção é entregue em formato PDF: você recebe os 16 e-books por e-mail, prontos para abrir no celular, no tablet ou no computador.'],
];

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return <>
    <header className="site-header page-width grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
      <Brand />
      <nav aria-label="Navegação principal" className="site-nav"><a href="#colecao">A coleção</a><a href="#experiencia">A experiência</a><a href="#perguntas">Perguntas frequentes</a></nav>
      <Button variant="editorial" asChild className="header-cta shrink-0 text-xs h-9"><a href="#compra">Conhecer a coleção<ArrowRight /></a></Button>
    </header>
    <main>
      <section className="hero">
        <img src={heroImage} className="hero-photo" alt="Tomates frescos, folhas de manjericão e azeite sobre fundo verde-escuro" width={1920} height={1088} fetchPriority="high" />
        <div className="page-width hero-inner"><div className="hero-copy">
          <p className="eyebrow text-gold">16 e-books · Uma coleção de sabores</p>
          <h1>Jornada Culinária<br />pelo Mundo.<br /><em>A próxima viagem<br />começa na sua cozinha.</em></h1>
          <p className="hero-description">Explore 14 países e muitas tradições culinárias em 16 e-books e 651 receitas organizadas para cozinhar em casa e descobrir novos sabores.</p>
          <div className="hero-values"><span><BookOpen />16 e-books em PDF</span><span><Utensils />651 receitas</span></div>
          <BuyLink />
          <p className="hero-note">Receitas por níveis de dificuldade, com referências culinárias e adaptações para ingredientes encontrados no Brasil.</p>
        </div></div>
      </section>
      <div className="stat-band"><div className="page-width stat-grid">
        {[["16", "e-books na coleção"], ["651", "receitas para explorar"], ["14", "países à sua mesa"], ["Muitas", "tradições e descobertas"]].map(([value,label]) => <div className="stat-item" key={label}><strong>{value}</strong><p>{label}</p></div>)}
      </div></div>
      <section id="experiencia" className="section page-width experience-grid">
        <div><p className="eyebrow text-muted-foreground">Muito além de uma receita</p><h2 className="section-title">Um mundo de sabores.<br />Uma cozinha: a sua.</h2><p className="section-copy mt-5">O prazer de cozinhar também está em descobrir. Um ingrediente diferente, uma técnica que você ainda não experimentou, uma tradição que merece chegar à sua mesa.</p><p className="section-copy mt-3">Das receitas tradicionais às releituras, a coleção percorre diferentes cozinhas com instruções para quem cozinha em casa — e curiosidade para ir além do habitual.</p></div>
        <div className="experience-features">
          {[{ icon: Globe2, title: 'Conheça diferentes culturas à mesa', copy: 'Explore 14 países, a diversidade das culinárias africanas e a tradição afro-brasileira.' }, { icon: Layers3, title: 'Encontre seu próximo desafio', copy: 'Receitas organizadas por níveis de dificuldade para ampliar seu repertório no seu ritmo.' }, { icon: Leaf, title: 'Cozinhe com o seu contexto', copy: 'Orientações sobre ingredientes, técnicas e possíveis substituições no Brasil, conforme cada volume.' }].map(({icon: Icon,title,copy}) => <div className="feature-row" key={title}><Icon className="feature-icon" size={27} strokeWidth={1.3} /><div><h3>{title}</h3><p>{copy}</p></div></div>)}
        </div>
      </section>
      <section id="colecao" className="section collection"><div className="page-width">
        <div className="section-heading"><p className="eyebrow text-muted-foreground">Sua próxima descoberta está aqui</p><h2 className="section-title">16 livros. Incontáveis descobertas.</h2><p className="section-copy mt-4">Uma coleção para viajar por ingredientes, técnicas e histórias.<br className="hidden sm:block" /> Escolha por onde começar — e deixe a curiosidade guiar o caminho.</p></div>
        <div className="book-grid">{books.map(book => <BookCard book={book} key={book.title} />)}</div>
        <p className="collection-note">651 receitas = 648 receitas dos volumes originais incluídos + 3 adaptações adicionais em Itália à Mesa.<br />As imagens são composições culinárias ilustrativas, não uma lista de pratos incluídos nos e-books.</p>
        <div className="text-center mt-8"><BuyLink>Quero explorar esses sabores</BuyLink></div>
      </div></section>
      <section className="section references"><div className="page-width">
        <div className="section-heading"><p className="eyebrow text-muted-foreground">Repertório que inspira</p><h2 className="section-title">Referências e inspirações culinárias</h2><p className="section-copy mt-4">Nomes e referências presentes em volumes específicos da coleção, sob uma perspectiva editorial.</p></div>
        <div className="reference-grid">{books.map(book => <div className="reference-item" key={book.title}><p>{book.reference}</p><span>{book.title}</span></div>)}</div>
        <div className="editorial-note"><p>As receitas atribuídas a Cheff Otto são adaptações editoriais de receitas publicadas por ele e ajustadas para esta coleção.</p><p className="mt-2">As menções a chefs e restaurantes indicam inspirações ou referências editoriais em volumes específicos. Não há afirmação de parceria, patrocínio ou endosso.</p></div>
      </div></section>
      <section className="section page-width audience-grid">
        <div><p className="eyebrow text-muted-foreground">Para quem tem curiosidade e apetite</p><h2 className="section-title">Seu repertório merece<br />novos destinos.</h2><p className="section-copy mt-4">Não é preciso sair de casa para conhecer um novo universo de sabores. É preciso vontade de experimentar.</p></div>
        <ul className="audience-list">{['Para quem tem curiosidade sobre as culinárias de diferentes lugares.', 'Para quem gosta de cozinhar em casa e quer ampliar o repertório.', 'Para quem prefere receitas com instruções organizadas por níveis.', 'Para quem busca ideias para variar refeições e explorar ingredientes e técnicas.'].map(text => <li key={text}><Check size={18} strokeWidth={1.5} /><span>{text}</span></li>)}</ul>
      </section>
      <section className="section delivery"><div className="page-width"><p className="eyebrow text-muted-foreground">Da coleção para a sua cozinha</p><h2 className="section-title">Como funciona</h2><div className="delivery-grid"><div className="delivery-step"><span className="step-number">01</span><div><h3>O formato da sua coleção</h3><p className="delivery-copy mt-2">{purchase.deliveryFormat}</p></div></div><div className="delivery-step"><span className="step-number">02</span><div><h3>Como você recebe os e-books</h3><p className="delivery-copy mt-2">{purchase.deliveryMethod}</p></div></div></div></div></section>
      <section id="perguntas" className="section page-width"><div className="faq-inner"><div className="section-heading"><p className="eyebrow text-muted-foreground">Antes de começar a viagem</p><h2 className="section-title">Perguntas frequentes</h2></div>
        {faq.map(([question,answer],index) => <div className="faq-item" key={question}><Button variant="ghost" className="faq-trigger" aria-expanded={openFaq === index} aria-controls={`faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span className="min-w-0">{question}</span><ChevronDown size={17} className={`shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></Button>{openFaq === index && <div id={`faq-${index}`} className="faq-answer">{answer}</div>}</div>)}
      </div></section>
      <section id="compra" className="section offer"><div className="page-width offer-inner">
        <div><p className="eyebrow text-gold">Uma coleção inteira. Um novo repertório.</p><h2>Jornada Culinária<br />pelo Mundo</h2><div className="offer-facts"><span className="flex items-center gap-2"><BookOpen size={17} />16 e-books</span><span className="flex items-center gap-2"><ChefHat size={17} />651 receitas</span></div><p className="offer-summary">Itália, França, Líbano, Japão, Brasil, México, Índia, Espanha, Argentina, Estados Unidos, Reino Unido, Coreia, China e Peru. Mais as culinárias africanas e a tradição afro-brasileira.</p></div>
        <div className="offer-purchase"><p className="offer-label">Coleção completa</p>
          <p className="offer-price"><s className="offer-price-from">de {purchase.priceFrom}</s><strong className="offer-price-to">por {purchase.priceTo}</strong></p>
          <p className="offer-delivery">16 e-books em PDF, recebidos por e-mail.</p>
          {purchase.checkoutUrl ? <Button variant="culinary" className="checkout-button" asChild><a href={purchase.checkoutUrl}>Quero<ArrowRight /></a></Button> : <Button variant="culinary" className="checkout-button" disabled>Quero<ArrowRight /></Button>}
          {!purchase.checkoutUrl && <p className="checkout-pending"><LockKeyhole size={12} />URL de pagamento ainda não configurada</p>}
          <p className="placeholder">Pagamento: {purchase.payment}</p>
          <p className="placeholder">Garantia: {purchase.guarantee}</p>
        </div>
      </div></section>
    </main>
    <footer className="page-width footer grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between"><Brand /><span className="text-[10px] text-muted-foreground text-right">Uma coleção de sabores<br />e tradições culinárias.</span></footer>
  </>;
}
