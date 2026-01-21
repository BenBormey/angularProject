<section class="hero">
  <div class="hero-content">
    <h1>Experience the <span>Future</span></h1>
    <p>Upgrade your lifestyle with our premium electronic collection.</p>
    <button class="btn-shop" (click)="router.navigate(['/products'])">Shop Now</button>
  </div>
</section>

<div class="container">
  <div class="section-title">
    <h2>Featured <span>Products</span></h2>
    <div class="underline"></div>
  </div>

  <div class="products-grid">
    <div class="product-card" *ngFor="let p of products" (click)="goToDetails(p.productId)">
      <div class="image-box">
        <img [src]="getFirstImage(p)" alt="product image">
      </div>
      <div class="card-content">
        <span class="brand-tag">Electronics</span>
        <h3>{{ p.productName }}</h3>
        <p class="price">$ {{ getFirstPrice(p) | number:'1.2-2' }}</p>
        <button class="view-btn">View Details</button>
      </div>
    </div>
  </div>
</div>