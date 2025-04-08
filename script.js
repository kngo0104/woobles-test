fetch('product.json')
  .then(response => response.json())
  .then(data => {
    const featuredWooble = document.querySelector('.featured-wooble'),
          featuredWoobleDesc = document.querySelector('.featured-wooble-desc');

    data.products.forEach( product => {
      const tags = product.tags.split(',').map(tag => tag.trim()),
            vendor = product.vendor.split(' / ').map(vendor => vendor.trim());

      // === FEATURED WOOBLE SECTION ===
      if(tags.includes('Featured')) {
        const img = document.createElement('img'),
              parser = new DOMParser();
              parse = parser.parseFromString(product.body_html, 'text/html'),
              firstParagraph = parse.querySelector('p'),
              button = `<a href="https://thewoobles.com/products/${product.handle}" class="featured-button" >Shop Kit</a>`;
        
        img.setAttribute('src', product.image.src);

        featuredWooble.appendChild(img);
        featuredWoobleDesc.appendChild(firstParagraph);
        featuredWoobleDesc.insertAdjacentHTML('beforeend', button);
      }
      // === FEATURED WOOBLE SECTION END ===

      // === KIT RENDER SECTION ===
      if(vendor.length == 1 && !product.title.includes('Bundle')) {
        const productHTML = `
                <div class="product-card">
                  <img class="product-img" src="${product.image.src}" >
                  <a href="https://thewoobles.com/products/${product.handle}" class="product-card-overlay">
                    <h4>${product.title}</h4>
                    <span>${product.variants[0].price}</span>
                  </a>
                </div>
                `,
              skillSec = document.querySelector('.product-container[data-skill="'+vendor+'"]');
        
        skillSec.insertAdjacentHTML('beforeend', productHTML);
      }else if(product.title.includes('Bundle')){
        const productHTML = `
                <div class="product-card">
                  <img class="product-img" src="${product.image.src}" >
                  <a href="https://thewoobles.com/products/${product.handle}" class="product-card-overlay">
                    <h4>${product.title}</h4>
                    <span>${product.variants[0].price}</span>
                  </a>
                </div>
                `,
              skillSec = document.querySelector('.product-container[data-skill="Bundle"]');
          
        skillSec.insertAdjacentHTML('beforeend', productHTML);
      }
      // === KIT RENDER SECTION END ===
    });

  });