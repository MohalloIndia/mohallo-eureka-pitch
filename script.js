gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  gsap.to(loader, {opacity:0, duration:.7, delay:.5, onComplete:()=>loader.remove()});

  const chapterNo = document.getElementById("chapterNo");
  const chapterName = document.getElementById("chapterName");
  const dots = [...document.querySelectorAll(".dot")];

  const scenes = [...document.querySelectorAll(".scene")];

  scenes.forEach((scene, i) => {
    ScrollTrigger.create({
      trigger: scene,
      start: "top center",
      end: "bottom center",
      onEnter: () => setChapter(i),
      onEnterBack: () => setChapter(i)
    });
  });

  function setChapter(i){
    chapterNo.textContent = scenes[i].dataset.chapter;
    chapterName.textContent = scenes[i].dataset.name;
    dots.forEach((d,j)=>d.classList.toggle("active", j===i));
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      document.getElementById(dot.dataset.target).scrollIntoView({behavior:"smooth"});
    });
  });

  // Scene 1: the shop breathes and the thought appears
  const s1 = gsap.timeline({
    scrollTrigger:{trigger:"#scene-problem",start:"top top",end:"bottom bottom",scrub:1}
  });
  s1.fromTo(".shop",{scale:.86,x:120},{scale:1,x:0,duration:.28,ease:"power2.out"})
    .to(".t1",{opacity:1,y:-8,duration:.15})
    .to(".t1",{opacity:0,y:-20,duration:.10},"+=.10")
    .to(".t2",{opacity:1,y:-5,duration:.18})
    .to(".problem-copy",{y:-90,opacity:.12,duration:.25},"-=.12")
    .to(".main-boy",{y:-22,scale:1.04,duration:.2},"<");

  // Scene 2: classroom conversation
  const s2 = gsap.timeline({
    scrollTrigger:{trigger:"#scene-idea",start:"top top",end:"bottom bottom",scrub:1}
  });
  s2.fromTo(".classroom",{scale:1.05,y:80},{scale:1,y:0,duration:.2})
    .to(".s-a",{opacity:1,y:-5,duration:.15})
    .to(".s-b",{opacity:1,y:-5,duration:.15})
    .to(".idea-copy",{y:-60,opacity:1,duration:.25},"-=.05")
    .to(".board span",{rotation:360,scale:1.15,duration:.2});

  // Scene 3: smoke + logo reveal
  const s3 = gsap.timeline({
    scrollTrigger:{trigger:"#scene-reveal",start:"top top",end:"bottom bottom",scrub:1}
  });
  s3.fromTo(".smoke-a",{x:-160,y:80,scale:.5,opacity:.15},{x:80,y:-30,scale:1.5,opacity:.55,duration:.2})
    .fromTo(".smoke-b",{x:160,y:-80,scale:.5,opacity:.1},{x:-90,y:30,scale:1.4,opacity:.5,duration:.2},"<")
    .fromTo(".logo-reveal",{opacity:0,scale:.62,y:30},{opacity:1,scale:1,y:0,duration:.25,ease:"power3.out"})
    .to(".reveal-glow",{scale:1.5,opacity:.22,duration:.2},"<")
    .to(".reveal-line",{opacity:.8,duration:.15});

  // Scene 4: physical-to-digital feeling
  const s4 = gsap.timeline({
    scrollTrigger:{trigger:"#scene-solution",start:"top top",end:"bottom bottom",scrub:1}
  });
  s4.fromTo(".phone",{x:180,rotate:8,opacity:0},{x:0,rotate:0,opacity:1,duration:.28,ease:"power3.out"})
    .fromTo(".solution-copy",{x:-80,opacity:0},{x:0,opacity:1,duration:.2},"<")
    .fromTo(".o1",{x:80,opacity:0},{x:0,opacity:1,duration:.12})
    .fromTo(".o2",{x:110,opacity:0},{x:0,opacity:1,duration:.12})
    .fromTo(".o3",{x:80,opacity:0},{x:0,opacity:1,duration:.12});

  // Scene 5: plans rise into place
  const s5 = gsap.timeline({
    scrollTrigger:{trigger:"#scene-business",start:"top top",end:"bottom bottom",scrub:1}
  });
  s5.fromTo(".starter",{y:130,rotate:-4,opacity:0},{y:0,rotate:-2,opacity:1,duration:.28,ease:"power3.out"})
    .fromTo(".growth",{y:220,rotate:5,opacity:0},{y:70,rotate:2,opacity:1,duration:.3},"<.08")
    .fromTo(".future-pills span",{y:20,opacity:0},{y:0,opacity:1,stagger:.06,duration:.16},"-=.08");

  // Scene 6: the people behind the idea
  const s6 = gsap.timeline({
    scrollTrigger:{trigger:"#scene-team",start:"top top",end:"bottom bottom",scrub:1}
  });
  s6.fromTo(".team-intro",{x:-70,opacity:0},{x:0,opacity:1,duration:.22,ease:"power2.out"})
    .fromTo(".team-card",{y:70,opacity:0,scale:.96},{y:0,opacity:1,scale:1,stagger:.08,duration:.2,ease:"power2.out"},"-=.12")
    .fromTo(".team-footer",{y:25,opacity:0},{y:0,opacity:1,duration:.16},"-=.06");

  // Scene 7: zoom out to vision, then final lockup
  const s7 = gsap.timeline({
    scrollTrigger:{trigger:"#scene-vision",start:"top top",end:"bottom bottom",scrub:1}
  });
  s7.fromTo(".city",{scale:.78,y:80},{scale:1,y:0,duration:.35})
    .fromTo(".vision-copy",{y:60,opacity:0},{y:0,opacity:1,duration:.2},"-=.15")
    .fromTo(".local-glow",{scale:0},{scale:1,stagger:.06,duration:.15},"-=.18")
    .fromTo(".final-lockup",{opacity:0,y:50},{opacity:1,y:0,duration:.25},"+=.05");

  // Subtle mouse movement on desktop
  if (window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", e => {
      const x = (e.clientX / innerWidth - .5) * 2;
      const y = (e.clientY / innerHeight - .5) * 2;
      gsap.to(".main-boy,.friend,.shopkeeper", {x:x*5,y:y*3,duration:1,ease:"power2.out",overwrite:true});
      gsap.to(".phone", {x:x*5,y:y*3,duration:1,ease:"power2.out",overwrite:true});
    });
  }
});