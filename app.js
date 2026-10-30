const HERO_CANDIDATES = [
  "./media/standards-hero.mp4",
  "./media/standards-hero.webm",
  "./assets/standards-hero.mp4"
];
const EXPLAINER_CANDIDATES = [
  "./media/standards-explainer.mp4",
  "./media/standards-explainer.webm",
  "./assets/standards-explainer.mp4"
];

const LANDMARKS = [
  {id:"registry",code:"00",name:"APS REGISTRY",maturity:"CANON",color:"#00ffff",source:"AGENTROPOLIS-STANDARDS",role:"Standards authority",path:"Protocol → APS → Conformance",copy:"Working protocols become public specifications only after reusable semantics, conformance and independent implementation are proven.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-STANDARDS/tree/main/standards",pos:[0,0,0],size:[6.4,12.5,6.4],shape:"spire"},
  {id:"pay",code:"01",name:"AGENT PAYMENT",maturity:"C3",color:"#39ff14",source:"AGENTROPOLIS-PAY-PROTOCOL",role:"Economic authority",path:"Intent → Policy → Approval → Settlement → Receipt",copy:"Governed economic intent and settlement with explicit authority and receipts.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-PAY-PROTOCOL",pos:[-12,0,-11],size:[6.8,9.8,6.4]},
  {id:"identity",code:"02",name:"IDENTITY + DELEGATION",maturity:"C2",color:"#00ffff",source:"AGENTROPOLIS-SOVEREIGNTY",role:"Identity authority",path:"Root DID → Delegation → Agent DID → Mandate → Receipt",copy:"Portable identity, delegation and mandate boundaries.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-SOVEREIGNTY",pos:[0,0,-15],size:[6.2,8.8,6.2]},
  {id:"mcp",code:"03",name:"MCP AUTHORITY",maturity:"C2",color:"#00ffff",source:"AGENTROPOLIS-AGENT-MCP",role:"Capability membrane",path:"Capability → Permission → Tool → Execution → Evidence",copy:"Tool availability never implies permission. Capability scope and evidence stay explicit.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-AGENT-MCP",pos:[12,0,-11],size:[6.8,8.3,6.4]},
  {id:"atg",code:"04",name:"ATG",maturity:"C2",color:"#00ffff",source:"AGENTROPOLIS-ATG",role:"Agentic language",path:"Meaning → Profile → Runtime → Receipt",copy:"Portable semantics for identity, mandate, capability and evidence.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-ATG",pos:[16,0,2],size:[6.3,7.8,6.3]},
  {id:"ontology",code:"05",name:"ONTOLOGY",maturity:"C2",color:"#00ffff",source:"AGENTROPOLIS-ONTOLOGY",role:"Semantic substrate",path:"Entity → Relationship → Evidence → Audit",copy:"Shared identifiers and relationships across the Intelligence Grid.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-ONTOLOGY",pos:[11,0,13],size:[6.4,8.1,6.4]},
  {id:"gtm",code:"06",name:"UGC / GTM",maturity:"C2",color:"#00ffff",source:"WIRED-CHAOS-GTM",role:"Distribution standard",path:"Rights → Mandate → Publish → Attribute → Compensate → Receipt",copy:"UGC rights, distribution authority, attribution, performance evidence and compensation receipts.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/WIRED-CHAOS-GTM",pos:[0,0,16],size:[7.3,8.6,6.8]},
  {id:"hermes",code:"07",name:"RUNTIME HANDOFF",maturity:"C2",color:"#00ffff",source:"HERMES-CITY",role:"Runtime coordination",path:"Spawn → Context → Capability → Handoff → Receipt",copy:"Portable spawn, context, capability transfer and continuity.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/HERMES-CITY",pos:[-11,0,13],size:[6.6,7.7,6.3]},
  {id:"ip",code:"08",name:"PUBLIC IP",maturity:"C1",color:"#ff3131",source:"AGENTROPOLIS-PUBLIC-IP-DISTRICT",role:"Rights authority",path:"Creation → Ownership → License → Distribution Authority → Evidence",copy:"Creation, ownership, licensing and distribution authority remain separate.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-PUBLIC-IP-DISTRICT",pos:[-16,0,2],size:[6.4,6.9,6.2]}
];

const $ = (id) => document.getElementById(id);
const byId = (id) => LANDMARKS.find((x) => x.id === id);

async function loadFirstPlayable(video, candidates, readyClassTarget) {
  if (!video) return false;
  for (const src of candidates) {
    const ok = await new Promise((resolve) => {
      const cleanup = () => {
        video.removeEventListener("loadedmetadata", yes);
        video.removeEventListener("error", no);
      };
      const yes = () => { cleanup(); resolve(true); };
      const no = () => { cleanup(); resolve(false); };
      video.addEventListener("loadedmetadata", yes, {once:true});
      video.addEventListener("error", no, {once:true});
      video.src = src;
      video.load();
    });
    if (ok) {
      readyClassTarget?.classList.add("has-video");
      return true;
    }
  }
  video.removeAttribute("src");
  return false;
}

function setupMedia() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = $("hero-video");
  const heroHost = document.querySelector(".hero-media");
  const explainer = $("explainer-video");
  const explainerHost = document.querySelector(".video-shell");

  if (!reduced) {
    loadFirstPlayable(hero, HERO_CANDIDATES, heroHost).then((ok) => {
      if (ok) hero.play().catch(() => {});
    });
  }
  loadFirstPlayable(explainer, EXPLAINER_CANDIDATES, explainerHost);
}

function maturityClass(value) {
  return value === "C1" ? "c1" : value === "C2" ? "c2" : value === "C3" ? "c3" : "";
}

function detailMarkup(item) {
  return `
    <div class="district-detail-row">
      <div>
        <p class="kicker">${item.code} · ${item.source}</p>
        <h3>${item.name}</h3>
      </div>
      <span class="tag ${maturityClass(item.maturity)}">${item.maturity}</span>
    </div>
    <p>${item.copy}</p>
    <a href="${item.repo}" target="_blank" rel="noreferrer">OPEN SOURCE / SPEC →</a>
  `;
}

async function mountDistrict(root) {
  if (root.dataset.ready === "true") return;
  root.dataset.ready = "true";
  root.innerHTML = '<canvas class="district-canvas" aria-label="Interactive Standards District"></canvas><div class="district-topline">WORLD GRID → STANDARDS DISTRICT → <strong>APS REGISTRY</strong></div><section class="district-detail"></section>';

  const canvas = root.querySelector(".district-canvas");
  const detail = root.querySelector(".district-detail");
  detail.innerHTML = detailMarkup(LANDMARKS[0]);

  try {
    const THREE = await import("three");
    const {OrbitControls} = await import("three/addons/controls/OrbitControls.js");
    const {CSS2DRenderer,CSS2DObject} = await import("three/addons/renderers/CSS2DRenderer.js");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.018);

    const camera = new THREE.PerspectiveCamera(46,1,.1,180);
    camera.position.set(24,20,31);

    const renderer = new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.35));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const labels = new CSS2DRenderer();
    labels.domElement.style.position = "absolute";
    labels.domElement.style.inset = "0";
    labels.domElement.style.pointerEvents = "none";
    root.appendChild(labels.domElement);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = .075;
    controls.minDistance = 10;
    controls.maxDistance = 62;
    controls.target.set(0,3,0);

    scene.add(new THREE.HemisphereLight(0xd8f6ff,0x020306,.95));
    scene.add(new THREE.AmbientLight(0xffffff,.42));
    const sun = new THREE.DirectionalLight(0xffffff,1.05);
    sun.position.set(14,28,12);
    scene.add(sun);
    const core = new THREE.PointLight(0x00ffff,2.2,40);
    core.position.set(0,8,0);
    scene.add(core);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(86,86),new THREE.MeshLambertMaterial({color:0x04080c}));
    ground.rotation.x = -Math.PI/2;
    scene.add(ground);

    const grid = new THREE.GridHelper(78,26,0x00ffff,0x10232b);
    grid.material.transparent = true;
    grid.material.opacity = .28;
    grid.position.y = .01;
    scene.add(grid);

    for (const angle of [0,Math.PI/4,Math.PI/2,-Math.PI/4]) {
      const road = new THREE.Mesh(new THREE.PlaneGeometry(5.2,64),new THREE.MeshBasicMaterial({color:0x06131a}));
      road.rotation.x = -Math.PI/2;
      road.rotation.z = angle;
      road.position.y = .025;
      scene.add(road);
    }

    // Explicit street furniture and district walkways. Decorative only: no fake entries.
    const walkwayMaterial=new THREE.MeshStandardMaterial({color:0x182831,metalness:.3,roughness:.75});
    const stripeMaterial=new THREE.MeshBasicMaterial({color:0x18b9c7});
    const paths=[[-16,-11,16,-11],[-16,2,16,2],[-16,13,16,13]];
    for(const [x1,z1,x2,z2] of paths){
      const length=Math.hypot(x2-x1,z2-z1);
      const pavement=new THREE.Mesh(new THREE.BoxGeometry(length,.11,1.7),walkwayMaterial);
      pavement.position.set((x1+x2)/2,.085,(z1+z2)/2);
      scene.add(pavement);
      const stripe=new THREE.Mesh(new THREE.BoxGeometry(length,.018,.03),stripeMaterial);
      stripe.position.set(pavement.position.x,.15,pavement.position.z);
      scene.add(stripe);
    }
    for(let x=-28;x<=28;x+=8){
      const pole=new THREE.Mesh(new THREE.CylinderGeometry(.075,.105,3.2,8),steelMaterial);
      pole.position.set(x,1.7,-23);
      scene.add(pole);
      const lamp=new THREE.Mesh(new THREE.BoxGeometry(.7,.12,.2),new THREE.MeshBasicMaterial({color:0x18b9c7}));
      lamp.position.set(x,3.3,-23);
      scene.add(lamp);
    }

    const city = new Map();
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const facadeMaterial = new THREE.MeshStandardMaterial({color:0x101b24,metalness:.76,roughness:.32});
    const steelMaterial = new THREE.MeshStandardMaterial({color:0x223642,metalness:.88,roughness:.26});
    const glassMaterial = new THREE.MeshPhysicalMaterial({color:0x173b49,metalness:.35,roughness:.14,transparent:true,opacity:.9,clearcoat:1});
    const pavementMaterial = new THREE.MeshStandardMaterial({color:0x0b131b,metalness:.18,roughness:.83});
    const lintelMaterial = new THREE.MeshStandardMaterial({color:0x081018,metalness:.7,roughness:.3});
    const facadeGeo = new THREE.BoxGeometry(1,1,1);

    function solid(group, material, w, h, d, x, y, z) {
      const mesh = new THREE.Mesh(facadeGeo, material);
      mesh.position.set(x,y,z);
      mesh.scale.set(w,h,d);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      return mesh;
    }

    function makeTower(item) {
      const g = new THREE.Group();
      const [w,h,d] = item.size;
      const accent = new THREE.Color(item.color);
      const accentMat = new THREE.MeshStandardMaterial({color:accent,emissive:accent,emissiveIntensity:.28,metalness:.66,roughness:.27});
      const bodyMat = facadeMaterial.clone();
      bodyMat.emissive = accent.clone();
      bodyMat.emissiveIntensity = .025;
      const bodyHeight = h*.78;
      const base = solid(g,pavementMaterial,w+2.8,.42,d+2.8,0,.21,0);
      base.receiveShadow = true;
      solid(g,bodyMat,w,bodyHeight,d,0,.42+bodyHeight/2,0);
      solid(g,steelMaterial,w+1,.26,d+1,0,.58,0);
      solid(g,steelMaterial,w+.8,.34,d+.8,0,.42+bodyHeight,0);
      solid(g,lintelMaterial,w*.77,.65,d*.77,0,.9+bodyHeight,0);

      // Layered spandrels and window ribbons read as real facades, not glowing boxes.
      const floors = Math.max(3,Math.round(bodyHeight/1.65));
      const facadeY = .42;
      for (let floor=0;floor<floors;floor++) {
        const y=facadeY+(floor+.55)*bodyHeight/floors;
        const floorHeight=bodyHeight/floors;
        const depth=.12;
        for (const sign of [-1,1]) {
          const z=sign*(d/2+.055);
          solid(g,glassMaterial,w*.81,Math.max(.4,floorHeight*.53),depth,0,y,z);
          for(let col=-2;col<=2;col++){
            solid(g,steelMaterial,.09,floorHeight*.65,.18,col*w*.155,y,z+sign*.025);
          }
          solid(g,steelMaterial,w+.22,.09,.2,0,y+floorHeight*.35,z);
          const x=sign*(w/2+.055);
          solid(g,glassMaterial,.12,Math.max(.4,floorHeight*.48),d*.76,x,y,0);
          for(let col=-1;col<=1;col++) solid(g,steelMaterial,.16,floorHeight*.65,.11,x+sign*.02,y,col*d*.23);
        }
      }

      // Street-level entrance, canopy, stair and restrained landmark lighting.
      solid(g,lintelMaterial,w*.43,2.35,.24,0,1.63,d/2+.17);
      solid(g,glassMaterial,w*.31,1.94,.17,0,1.46,d/2+.32);
      solid(g,steelMaterial,w*.6,.2,1.35,0,2.85,d/2+.75);
      for(let step=0;step<3;step++) solid(g,pavementMaterial,w*.55-step*.24,.18,.52,0,.16+step*.14,d/2+2-step*.48);
      solid(g,accentMat,w*.65,.055,.14,0,3,d/2+.73);

      // Skyline character differs per standards institution.
      const roofY=.88+bodyHeight;
      if(item.shape==="spire"){
        solid(g,steelMaterial,w*.52,2.4,d*.52,0,roofY+1.2,0);
        const crown = new THREE.Mesh(new THREE.CylinderGeometry(.22,1.8,5,8),steelMaterial);
        crown.position.y=roofY+4.65;
        crown.castShadow=true;g.add(crown);
        const antenna = new THREE.Mesh(new THREE.CylinderGeometry(.04,.09,5.8,8),accentMat);
        antenna.position.y=roofY+9.8;g.add(antenna);
      } else {
        solid(g,steelMaterial,w*.5,1.25,d*.48,0,roofY+.65,0);
        solid(g,glassMaterial,w*.36,.45,d*.33,0,roofY+1.55,0);
        for(const sx of [-1,1]) solid(g,accentMat,.09,1.65,.11,sx*w*.34,roofY+.9,d*.22);
      }

      const el=document.createElement("div");
      el.className="label3d "+maturityClass(item.maturity);
      el.textContent=item.code+" · "+item.name;
      const tag=new CSS2DObject(el);
      tag.position.set(0,roofY+(item.shape==="spire"?12:4),0);
      g.add(tag);
      g.userData={id:item.id,mat:bodyMat};
      return g;
    }

    LANDMARKS.forEach((item) => {
      const tower = makeTower(item);
      tower.position.set(...item.pos);
      scene.add(tower);
      city.set(item.id,tower);
    });

    let goal = new THREE.Vector3(22,18,27);
    let look = new THREE.Vector3(0,5,0);
    let flying = true;

    function focus(item) {
      detail.innerHTML = detailMarkup(item);
      root.querySelector(".district-topline strong").textContent = item.name;
      const p = new THREE.Vector3(...item.pos);
      if (item.id === "registry") {
        goal.set(22,18,27);
        look.set(0,5,0);
      } else {
        const side = new THREE.Vector3(item.pos[0],0,item.pos[2]).normalize();
        if (side.lengthSq() < .01) side.set(1,0,1).normalize();
        goal.copy(p).add(side.multiplyScalar(10)).add(new THREE.Vector3(0,item.size[1]*.72+4,0));
        look.set(item.pos[0],item.size[1]*.42,item.pos[2]);
      }
      flying = true;
      for (const [id,tower] of city) {
        const active = id === item.id;
        const data = byId(id);
        tower.userData.mat.emissive = new THREE.Color(active ? data.color : "#000000");
        tower.userData.mat.emissiveIntensity = active ? .28 : .04;
      }
    }

    canvas.addEventListener("pointerdown",(ev) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((ev.clientX-rect.left)/rect.width)*2-1;
      pointer.y = -((ev.clientY-rect.top)/rect.height)*2+1;
      ray.setFromCamera(pointer,camera);
      const hits = ray.intersectObjects([...city.values()],true);
      if (!hits.length) return;
      let obj = hits[0].object;
      while (obj && !obj.userData.id) obj = obj.parent;
      if (obj?.userData.id) focus(byId(obj.userData.id));
    });

    function resize() {
      const w = root.clientWidth;
      const h = root.clientHeight;
      camera.aspect = w/Math.max(1,h);
      camera.updateProjectionMatrix();
      renderer.setSize(w,h,false);
      labels.setSize(w,h);
    }
    window.addEventListener("resize",resize);
    resize();

    let last = performance.now();
    function frame(now) {
      if (!document.body.contains(root)) return;
      const dt = Math.min((now-last)/1000,.1);
      last = now;
      if (flying) {
        camera.position.lerp(goal,1-Math.exp(-dt*2.8));
        controls.target.lerp(look,1-Math.exp(-dt*2.8));
        if (camera.position.distanceTo(goal) < .1) flying = false;
      }
      controls.update();
      renderer.render(scene,camera);
      labels.render(scene,camera);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    focus(LANDMARKS[0]);
  } catch (error) {
    console.error("Spatial district failed:",error);
    root.innerHTML = '<div class="district-loading">Spatial renderer unavailable. Use the standards cards and source links below the hero.</div>';
  }
}

function setupDistrict() {
  const dialog = $("district-dialog");
  const root = $("district-root");
  document.querySelectorAll("[data-open-district]").forEach((button) => {
    button.addEventListener("click", async () => {
      dialog.showModal();
      await mountDistrict(root);
    });
  });
  document.querySelector("[data-close-district]")?.addEventListener("click",() => dialog.close());
  dialog.addEventListener("click",(event) => {
    if (event.target === dialog) dialog.close();
  });
}

setupMedia();
setupDistrict();