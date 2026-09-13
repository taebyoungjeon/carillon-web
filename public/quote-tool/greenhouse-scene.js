import * as THREE from 'three';
import { OrbitControls } from './vendor/three/OrbitControls.js';

export function createGreenhouseScene(canvas) {
  const host = canvas.parentElement;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#edf1f3');
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 4000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2 - 0.035;
  controls.minPolarAngle = 0.12;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.6;
  controls.enableZoom = true;
  canvas.setAttribute('aria-label', '온실 3D 모델');
  canvas.style.touchAction = 'pan-y';
  // One finger scrolls the page on mobile; two fingers inspect the model.
  controls.touches.ONE = null;
  controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
  scene.add(new THREE.HemisphereLight(0xeaf3ff, 0x747b70, 2.6));
  const sun = new THREE.DirectionalLight(0xfff9ef, 3.2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0002;
  sun.shadow.normalBias = 0.08;
  sun.shadow.radius = 3;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xc4d8f1, 1.5);
  fill.position.set(-20, 12, -10);
  scene.add(fill);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshStandardMaterial({color:0xe4e8e8, roughness:1}));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.13;
  ground.receiveShadow = true;
  scene.add(ground);
  const group = new THREE.Group();
  const skin = new THREE.Group();
  scene.add(group, skin);
  const materials = {
    steel: new THREE.MeshStandardMaterial({color:0xa1afb6, metalness:0.62, roughness:0.3}),
    rail: new THREE.MeshStandardMaterial({color:0x52676b, metalness:0.5, roughness:0.4}),
    concrete: new THREE.MeshStandardMaterial({color:0xb9bdb9, roughness:0.95}),
    soil: new THREE.MeshStandardMaterial({color:0x777e71, roughness:1}),
    film: new THREE.MeshPhysicalMaterial({color:0xd6e9eb, metalness:0, roughness:0.24, transparent:true, opacity:0.3, side:THREE.DoubleSide, depthWrite:false, clearcoat:0.65}),
    curtain: new THREE.MeshStandardMaterial({color:0xd6d6c8, roughness:0.95, side:THREE.DoubleSide}),
    motor: new THREE.MeshStandardMaterial({color:0x394d55, metalness:0.35, roughness:0.4})
  };
  let size = new THREE.Vector3(7, 4, 30);
  let geometryKey = '';
  let visible = true;
  let lastConfig;
  const matrix = new THREE.Matrix4();
  function box(w,h,d,x,y,z,material) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), material);
    mesh.position.set(x,y,z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
  function pipe(a,b,r=0.045,material=materials.steel) {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
    const delta = end.clone().sub(start);
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r,r,delta.length(),8), material);
    mesh.position.copy(start.add(end).multiplyScalar(0.5));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), delta.normalize());
    mesh.castShadow = true;
    group.add(mesh);
  }
  function clearGeometry() {
    const geometries = new Set();
    for (const root of [group, skin]) {
      root.traverse(object => { if(object.geometry) geometries.add(object.geometry); if(object.isInstancedMesh) object.dispose(); });
      root.clear();
    }
    geometries.forEach(geometry => geometry.dispose());
  }
  function fit(direction = new THREE.Vector3(1,0.8,-1.25)) {
    const center = new THREE.Vector3(0,size.y*0.4,0);
    const radius = size.length()/2;
    const angle = Math.min(THREE.MathUtils.degToRad(camera.fov)/2, Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov)/2)*camera.aspect));
    const distance = radius / Math.sin(angle) * 1.12;
    camera.position.copy(center).add(direction.normalize().multiplyScalar(distance));
    camera.near = Math.max(0.05, radius/1000);
    camera.far = Math.max(4000,distance*8);
    camera.updateProjectionMatrix();
    controls.target.copy(center);
    controls.minDistance = Math.max(size.y*1.5,radius*0.18);
    controls.maxDistance = distance*2.5;
    controls.update();
  }
  function resize() {
    const width=host.clientWidth, height=host.clientHeight;
    renderer.setSize(width,height,false);
    camera.aspect=width/height;
    fit();
  }
  new ResizeObserver(resize).observe(host);
  new IntersectionObserver(entries => { visible=entries[0].isIntersecting; }).observe(host);
  document.querySelector('#sceneHome').addEventListener('click',()=>fit());
  document.querySelector('#sceneZoomIn').addEventListener('click',()=>{ const delta=camera.position.clone().sub(controls.target); camera.position.copy(controls.target).add(delta.setLength(Math.max(controls.minDistance,delta.length()*0.8)));controls.update(); });
  document.querySelector('#sceneZoomOut').addEventListener('click',()=>{ const delta=camera.position.clone().sub(controls.target); camera.position.copy(controls.target).add(delta.setLength(Math.min(controls.maxDistance,delta.length()*1.25)));controls.update(); });
  document.querySelector('#sceneRotate').addEventListener('change',e=>{controls.autoRotate=e.target.checked;});
  document.querySelector('#sceneCover').addEventListener('change',e=>{skin.visible=e.target.checked;});
  document.querySelector('#sceneView').addEventListener('change',()=>{if(lastConfig) update(lastConfig);});
  controls.addEventListener('start',()=>{controls.autoRotate=false;document.querySelector('#sceneRotate').checked=false;});
  renderer.setAnimationLoop(()=> {
    if (!visible || document.hidden) return;
    controls.update();
    renderer.render(scene,camera);
  });
    function update(config) {
      lastConfig=config;
      let {width,length,side,height,spans,type,spacing,autoVent,curtain,screen}=config;
      const detailView=document.querySelector('#sceneView').value==='detail';
      if(detailView) { length=Math.min(length,24);spans=Math.min(spans,3); }
      const key=JSON.stringify([width,length,side,height,spans,type,spacing,autoVent,curtain,screen,config.length,config.spans]);
      if(key===geometryKey) return;
      geometryKey=key;
      clearGeometry();
      const connected=type==='연동형';
      const pitch=width+(connected?0:1.4);
      const totalWidth=width+(spans-1)*pitch;
      size.set(totalWidth,height,length);
      const radius=size.length()/2;
      sun.position.set(-radius*0.65,radius*1.4,radius*0.8);
      Object.assign(sun.shadow.camera,{left:-radius*1.3,right:radius*1.3,top:radius*1.3,bottom:-radius*1.3,near:0.1,far:radius*5});
      sun.shadow.camera.updateProjectionMatrix();
      // Repeated ribs share geometry; the visual density is capped for large sites.
      const frameCount=Math.min(81,Math.max(3,Math.ceil(length/spacing)+1));
      const profile=[new THREE.Vector3(-width/2,0,0)];
      for(let i=0;i<=32;i++) {
        const t=Math.PI-i*Math.PI/32;
        profile.push(new THREE.Vector3(Math.cos(t)*width/2,side+Math.sin(t)*(height-side),0));
      }
      profile.push(new THREE.Vector3(width/2,0,0));
      const path=new THREE.CurvePath();
      profile.slice(1).forEach((point,index)=>path.add(new THREE.LineCurve3(profile[index],point)));
      const ribs=new THREE.InstancedMesh(new THREE.TubeGeometry(path,80,0.045,6,false),materials.steel,frameCount*spans);
      ribs.castShadow=true;
      group.add(ribs);
      let ribIndex=0;
      for(let s=0;s<spans;s++) {
        const x=(s-(spans-1)/2)*pitch;
        box(width,0.12,length,x,-0.04,0,materials.soil);
        for(let f=0;f<frameCount;f++) {
          const z=-length/2+f*length/(frameCount-1);
          ribs.setMatrixAt(ribIndex++,matrix.makeTranslation(x,0,z));
        }
        for(const t of [0,Math.PI/4,Math.PI/2,Math.PI*3/4,Math.PI]) {
          const px=x+Math.cos(t)*width/2, py=side+Math.sin(t)*(height-side);
          pipe([px,py,-length/2],[px,py,length/2],0.04);
        }
        for(const dx of [-width/2,width/2]) {
          pipe([x+dx,0.15,-length/2],[x+dx,0.15,length/2],0.05,materials.rail);
          pipe([x+dx,side*0.55,-length/2],[x+dx,side*0.55,length/2],0.035);
          for(const z of [-length/2,length/2]) {
            box(0.3,0.22,0.4,x+dx,0,z,materials.concrete);
            pipe([x+dx,0.15,z],[x+dx,side,z+(z<0?1:-1)*Math.min(3,length/4)],0.035,materials.rail);
          }
          if(autoVent) box(0.24,0.42,0.25,x+dx,side*0.55,-length/2+0.4,materials.motor);
        }
        if(connected && s<spans-1) box(0.24,0.12,length,x+width/2,side,0,materials.rail);
        // Thin roof and wall surfaces, rather than an extruded solid volume.
        const vertices=[],indices=[];
        profile.forEach(point=>{vertices.push(point.x+x,point.y,-length/2,point.x+x,point.y,length/2);});
        for(let i=0;i<profile.length-1;i++){
          if(connected && ((i===0 && s>0)||(i===profile.length-2 && s<spans-1))) continue;
          const a=i*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);
        }
        const shell=new THREE.BufferGeometry();
        shell.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
        shell.setIndex(indices);shell.computeVertexNormals();
        skin.add(new THREE.Mesh(shell,materials.film));
        const endShape=new THREE.Shape(profile.map(p=>new THREE.Vector2(p.x,p.y)));
        for(const z of [-length/2,length/2]) {
          if(z>0 && length<config.length) continue;
          const end=new THREE.Mesh(new THREE.ShapeGeometry(endShape),materials.film);
          end.position.set(x,0,z);skin.add(end);
          const doorWidth=Math.min(1.6,width*0.3), doorHeight=Math.min(2.1,height*0.8);
          for(const dx of [-doorWidth/2,doorWidth/2]) pipe([x+dx,0,z],[x+dx,doorHeight,z],0.05,materials.rail);
          pipe([x-doorWidth/2,doorHeight,z],[x+doorWidth/2,doorHeight,z],0.05,materials.rail);
          pipe([x,0,z],[x,doorHeight,z],0.025,materials.rail);
          pipe([x-doorWidth/2,doorHeight*0.48,z],[x+doorWidth/2,doorHeight*0.48,z],0.025);
        }
        if(curtain||screen) {
          const textile=new THREE.Mesh(new THREE.PlaneGeometry(width*0.92,length*0.94,1,1),materials.curtain);
          textile.rotation.x=-Math.PI/2;textile.position.set(x,side+0.05,0);
          group.add(textile);
        }
      }
      ribs.instanceMatrix.needsUpdate=true;
      ribs.computeBoundingSphere();
      document.querySelector('#sceneDimensions').textContent=`${width}m × ${config.length}m · ${config.spans}${connected?'연동':'동'} · 측고 ${side}m`;
      document.querySelector('#sceneModelNote').textContent=length<config.length||spans<config.spans
        ? `구조 상세: 앞쪽 ${length}m · ${spans}동 표시 / 전체 배치에서 전체 길이 확인`
        : frameCount<Math.ceil(length/spacing)+1 ? '형태 검토용 · 반복 골조 일부 간략화' : '형태 검토용 · 접합부 및 상세 사양은 설계 시 확정';
      resize();
      renderer.render(scene,camera);
      canvas.dataset.ready='true';
    }
  return {update};
}
