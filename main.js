
  const DefaulCustomStyles = {
    BLUR: "100",
    BORDER: "200",
    THEME: "dark",
    BACKGROUND: "/NEWTAB/ASSETS/BACKGROUNDS/00.mp4"
  }
  
  if ( !(getLocalCustumStyles()) ) setLocalCustumStyles(DefaulCustomStyles);
  
  ApplyCustomSettings();
  ApplyCustomStyle(getLocalCustumStyles());
  
  function getLocalCustumStyles(){
    return JSON.parse(localStorage.getItem("UserCustomStyles"));
  }
  function setLocalCustumStyles(StylesObj){
    localStorage.setItem("UserCustomStyles", JSON.stringify(StylesObj));
  }
  
  MAIN_SETTINGS_CONTAINER.oninput = ()=>{
    const UserCustomStyles = {
      BLUR: INP_BG_BLUR.value,
      BORDER: INP_BG_RADIUS.value,
      THEME: document.querySelector('input[name="theme-select-group"]:checked').value,
      BACKGROUND: INP_BG_VIDEO.value
    }
    ApplyCustomStyle(UserCustomStyles)
    setLocalCustumStyles(UserCustomStyles)
  }
  
  function ApplyCustomStyle(UserCustomStyles){
    
    document.documentElement.style.setProperty("--GLASSMORPH-BACKGROUND-BLUR", UserCustomStyles.BLUR / 10 + "px");
    document.documentElement.style.setProperty("--GLASSMORPH-BACKGROUND-RADIOUS", UserCustomStyles.BORDER / 10 + "px");
    
    if (UserCustomStyles.THEME === "light"){
      document.documentElement.style.setProperty("--GLASSMORPH-BACKGROUND-COLOR", "#ffffff11");
    }else if (UserCustomStyles.THEME === "dark"){
      document.documentElement.style.setProperty("--GLASSMORPH-BACKGROUND-COLOR", "#00000044");
    }
    
    if (document.getElementById("MAIN-LIVE-BACKGROUND").getAttribute("src") !== UserCustomStyles.BACKGROUND){
      document.getElementById("MAIN-LIVE-BACKGROUND").src = UserCustomStyles.BACKGROUND;
    }
  }
  
  function ApplyCustomSettings(){
    const LocalUserCustomStyle = getLocalCustumStyles() || DefaulCustomStyles;
    
    INP_BG_BLUR.value = LocalUserCustomStyle.BLUR;
    INP_BG_RADIUS.value = LocalUserCustomStyle.BORDER;
    
    if (LocalUserCustomStyle.THEME === "light") {
      document.querySelector('input[type="radio"][value="light"]').checked = true;
    }else {
      document.querySelector('input[type="radio"][value="dark"]').checked = true;
    }
    
    INP_BG_VIDEO.value = LocalUserCustomStyle.BACKGROUND;
    
  }
  
  
  InpSearchSubmit.onclick = ()=>{
    const UserSearch = InpSearch.value;
    if (!UserSearch) return;
    //InpSearch.value = "";
    
    window.open(`https://www.google.com/search?q=${UserSearch}`, '_self');
  }
  
  