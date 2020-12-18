
  
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".burger-nav");
  const closeButton = document.querySelector(".close-burger-nav");
  
  (() => {
    const app = {
      initialize() {
        
        this.openShoppingCart();
        this.closeShoppingCart();
      },
  
  
      openShoppingCart() {
        burger.addEventListener("click", (ev) => {
          console.log("clicked");
  
          menu.classList.add("show-burger-nav");
        });
      },
  
      closeShoppingCart() {
        closeButton.addEventListener("click", (ev) => {
          menu.classList.remove("show-burger-nav");
        });
      },
    };
    app.initialize();
  })();
  