// Credits:
// https://threejsfundamentals.org/threejs/lessons/threejs-shadertoy.html

function ShaderLoader(file_url, onLoad, onProgress, onError) {
  var file_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
  file_loader.setResponseType('text');
  file_loader.load(file_url, function (file_content) {
      onLoad(file_content);
  }, onProgress, onError);
}

function main(fragmentShader) {

  const uniforms = {
    iFrame: { value: 0 },
    iTime: { value: 0 },
    iMouse:  { value: new THREE.Vector4(0, 0, 0, 0) },
    iResolution:  { value: new THREE.Vector3() },
  };

  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.autoClearColor = false;
  renderer.preserveDrawingBuffer = true;
 
  const camera = new THREE.OrthographicCamera(
    -1, // left
     1, // right
     1, // top
    -1, // bottom
    -1, // near,
     1, // far
  );
  const scene = new THREE.Scene();
  const plane = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    uniforms,
  });
  scene.add(new THREE.Mesh(plane, material));

  document.body.addEventListener("mousemove", (event) => {
    // Invert y to reproduce shadertoy behaviour.
    uniforms.iMouse.value.set(event.x, canvas.clientHeight - event.y, 0, 0);
  });

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
 
  function render(time) {

    resizeRendererToDisplaySize(renderer);
 
    const canvas = renderer.domElement;
    uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
    uniforms.iTime.value = time * 0.001; // convert to seconds.
    uniforms.iFrame.value += 1;

    renderer.render(scene, camera);
    lastScreenshot = renderer.domElement.toDataURL();

    requestAnimationFrame(render);
  }
 
  requestAnimationFrame(render);
}
 
ShaderLoader("shader.frag", 
  function(fragmentShader) {
    main(fragmentShader);
  }, 
  function(progress) {

  },
  function(error) {
    alert("Failed to load shaders. Try to refresh.");
    console.error(error);
  });
