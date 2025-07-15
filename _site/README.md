# TakeAway Pro - Sito Jekyll per Vetrina Prodotti

Un sito Jekyll minimalista ad alte prestazioni per la vetrina di prodotti per ristorazione d'asporto, con design brutalist moderno e supporto PWA.

## 🎨 Caratteristiche Design

### Tema Brutalist Moderno
- **Schema Colori**: Bianco (#FFFFFF), Verde Salvia (#88AA77), Nero (#111111)
- **Tipografia**: Inter (Google Fonts) per il body, Montserrat per i titoli
- **Layout**: Griglia asimmetrica con spazi generosi
- **Micro-interazioni**: Effetti hover sottili e animazioni fluide

### Elementi Distintivi
- Bordi spessi (3px) e ombre pronunciate
- Tipografia bold e maiuscola per i titoli
- Card con effetti hover transform
- Bottoni con stile brutalist e animazioni

## ⚡ Ottimizzazioni Performance

### Core Web Vitals
- **Critical CSS**: Inline nel `<head>` per rendering veloce
- **Lazy Loading**: Nativo per le immagini
- **Asset Minificati**: CSS e JavaScript ottimizzati
- **Preconnect**: Per Google Fonts

### Supporto Immagini Moderne
- **WebP/AVIF**: Include per formati ottimizzati
- **Responsive Images**: Con `srcset` e `sizes`
- **Lazy Loading**: Implementato nativamente

## 📱 PWA (Progressive Web App)

### Funzionalità Offline
- **Service Worker**: Cache intelligente per contenuti
- **Manifest**: Installazione come app nativa
- **Offline Page**: Pagina dedicata per stato offline

### Strategie di Cache
- **Cache-First**: Per asset statici (CSS, JS, immagini)
- **Network-First**: Per contenuti dinamici
- **Stale-While-Revalidate**: Per contenuti misti

## 📁 Struttura del Progetto

```
my-product-showcase/
├── _config.yml              # Configurazione Jekyll
├── _data/
│   └── products.yml          # Dati prodotti strutturati
├── _includes/
│   ├── critical-css.html     # CSS critico inline
│   └── image-optimization.html # Ottimizzazione immagini
├── _layouts/
│   ├── default.html          # Layout principale
│   └── product.html          # Layout pagina prodotto
├── _sass/
│   ├── _variables.scss       # Variabili design system
│   ├── _base.scss           # Stili base e tipografia
│   └── _components.scss     # Componenti specifici
├── assets/
│   ├── css/
│   │   └── main.scss        # CSS principale
│   ├── js/
│   │   └── main.js          # JavaScript essenziale
│   └── images/              # Immagini prodotti
├── index.markdown           # Homepage
├── offline.html            # Pagina offline PWA
├── manifest.json           # Manifest PWA
├── sw.js                   # Service Worker
└── README.md              # Documentazione
```

## 🚀 Installazione e Uso

### Prerequisiti
- Ruby 3.0+
- Bundler
- Jekyll

### Setup Locale
```bash
# Clona o scarica il progetto
cd my-product-showcase

# Installa le dipendenze
bundle install

# Avvia il server di sviluppo
bundle exec jekyll serve --livereload

# Il sito sarà disponibile su http://localhost:4000
```

### Build per Produzione
```bash
# Build ottimizzato per produzione
JEKYLL_ENV=production bundle exec jekyll build

# I file saranno generati in _site/
```

## 📊 Gestione Prodotti

### Struttura Dati
I prodotti sono gestiti tramite il file `_data/products.yml`:

```yaml
- category: "Nome Categoria"
  items:
    - title: "Nome Prodotto"
      amazon_id: "ID_AMAZON"
      features: ["Feature 1", "Feature 2"]
      price: 12.99
      image: "nome-immagine.jpg"
      description: "Descrizione prodotto"
```

### Aggiungere Nuovi Prodotti
1. Modifica `_data/products.yml`
2. Aggiungi l'immagine in `assets/images/`
3. Il sito si aggiornerà automaticamente

### Categorie Supportate
- Scatole Pizza
- Contenitori Asporto
- Accessori
- (Facilmente estendibile)

## 🎯 Ottimizzazioni SEO

### Meta Tags
- Open Graph per social media
- Twitter Cards
- Structured Data (JSON-LD)
- Meta description personalizzate

### Performance
- Sitemap automatico
- Feed RSS
- URL SEO-friendly
- Immagini ottimizzate

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adattamenti
- Menu mobile con toggle
- Grid responsive
- Tipografia scalabile
- Touch-friendly su mobile

## 🔧 Personalizzazione

### Colori
Modifica le variabili in `_sass/_variables.scss`:
```scss
$color-white: #FFFFFF;
$color-sage: #88AA77;
$color-black: #111111;
```

### Tipografia
Cambia i font in `_sass/_variables.scss`:
```scss
$font-body: 'Inter', sans-serif;
$font-heading: 'Montserrat', sans-serif;
```

### Layout
Personalizza i layout in `_layouts/` e gli stili in `_sass/`.

## 🚀 Deploy

### Opzioni di Deploy
1. **GitHub Pages**: Push su repository GitHub
2. **Netlify**: Drag & drop della cartella `_site/`
3. **Vercel**: Connetti repository Git
4. **Server tradizionale**: Upload cartella `_site/`

### Configurazione Produzione
Assicurati di impostare:
- `url` in `_config.yml`
- `baseurl` se necessario
- Variabili ambiente per analytics

## 📈 Monitoraggio Performance

### Core Web Vitals
- **LCP**: < 2.5s (ottimizzato con critical CSS)
- **FID**: < 100ms (JavaScript minimale)
- **CLS**: < 0.1 (layout stabile)

### Tools Consigliati
- Google PageSpeed Insights
- Lighthouse
- WebPageTest
- GTmetrix

## 🔒 Sicurezza

### Headers di Sicurezza
Configura nel server web:
```
Content-Security-Policy
X-Frame-Options
X-Content-Type-Options
Referrer-Policy
```

### HTTPS
Sempre utilizzare HTTPS in produzione per:
- SEO
- Sicurezza
- PWA functionality

## 🆘 Troubleshooting

### Problemi Comuni

**Jekyll non si avvia**
```bash
bundle update
bundle exec jekyll serve
```

**Immagini non si caricano**
- Verifica il path in `_data/products.yml`
- Controlla che l'immagine esista in `assets/images/`

**Service Worker non funziona**
- Deve essere servito via HTTPS
- Controlla la console del browser per errori

## 📞 Supporto

### Struttura File Principali
- **Configurazione**: `_config.yml`
- **Dati**: `_data/products.yml`
- **Stili**: `_sass/`
- **Layout**: `_layouts/`
- **Contenuti**: `index.markdown`

### Risorse Utili
- [Documentazione Jekyll](https://jekyllrb.com/docs/)
- [Sass Documentation](https://sass-lang.com/documentation)
- [PWA Guidelines](https://web.dev/progressive-web-apps/)

---

## 📄 Licenza

Progetto sviluppato per TakeAway Pro. Tutti i diritti riservati.

**Versione**: 1.0.0  
**Data**: Luglio 2025  
**Compatibilità**: Jekyll 4.x, Ruby 3.x

