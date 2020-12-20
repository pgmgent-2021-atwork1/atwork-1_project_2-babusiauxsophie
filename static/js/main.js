
  
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".burger-nav");
  const closeButton = document.querySelector(".close-burger-nav");
  
  (() => {
    const app = {
      initialize() {
        
        this.openBurgerMenu();
        this.CloseBurgerMenu();
      },
  
  
      openBurgerMenu() {
        burger.addEventListener("click", (ev) => {
          console.log("clicked");
  
          menu.classList.add("show-burger-nav");
        });
      },
  
      CloseBurgerMenu() {
        closeButton.addEventListener("click", (ev) => {
          menu.classList.remove("show-burger-nav");
        });
      },
    };
    app.initialize();
  })();
  