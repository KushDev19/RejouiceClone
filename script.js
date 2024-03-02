function locoScroll(){
  gsap.registerPlugin(ScrollTrigger);


  // --- SETUP START ---
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.defaults({ scroller: "#main" });
  // --- SETUP END ---
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locoScroll()

function cursorEffect(){
  var page1Content = document.querySelector("#page1");
  var cursor = document.querySelector("#cursor");

  page1Content.addEventListener("mousemove", function(e) {
      gsap.to(cursor,{
        x: e.x,
        y: e.y
      })
    
  });

  page1Content.addEventListener("mouseenter", function(){
      gsap.to(cursor,{
          scale:1,
          opacity: 1
      })
  });

  page1Content.addEventListener("mouseleave", function(){
      gsap.to(cursor,{
          scale:0,
          opacity: 0
      })
  });
}

cursorEffect();

function page2Animation() {
  gsap.from("#onediv h1, #twodiv, .pg2-content #effect .div1",{
    y: 120,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 100%",
      end: "top 0%",
      scrub: true
    }
  });

  gsap.from("#line",{
    x: -200,
    duration: 1.8,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      scrub: true
    }
  });
}

page2Animation();

function VideoPlay() {
  const videos = document.querySelectorAll(".videos");
  const box = document.querySelectorAll("#box");
  
  videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
      video.play();
  });

    box.forEach(boxs => {
      boxs.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  });
}

VideoPlay();

function Loader() {
  var tl = gsap.timeline()
  
  tl.from("#loader h3", {
    x:60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
  })

  tl.to("#loader h3",{
    opacity:0,
    stagger: 0.1,
    duration:0.7,
    x:-20
  })
  
  tl.to("#loader",{
    opacity:0,
    duration: 1,
    
  })
  
  tl.from("#page1 #page1-content h1 span",{
    y:100,
    opacity: 0,
    duration: 0.5,
    delay:-0.7,
    stagger: 0.05
  })

  tl.to("#loader",{
    display:"none"
    
  })
}

Loader();