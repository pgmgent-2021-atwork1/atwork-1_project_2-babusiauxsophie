
  
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".burger-nav");
  const closeButton = document.querySelector(".close-burger-nav");
  const header = document.querySelector("header");
  const dropdown = document.querySelector(".dropdown");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const dropdownArrow = document.querySelector(".dropdown-arrow");
  const gridButton = document.querySelector("#grid-button");
  const listButton = document.querySelector("#list-button");
  // const eventsContainer = document.getElementsByClassName("events-container");
  // const container = document.querySelector("#container");
  // const eventsImg = document.getElementsByClassName("events-img-wrapper");
  
  const imgArray = [
    'banner1',
    'banner2',
    'banner3',
    'banner4',
    'banner5',
    'banner6',
    'banner7'
  ];

  (() => {
    const app = {
      initialize() {
        this.randomizeBackgroundImage();
        this.openBurgerMenu();
        this.closeBurgerMenu();
        this.showProgram();
        // this.changeLayoutEvent();
      },
  
  
      openBurgerMenu() {
        burger.addEventListener("click", (ev) => {
          console.log("clicked");
  
          menu.classList.add("show-burger-nav");
        });
      },
  
      closeBurgerMenu() {
        closeButton.addEventListener("click", (ev) => {
          menu.classList.remove("show-burger-nav");
        });
      },

      randomizeBackgroundImage() {
        const randomImg = imgArray[Math.floor(Math.random()*imgArray.length)]
        const urlImage = `static/media/img/${randomImg}.jpg`;
        header.style.backgroundImage = `url(${urlImage})`;
      },

      showProgram() {
        dropdown.addEventListener("click", (ev) => {
          if (!dropdownMenu.classList.contains("show-dropdown-menu")) {
            dropdownMenu.classList.add("show-dropdown-menu"); 
            dropdownArrow.classList.add("rotate-arrow"); 
          } else {
            dropdownMenu.classList.remove("show-dropdown-menu");
            dropdownArrow.classList.remove("rotate-arrow"); 
          }
        })
      },
      // changeLayoutEvent() {
      //   // Click button to change layout
      //   ???????
      //   listButton.addEventListener("click", (ev) => {
      //     console.log(eventsContainer)
      //     .forEach(element => {
      //       console.log(element.index);
      //     })
      //   })
        
        
      // }
    };
    app.initialize();
  })();
  