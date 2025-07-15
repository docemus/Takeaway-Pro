---
layout: default
title: "Prodotti per Ristorazione d'Asporto"
description: "Scopri la nostra selezione di prodotti eco-sostenibili per la ristorazione d'asporto: scatole pizza, contenitori, accessori e molto altro."
---

<!-- Hero Section -->
<section class="section section--hero">
    <div class="container">
        <div class="grid grid--hero">
            <div class="hero__content">
                <h1 class="hero__title">
                    Prodotti per<br>
                    Ristorazione<br>
                    d'Asporto
                </h1>
                <p class="hero__subtitle">
                    Soluzioni eco-sostenibili e di qualità per il tuo business. 
                    Scatole, contenitori e accessori per la ristorazione moderna.
                </p>
                <div class="hero__cta">
                    <a href="#prodotti" class="btn btn--large">Scopri i Prodotti</a>
                    <a href="/contatti" class="btn btn--large btn--secondary">Contattaci</a>
                </div>
            </div>
            <div class="hero__visual">
                Immagine Hero
            </div>
        </div>
    </div>
</section>

<!-- Products Section -->
<section id="prodotti" class="section">
    <div class="container">
        <div class="category-section__header">
            <h2 class="category-section__title">I Nostri Prodotti</h2>
            <p class="category-section__subtitle">
                Una selezione curata di prodotti per ogni esigenza della ristorazione d'asporto
            </p>
        </div>

        {% for category in site.data.products %}
            <div class="category-group" style="margin-bottom: 5rem;">
                <h3 style="font-size: 2.25rem; font-weight: 700; text-transform: uppercase; margin-bottom: 3rem; text-align: center; color: #88AA77;">
                    {{ category.category }}
                </h3>
                
                <div class="grid grid--products">
                    {% for item in category.items %}
                        <div class="product-card fade-in-up">
                            <div class="product-card__image">
                                {% if item.image %}
                                    <img src="{{ '/assets/images/' | append: item.image | relative_url }}" 
                                         alt="{{ item.title }}" 
                                         loading="lazy">
                                {% else %}
                                    Immagine Prodotto
                                {% endif %}
                            </div>
                            <div class="product-card__content">
                                <div class="product-card__category">{{ category.category }}</div>
                                <h3 class="product-card__title">{{ item.title }}</h3>
                                <p class="product-card__description">{{ item.description }}</p>
                                
                                {% if item.features %}
                                    <div class="product-card__features">
                                        <ul>
                                            {% for feature in item.features %}
                                                <li>{{ feature }}</li>
                                            {% endfor %}
                                        </ul>
                                    </div>
                                {% endif %}
                                
                                <div class="product-card__footer">
                                    <div class="product-card__price">{{ item.price }}</div>
                                    {% if item.amazon_id %}
                                        <a href="https://amazon.it/dp/{{ item.amazon_id }}" 
                                           class="product-card__cta" 
                                           target="_blank" 
                                           rel="noopener noreferrer">
                                            Acquista
                                        </a>
                                    {% endif %}
                                </div>
                            </div>
                        </div>
                    {% endfor %}
                </div>
            </div>
        {% endfor %}
    </div>
</section>

<!-- Features Section -->
<section class="section section--alt">
    <div class="container">
        <div class="category-section__header">
            <h2 class="category-section__title">Perché Scegliere TakeAway Pro</h2>
        </div>
        
        <div class="grid grid--products">
            <div class="card">
                <div class="card__header">
                    <h3 class="card__title">🌱 Eco-Sostenibile</h3>
                </div>
                <div class="card__content">
                    <p>Tutti i nostri prodotti sono realizzati con materiali eco-sostenibili e biodegradabili per rispettare l'ambiente.</p>
                </div>
            </div>
            
            <div class="card">
                <div class="card__header">
                    <h3 class="card__title">⚡ Consegna Rapida</h3>
                </div>
                <div class="card__content">
                    <p>Spedizioni veloci e affidabili in tutta Italia. Ordina oggi e ricevi i tuoi prodotti in 24-48 ore.</p>
                </div>
            </div>
            
            <div class="card">
                <div class="card__header">
                    <h3 class="card__title">💎 Qualità Premium</h3>
                </div>
                <div class="card__content">
                    <p>Selezioniamo solo i migliori prodotti per garantire resistenza, funzionalità e design professionale.</p>
                </div>
            </div>
        </div>
    </div>
</section>
