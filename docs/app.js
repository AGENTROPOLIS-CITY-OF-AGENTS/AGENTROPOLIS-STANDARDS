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

    const city = new Map();
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function makeTower(item) {
      const g = new THREE.Group();
      const [w,h,d] = item.size;
      const color = new THREE.Color(item.color);
      const mat = new THREE.MeshLambertMaterial({color:0x071019,emissive:color,emissiveIntensity:item.id==="registry"?.14:.05});
      const body = new THREE.Mesh(new THREE.BoxGeometry(w,h*.7,d),mat);
      body.position.y = h*.35;
      g.add(body);

      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(w,h*.7,d)),
        new THREE.LineBasicMaterial({color:item.color,transparent:true,opacity:.58})
      );
      edge.position.y = h*.35;
      g.add(edge);

      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(w*.68,Math.max(1.2,h*.16),d*.68),
        new THREE.MeshLambertMaterial({color:0x0a1117,emissive:color,emissiveIntensity:.14})
      );
      cap.position.y = h*.76;
      g.add(cap);

      if (item.shape === "spire") {
        const spire = new THREE.Mesh(
          new THREE.ConeGeometry(1.1,4.6,4),
          new THREE.MeshLambertMaterial({color:0x06161b,emissive:0x00ffff,emissiveIntensity:.25})
        );
        spire.position.y = h*.98;
        spire.rotation.y = Math.PI/4;
        g.add(spire);
      }

      const el = document.createElement("div");
      el.className = "label3d " + maturityClass(item.maturity);
      el.innerHTML = '<span class="led"></span>' + item.code + " · " + item.name;
      const tag = new CSS2DObject(el);
      tag.position.set(0,h+1.6,0);
      g.add(tag);

      g.userData = {id:item.id,mat};
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