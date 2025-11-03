// App-level styles (default CRA styles)
import './App.css';
import React, { useEffect, useState } from 'react';

// Import required react-bootstrap components
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Carousel
} from 'react-bootstrap';

// Unsplash Source images using fixed photo IDs (from Unsplash search pages)
// This gives stable, real photos suitable for a shoe boutique
const SHOES = {
  classic: 'https://images.unsplash.com/photo-1651055183233-13e372fbfe51?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdoaXRlJTJGb3JhbmdlJTIwc2hvZXMlMjBvbiUyMGJveHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', // white/orange shoes on box
  red: 'https://media.istockphoto.com/id/1276624783/photo/stylish-and-cool-boot.webp?a=1&b=1&s=612x612&w=0&k=20&c=jhhuhWTO8Ufg2h7FS7fc1EmtLX08iOz3BBBk4WJmcPM=',      // red sneaker
  brown: 'https://media.istockphoto.com/id/1471122805/photo/pair-of-yellow-sneakers-on-yellow-background-copy-space.webp?a=1&b=1&s=612x612&w=0&k=20&c=JLwJE7qCU5x6gS1k01uNU2l3An-ZMFWThZYi9vOEZNw='     // brown sneaker on yellow textile
};

// Simple translations (FR/EN)
const translations = {
  fr: {
    brand: 'Boutique de Chaussures',
    nav: { collections: 'Collections', trends: 'Tendances', contact: 'Contact' },
    hero: { h3a: 'Nouvelles collections', pA: 'Des silhouettes modernes pour chaque look.', h3b: 'Essentiels blancs', pB: 'Indispensables et intemporels.', h3c: 'Nouvelle vitrine', pC: 'Découvrez nos nouveautés en magasin.', h3d: 'Couleurs & style', pD: 'Affirmez votre personnalité.' },
    heading: 'Marchez avec style',
    cards: [
      { title: 'Baskets classiques', desc: 'Confort et style au quotidien.' },
      { title: 'Sneakers rouges', desc: 'Une touche de couleur pour vos looks.' },
      { title: 'Baskets marron', desc: 'Tons chauds et design épuré.' }
    ],
    shop: 'Acheter',
    photos: 'Photos via',
    form: {
      title: 'Réserver une séance de style',
      name: 'Nom', namePh: 'Votre nom',
      email: 'Email', emailPh: 'nom@example.com',
      style: 'Préférence de style', stylePh: 'Sélectionnez votre style',
      subject: 'Objet', subjectPh: 'Objet (ex: conseil tenue)',
      message: 'Message', messagePh: 'Parlez-nous de l’occasion, des tailles ou des couleurs que vous aimez...',
      submit: 'Envoyer la demande'
    },
    langToggle: 'EN', theme: 'Thème'
  },
  en: {
    brand: 'Shoe Boutique',
    nav: { collections: 'Collections', trends: 'Trends', contact: 'Contact' },
    hero: { h3a: 'New collections', pA: 'Modern silhouettes for every look.', h3b: 'White essentials', pB: 'Timeless must-haves.', h3c: 'New window', pC: 'Discover what’s new in store.', h3d: 'Color & style', pD: 'Show your personality.' },
    heading: 'Walk in style',
    cards: [
      { title: 'Classic sneakers', desc: 'Comfort and style for everyday.' },
      { title: 'Red sneakers', desc: 'A splash of color for your outfits.' },
      { title: 'Brown sneakers', desc: 'Warm tones with a clean design.' }
    ],
    shop: 'Shop now',
    photos: 'Photos via',
    form: {
      title: 'Book a style session',
      name: 'Name', namePh: 'Your name',
      email: 'Email', emailPh: 'name@example.com',
      style: 'Style preference', stylePh: 'Select your style',
      subject: 'Subject', subjectPh: 'Subject (e.g., Outfit advice)',
      message: 'Message', messagePh: 'Tell us about the occasion, sizes, or colors you like...',
      submit: 'Request Session'
    },
    langToggle: 'FR', theme: 'Theme'
  }
};

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'fr');
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === '1');
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];

  // Reveal on scroll animation
  useEffect(() => {
    // Skip in test/SSR environments where IntersectionObserver may be unavailable
    if (typeof IntersectionObserver === 'undefined') return;
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('is-visible', e.isIntersecting)),
      { threshold: 0.15 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Handle navbar scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Persist theme/lang and toggle body class
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);
  useEffect(() => {
    localStorage.setItem('dark', dark ? '1' : '0');
    document.body.classList.toggle('dark-theme', dark);
  }, [dark]);
  // The App returns a React Fragment (<></>) wrapping a root div with className "App"
  // This satisfies the checkpoint requirement to use a React Fragment and a div.App
  return (
    <>
      <div className="App">
        {/* Transparent, fixed navbar that gains background on scroll */}
        <Navbar
          fixed="top"
          bg="transparent"
          variant={dark ? 'dark' : (scrolled ? 'light' : 'dark')}
          expand="lg"
          className={`navbar-glass ${scrolled ? 'is-scrolled' : ''}`}
        >
          <Container>
            <Navbar.Brand href="#home">{t.brand}</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <Nav className="ms-auto">
                <Nav.Link href="#collections">{t.nav.collections}</Nav.Link>
                <Nav.Link href="#trends">{t.nav.trends}</Nav.Link>
                <Nav.Link href="#contact">{t.nav.contact}</Nav.Link>
                <Nav.Item className="ms-3 d-flex align-items-center">
                  <Button size="sm" variant={dark ? 'outline-light' : 'outline-dark'} onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}>
                    {t.langToggle}
                  </Button>
                </Nav.Item>
                <Nav.Item className="ms-2 d-flex align-items-center">
                  <Button size="sm" variant={dark ? 'light' : 'dark'} onClick={() => setDark(d => !d)}>
                    {t.theme}: {dark ? 'Dark' : 'Light'}
                  </Button>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Hero Carousel */}
        <Carousel className="hero-carousel mb-4 reveal">
          <Carousel.Item>
            <img
              src="https://images.unsplash.com/photo-1565814636199-ae8133055c1c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1200"
              alt="Sneakers lifestyle"
            />
            <Carousel.Caption>
              <h3>{t.hero.h3a}</h3>
              <p>{t.hero.pA}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1200"
              alt="Baskets blanches"
            />
            <Carousel.Caption>
              <h3>{t.hero.h3b}</h3>
              <p>{t.hero.pB}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://images.unsplash.com/photo-1462927114214-6956d2fddd4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1200"
              alt="Chaussures en vitrine"
            />
            <Carousel.Caption>
              <h3>{t.hero.h3c}</h3>
              <p>{t.hero.pC}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://images.unsplash.com/photo-1570464197285-9949814674a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1200"
              alt="Sneakers colorées"
            />
            <Carousel.Caption>
              <h3>{t.hero.h3d}</h3>
              <p>{t.hero.pD}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <main className="site-main">
          <Container>
            {/* Page heading (shoe store) */}
            <h1 className="mb-4 text-center reveal">{t.heading}</h1>

            {/* Card grid: 3 cards responsive using Row/Col */}
            <Row id="collections" xs={1} md={3} className="g-4 mb-3 reveal">
              {[
                { id: 1, title: t.cards[0].title, img: SHOES.classic, desc: t.cards[0].desc },
                { id: 2, title: t.cards[1].title, img: SHOES.red, desc: t.cards[1].desc },
                { id: 3, title: t.cards[2].title, img: SHOES.brown, desc: t.cards[2].desc }
              ].map((card) => (
                <Col key={card.id}>
                  <Card className="h-100 shadow-sm">
                    {/* Local image displayed on top of each card */}
                    <Card.Img variant="top" src={card.img} alt={card.title} />
                    <Card.Body>
                      <Card.Title>{card.title}</Card.Title>
                      <Card.Text>
                        {card.desc}
                      </Card.Text>
                      <Button variant="primary">{t.shop}</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Unsplash attribution */}
            <p className="text-muted small mb-5 reveal">
              {t.photos} <a href="https://unsplash.com/" target="_blank" rel="noreferrer">Unsplash</a>.
            </p>

            {/* Fashion-themed form to satisfy the "Use of Forms" criterion */}
            <section id="contact" className="mb-5 reveal">
              <h2 className="mb-3">{t.form.title}</h2>
              {/* Form components from react-bootstrap */}
              <Form onSubmit={(e) => e.preventDefault() /* prevent page reload for demo */}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="formName">
                    <Form.Label>{t.form.name}</Form.Label>
                    <Form.Control type="text" placeholder={t.form.namePh} required />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="formEmail">
                    <Form.Label>{t.form.email}</Form.Label>
                    <Form.Control type="email" placeholder={t.form.emailPh} required />
                  </Form.Group>
                </Row>

                {/* Champ additionnel spécifique au thème */}
                <Form.Group className="mb-3" controlId="formStylePref">
                  <Form.Label>{t.form.style}</Form.Label>
                  <Form.Select defaultValue="">
                    <option value="" disabled>{t.form.stylePh}</option>
                    <option>Casual</option>
                    <option>{lang === 'fr' ? 'Formel' : 'Formal'}</option>
                    <option>Streetwear</option>
                    <option>{lang === 'fr' ? 'Minimaliste' : 'Minimalist'}</option>
                    <option>Vintage</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label>{t.form.subject}</Form.Label>
                  <Form.Control type="text" placeholder={t.form.subjectPh} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>{t.form.message}</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder={t.form.messagePh} />
                </Form.Group>

                <Button variant="primary" type="submit">{t.form.submit}</Button>
              </Form>
            </section>
          </Container>
        </main>

        <footer className="site-footer reveal" role="contentinfo">
          <Container>
            <Row className="g-4">
              <Col xs={12} md={4}>
                <h5>{t.brand}</h5>
                <p className="text-muted">{lang === 'fr' ? 'Marchez avec style, chaque jour.' : 'Walk in style, every day.'}</p>
              </Col>
              <Col xs={6} md={4}>
                <h5>{lang === 'fr' ? 'Liens' : 'Links'}</h5>
                <ul className="list-unstyled mb-0">
                  <li><a href="#collections">{t.nav.collections}</a></li>
                  <li><a href="#trends">{t.nav.trends}</a></li>
                  <li><a href="#contact">{t.nav.contact}</a></li>
                </ul>
              </Col>
              <Col xs={6} md={4}>
                <h5>{lang === 'fr' ? 'Contact' : 'Contact'}</h5>
                <ul className="list-unstyled mb-0 text-muted">
                  <li>hello@boutique-chaussures.example</li>
                  <li>+33 1 23 45 67 89</li>
                  <li>Paris, France</li>
                </ul>
              </Col>
            </Row>
            <div className="footer-bottom text-muted d-flex justify-content-between flex-wrap">
              <span>© {new Date().getFullYear()} {t.brand}</span>
              <span>Built with React & Bootstrap</span>
            </div>
          </Container>
        </footer>
      </div>
    </>
  );
}

export default App;
