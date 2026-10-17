const STORE_KEY = "agentropolis-standards-tier";

const LANDMARKS = [
  {id:"registry",code:"00",name:"APS REGISTRY",maturity:"CANON",color:"#00ffff",source:"AGENTROPOLIS-STANDARDS",role:"Standards authority",path:"Protocol → APS → Conformance",copy:"The canonical registry that turns working AGENTROPOLIS protocols into implementation-neutral specifications, conformance tests and interoperable standards.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-STANDARDS/tree/main/standards",pos:[0,0,0],size:[6.4,12.5,6.4],shape:"spire"},
  {id:"pay",code:"01",name:"GOVERNED AGENT PAYMENT",maturity:"C3",color:"#39ff14",source:"AGENTROPOLIS-PAY-PROTOCOL",role:"Economic authority",path:"Intent → Policy → Approval → Settlement → Receipt",copy:"Standardizes governed agentic payments so economic intent cannot silently become execution authority.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-PAY-PROTOCOL",pos:[-12,0,-11],size:[6.8,9.8,6.4]},
  {id:"identity",code:"02",name:"AGENT IDENTITY + DELEGATION",maturity:"C2",color:"#00ffff",source:"AGENTROPOLIS-SOVEREIGNTY",role:"Identity authority",path:"Root DID → Delegation → Agent DID → Mandate → Receipt",copy:"Defines portable agent identity, controller relationships, delegation, mandate boundaries and signed execution evidence.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-SOVEREIGNTY",pos:[0,0,-15],size:[6.2,8.8,6.2]},
  {id:"mcp",code:"03",name:"MCP CAPABILITY AUTHORITY",maturity:"C2",color:"#00ffff",source:"AGENTROPOLIS-AGENT-MCP",role:"Capability membrane",path:"Capability → Permission → Tool → Execution → Evidence",copy:"Defines how agents declare, receive and exercise tool capabilities without inferring permission from availability.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-AGENT-MCP",pos:[12,0,-11],size:[6.8,8.3,6.4]},
  {id:"atg",code:"04",name:"ATG SEMANTIC CONTRACT",maturity:"C2",color:"#00ffff",source:"AGENTROPOLIS-ATG",role:"Agentic language",path:"Meaning → Profile → Runtime → Receipt",copy:"The Atralith agentic language and semantic contract for portable identity, mandate, capability, evidence and runtime state.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-ATG",pos:[16,0,2],size:[6.3,7.8,6.3]},
  {id:"ontology",code:"05",name:"CORE ONTOLOGY",maturity:"C2",color:"#00ffff",source:"AGENTROPOLIS-ONTOLOGY",role:"Semantic substrate",path:"Entity → Relationship → Evidence → Audit",copy:"Normalizes agents, skills, memory, policies, workflows, permissions, routing, evidence and authority relationships across the grid.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-ONTOLOGY",pos:[11,0,13],size:[6.4,8.1,6.4]},
  {id:"gtm",code:"06",name:"UGC DISTRIBUTION + ATTRIBUTION",maturity:"C2",color:"#00ffff",source:"WIRED-CHAOS-GTM",role:"Distribution standard",path:"Rights → Mandate → Publish → Attribute → Compensate → Receipt",copy:"Standardizes UGC rights, campaign authority, publication, attribution, performance evidence and compensation receipts.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/WIRED-CHAOS-GTM",pos:[0,0,16],size:[7.3,8.6,6.8]},
  {id:"hermes",code:"07",name:"HERMES RUNTIME HANDOFF",maturity:"C2",color:"#00ffff",source:"HERMES-CITY",role:"Runtime coordination",path:"Spawn → Context → Capability → Handoff → Receipt",copy:"Extracts portable spawn, continuity, capability transfer, coordination and runtime handoff semantics.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/HERMES-CITY",pos:[-11,0,13],size:[6.6,7.7,6.3]},
  {id:"ip",code:"08",name:"PUBLIC IP + RIGHTS",maturity:"C1",color:"#ff3131",source:"AGENTROPOLIS-PUBLIC-IP-DISTRICT",role:"Rights authority",path:"Creation → Ownership → License → Distribution Authority → Evidence",copy:"Separates provenance, ownership, licensing, distribution authority, attribution and evidence so creative rights remain explicit.",repo:"https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-PUBLIC-IP-DISTRICT",pos:[-16,0,2],size:[6.4,6.9,6.2]}
];

const $ = (id) => document.getElementById(id);
const byId = (id) => LANDMARKS.find(x => x.id === id);
let current = "registry";
let world = null;

function tierFromStore(){
  const saved = localStorage.getItem(STORE_KEY);
  return ["full","adaptive","lite","minimum"].includes(saved) ? saved : "adaptive";
}
const state = { tier:tierFromStore(), reduced:window.matchMedia("(prefers-reduced-motion: reduce)").matches };

function selectTier(tier){
  if(!["full","adaptive","lite","minimum"].includes(tier)) return;
  localStorage.setItem(STORE_KEY,tier);
  location.reload();
}
function maturityClass(m){ return m==="C1"?"c1":m==="C2"?"c2":m==="C3"?"c3":"neutral"; }

function updateDetail(id){
  const item=byId(id); if(!item) return;
  current=id;
  document.querySelectorAll(".rail-btn").forEach(b=>b.classList.toggle("active",b.dataset.focus===id));
  $("place-label").textContent=item.name;
  $("detail-kicker").textContent=id==="registry"?"CENTRAL AUTHORITY":"APS CANDIDATE";
  $("detail-title").textContent=item.name;
  $("detail-copy").textContent=item.copy;
  $("detail-source").textContent=item.source;
  $("detail-role").textContent=item.role;
  $("detail-path").textContent=item.path;
  $("detail-maturity").textContent=item.maturity;
  $("detail-maturity").className="maturity "+maturityClass(item.maturity);
  $("detail-link").href=item.repo;
  $("navigator-line").textContent=id==="registry"
    ?"The registry is the city authority. Public repos enter as candidates. Only tested, implementation-neutral contracts graduate."
    :item.name+" selected. "+item.path+".";
  world?.focus(id);
}

function buildMinimumMap(){
  const host=$("minimum-map");
  host.innerHTML='<div class="map-grid">'+LANDMARKS.map(x=>`
    <button class="map-card" data-map-focus="${x.id}" data-maturity="${x.maturity}">
      <strong>${x.code} · ${x.name}</strong>
      <small>${x.source}</small>
      <b>${x.maturity}</b>
    </button>`).join("")+'</div>';
  host.querySelectorAll("[data-map-focus]").forEach(btn=>btn.addEventListener("click",()=>updateDetail(btn.dataset.mapFocus)));
}

function bindChrome(){
  document.querySelectorAll("[data-focus]").forEach(btn=>btn.addEventListener("click",()=>updateDetail(btn.dataset.focus)));
  document.querySelectorAll("[data-tier]").forEach(btn=>{
    btn.setAttribute("aria-selected",String(btn.dataset.tier===state.tier));
    btn.addEventListener("click",()=>selectTier(btn.dataset.tier));
  });
}

async function boot(){
  bindChrome(); buildMinimumMap(); updateDetail(current);
  if(state.tier==="minimum"){
    $("gl").hidden=true; $("minimum-map").hidden=false;
    $("navigator-line").textContent="MINIMUM mode preserves the full standards meaning without 3D rendering.";
    return;
  }
  try{
    const THREE=await import("three");
    const {OrbitControls}=await import("three/addons/controls/OrbitControls.js");
    const {CSS2DRenderer,CSS2DObject}=await import("three/addons/renderers/CSS2DRenderer.js");
    world=makeWorld(THREE,OrbitControls,CSS2DRenderer,CSS2DObject);
    world.focus(current,true);
  }catch(err){
    console.warn("3D unavailable, falling back to semantic map.",err);
    $("gl").hidden=true; $("minimum-map").hidden=false;
    $("navigator-line").textContent="3D renderer unavailable. Semantic standards map is active.";
  }
}

function makeWorld(THREE,OrbitControls,CSS2DRenderer,CSS2DObject){
  const canvas=$("gl");
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x000000);
  scene.fog=new THREE.FogExp2(0x000000,0.018);

  const camera=new THREE.PerspectiveCamera(46,1,0.1,180);
  camera.position.set(24,20,31);

  const low=state.tier==="lite";
  const renderer=new THREE.WebGLRenderer({canvas,antialias:!low,alpha:false,powerPreference:low?"low-power":"high-performance"});
  const dpr=state.tier==="full"?1.6:state.tier==="adaptive"?1.25:1;
  renderer.setPixelRatio(Math.min(devicePixelRatio,dpr));
  renderer.outputColorSpace=THREE.SRGBColorSpace;

  const labels=new CSS2DRenderer();
  labels.domElement.style.position="absolute";
  labels.domElement.style.inset="0";
  labels.domElement.style.pointerEvents="none";
  $("stage").appendChild(labels.domElement);

  const controls=new OrbitControls(camera,canvas);
  controls.enableDamping=!state.reduced; controls.dampingFactor=.075;
  controls.minDistance=10; controls.maxDistance=62;
  controls.minPolarAngle=.28; controls.maxPolarAngle=Math.PI/2.08;
  controls.target.set(0,3,0);

  scene.add(new THREE.HemisphereLight(0xd8f6ff,0x020306,.9));
  scene.add(new THREE.AmbientLight(0xffffff,.45));
  const sun=new THREE.DirectionalLight(0xffffff,1.1); sun.position.set(14,28,12); scene.add(sun);
  const cyanCore=new THREE.PointLight(0x00ffff,2.2,40); cyanCore.position.set(0,8,0); scene.add(cyanCore);
  const redCore=new THREE.PointLight(0xff3131,1.15,28); redCore.position.set(-14,4,8); scene.add(redCore);

  const ground=new THREE.Mesh(new THREE.PlaneGeometry(86,86),new THREE.MeshLambertMaterial({color:0x04080c}));
  ground.rotation.x=-Math.PI/2; ground.position.y=-.02; scene.add(ground);

  const grid=new THREE.GridHelper(78,26,0x00ffff,0x10232b);
  grid.material.transparent=true; grid.material.opacity=.34; grid.position.y=.01; scene.add(grid);

  const boulevardMat=new THREE.MeshBasicMaterial({color:0x06131a});
  for(const angle of [0,Math.PI/4,Math.PI/2,-Math.PI/4]){
    const road=new THREE.Mesh(new THREE.PlaneGeometry(5.2,64),boulevardMat);
    road.rotation.x=-Math.PI/2; road.rotation.z=angle; road.position.y=.025; scene.add(road);
    const stripe=new THREE.Mesh(new THREE.PlaneGeometry(.08,64),new THREE.MeshBasicMaterial({color:0x00ffff,transparent:true,opacity:.58}));
    stripe.rotation.x=-Math.PI/2; stripe.rotation.z=angle; stripe.position.y=.04; scene.add(stripe);
  }

  const rings=[];
  [9,19,29].forEach((r,i)=>{
    const ring=new THREE.Mesh(new THREE.RingGeometry(r-.055,r+.055,128),new THREE.MeshBasicMaterial({color:i===2?0xff3131:0x00ffff,transparent:true,opacity:i===2?.36:.5,side:THREE.DoubleSide}));
    ring.rotation.x=-Math.PI/2; ring.position.y=.055+i*.01; scene.add(ring); rings.push(ring);
  });

  const starCount=state.tier==="full"?1000:state.tier==="adaptive"?520:180;
  const starPos=new Float32Array(starCount*3);
  for(let i=0;i<starCount;i++){const a=Math.random()*Math.PI*2,r=22+Math.random()*52;starPos[i*3]=Math.cos(a)*r;starPos[i*3+1]=5+Math.random()*38;starPos[i*3+2]=Math.sin(a)*r}
  const starsGeo=new THREE.BufferGeometry(); starsGeo.setAttribute("position",new THREE.BufferAttribute(starPos,3));
  const stars=new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0x83f8ff,size:.085,transparent:true,opacity:.62})); scene.add(stars);

  const city=new Map();
  const ray=new THREE.Raycaster();
  const pointer=new THREE.Vector2();

  function labelFor(item,group,y){
    const el=document.createElement("div");
    el.className="label3d "+maturityClass(item.maturity);
    el.innerHTML=`<span class="led"></span>${item.code} · ${item.name}`;
    const tag=new CSS2DObject(el); tag.position.set(0,y,0); group.add(tag); return el;
  }
  function edgeBox(w,h,d,color){
    const geo=new THREE.BoxGeometry(w,h,d); const edges=new THREE.EdgesGeometry(geo);
    return new THREE.LineSegments(edges,new THREE.LineBasicMaterial({color,transparent:true,opacity:.62}));
  }
  function makeTower(item){
    const g=new THREE.Group(); const [w,h,d]=item.size; const color=new THREE.Color(item.color);
    const bodyMat=new THREE.MeshLambertMaterial({color:0x071019,emissive:color,emissiveIntensity:item.id==="registry"?.16:.07});
    const base=new THREE.Mesh(new THREE.BoxGeometry(w,h*.68,d),bodyMat); base.position.y=h*.34; g.add(base);
    const edge=edgeBox(w,h*.68,d,item.color); edge.position.y=h*.34; g.add(edge);
    const capH=Math.max(1.4,h*.18);
    const cap=new THREE.Mesh(new THREE.BoxGeometry(w*.68,capH,d*.68),new THREE.MeshLambertMaterial({color:0x0a1117,emissive:color,emissiveIntensity:.16}));
    cap.position.y=h*.68+capH*.5; g.add(cap);
    const capEdge=edgeBox(w*.68,capH,d*.68,item.color); capEdge.position.y=cap.position.y; g.add(capEdge);
    if(item.shape==="spire"){
      const spire=new THREE.Mesh(new THREE.ConeGeometry(1.05,4.8,4),new THREE.MeshLambertMaterial({color:0x06161b,emissive:0x00ffff,emissiveIntensity:.28}));
      spire.position.y=h*.68+capH+2.4; spire.rotation.y=Math.PI/4; g.add(spire);
      const beacon=new THREE.PointLight(0x00ffff,2.2,18); beacon.position.y=spire.position.y+2.2; g.add(beacon);
    }
    const plinth=new THREE.Mesh(new THREE.CylinderGeometry(w*.68,w*.76,.42,8),new THREE.MeshLambertMaterial({color:0x0c141a,emissive:color,emissiveIntensity:.1}));
    plinth.position.y=.21; g.add(plinth);
    const door=new THREE.Mesh(new THREE.BoxGeometry(w*.24,1.4,.12),new THREE.MeshLambertMaterial({color:0x020608,emissive:color,emissiveIntensity:.55}));
    door.position.set(0,.75,d/2+.07); g.add(door);
    const label=labelFor(item,g,h+2.5);
    g.userData={id:item.id,mat:bodyMat,label}; return g;
  }

  for(const item of LANDMARKS){const tower=makeTower(item);tower.position.set(...item.pos);scene.add(tower);city.set(item.id,tower)}

  if(state.tier!=="lite"){
    for(let i=0;i<20;i++){
      const a=(i/20)*Math.PI*2,r=24+(i%3)*2.8,h=2.5+((i*13)%7)*.42;
      const pole=new THREE.Mesh(new THREE.CylinderGeometry(.045,.065,h,6),new THREE.MeshLambertMaterial({color:0x16232b}));
      pole.position.set(Math.cos(a)*r,h/2,Math.sin(a)*r);
      const lamp=new THREE.Mesh(new THREE.SphereGeometry(.1,8,8),new THREE.MeshBasicMaterial({color:i%5===0?0xff3131:0x00ffff}));
      lamp.position.set(pole.position.x,h+.05,pole.position.z); scene.add(pole,lamp);
    }
  }

  const dataNodes=[]; const nodeCount=state.tier==="full"?72:state.tier==="adaptive"?42:18;
  for(let i=0;i<nodeCount;i++){
    const a=Math.random()*Math.PI*2,r=7+Math.random()*25;
    const node=new THREE.Mesh(new THREE.SphereGeometry(.06,6,6),new THREE.MeshBasicMaterial({color:i%7===0?0x39ff14:0x00ffff}));
    node.position.set(Math.cos(a)*r,.18+Math.random()*1.2,Math.sin(a)*r); scene.add(node); dataNodes.push(node);
  }

  let goal=new THREE.Vector3(24,20,31),look=new THREE.Vector3(0,3,0),flying=true;
  function focus(id,instant=false){
    const item=byId(id); if(!item) return;
    const height=item.size[1];
    if(id==="registry"){goal.set(21,18,26);look.set(0,5.2,0)}
    else{
      const p=new THREE.Vector3(...item.pos); const side=new THREE.Vector3(item.pos[0],0,item.pos[2]).normalize();
      if(side.lengthSq()<.01)side.set(1,0,1).normalize();
      goal.copy(p).add(side.multiplyScalar(10)).add(new THREE.Vector3(0,height*.72+5,0));
      look.set(item.pos[0],height*.42,item.pos[2]);
    }
    flying=true;
    if(instant||state.reduced){camera.position.copy(goal);controls.target.copy(look);flying=false}
    for(const [key,tower] of city){
      const active=key===id,data=byId(key);
      tower.userData.mat.emissive=new THREE.Color(active?data.color:"#000000");
      tower.userData.mat.emissiveIntensity=active?.28:(key==="registry"?.16:.05);
      tower.userData.label.classList.toggle("active",active);
    }
  }

  canvas.addEventListener("pointerdown",(ev)=>{
    const rect=canvas.getBoundingClientRect();
    pointer.x=((ev.clientX-rect.left)/rect.width)*2-1; pointer.y=-((ev.clientY-rect.top)/rect.height)*2+1;
    ray.setFromCamera(pointer,camera);
    const hits=ray.intersectObjects([...city.values()],true); if(!hits.length)return;
    let obj=hits[0].object; while(obj&&!obj.userData.id)obj=obj.parent;
    if(obj?.userData.id){updateDetail(obj.userData.id);focus(obj.userData.id)}
  });

  function resize(){
    const w=canvas.clientWidth||$("stage").clientWidth,h=canvas.clientHeight||$("stage").clientHeight;
    camera.aspect=w/Math.max(1,h);camera.updateProjectionMatrix();renderer.setSize(w,h,false);labels.setSize(w,h);
  }
  window.addEventListener("resize",resize);resize();

  let last=performance.now();
  function frame(now){
    const dt=Math.min((now-last)/1000,.1);last=now;
    if(flying){
      const k=current==="registry"?2.5:3.4;
      camera.position.lerp(goal,1-Math.exp(-dt*k));controls.target.lerp(look,1-Math.exp(-dt*k));
      if(camera.position.distanceTo(goal)<.1)flying=false;
    }
    if(!state.reduced&&state.tier!=="lite"){
      const t=now*.00006;rings.forEach((r,i)=>r.rotation.z=(i%2?1:-1)*t*(i+1)*.18);stars.rotation.y=t*.08;
      dataNodes.forEach((n,i)=>{n.position.y=.18+Math.sin(now*.0016+i)*.09+(i%4)*.08});
    }
    controls.update();renderer.render(scene,camera);labels.render(scene,camera);requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);controls.addEventListener("start",()=>{flying=false});
  return {focus};
}
boot();