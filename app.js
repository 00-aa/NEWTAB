// SERVICE-WORKER INITLIZE FUNCTIONS
  const ServiceWorkerFileUrl = "./service-worker.js";
  
  function ServiceWorkerInitlize(){
    if((navigator.serviceWorker) && ("serviceWorker" in navigator)){
      navigator.serviceWorker.register(ServiceWorkerFileUrl).then((SWRegistration)=>{
        console.warn("SERVICE-WORKER REGISTERED SUCCESSFULLY!");
        SWRegistration.onupdatefound = ()=>{
          SWRegistration.update().then(()=>{
            console.warn("SERVICE-WORKER UPDATED SUCCESSFULLY");
          }).catch((err)=>{
            console.error("SERVICE-WORKER UPDATE ERROR BY BROWSER: "+err);
          })
        }
      }).catch((err)=>{
        console.error("SERVICE-WORKER REGISTRATION ERROR BY BROWSER: "+err);
      });
    }else{
      console.warn("SERVICE-WORKER NOT SUPPORTED BY BROWSER!");
    }
  }
  
  
// STORAGE PRESIST INITLIZE
  function StorageInitlize(){
    if((navigator.storage) && ("storage" in navigator)){
      navigator.storage.persist().then((StoResult)=>{
        if(StoResult === true){
          console.warn("STORAGE PERSISTED SUCCESSFULLY");
        }else{
          console.warn("STORAGE NOT PERSISTED!");
        }
      })
    }else{
      console.error("STORAGE PERSIST NOT SUPPORTED BY BROWSER!");
    }
  }
  
  
// INITLIZING SERVICE-WORKER & STORAGE PERSIST
  window.onload = ()=>{
    //ServiceWorkerInitlize();
    StorageInitlize();
  }
  
  
// PWA INSTALL PROMPT HANDLE
  window.onbeforeinstallprompt = (event)=>{
    event.preventDefault();
    window.PWAInstallprompt = event;
    console.warn("WEBSITE IS REDY TO DOWNLOAD AS PWA!");
    
    PWAInstallprompt.prompt();
  }
