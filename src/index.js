import './style/main.css'
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { WireframeGeometry } from 'three'
import * as dat from 'dat.gui'

// debug another UI index

const gui = new dat.GUI()
gui.hide()

// Scene
const scene = new THREE.Scene()

/**
 * TEXTURE
 */
/** 
const texture = new THREE.Texture(image)
image.onload =() =>
{
    texture.needsUpdate = true
}
image.src ='Wood_Gate_Fortified_001_SD/color.jpg'
*/

/**
 * textureloader (alternavtive method)
*/
 const textureloader = new THREE.TextureLoader()
 const cubeTextureLoader = new THREE.CubeTextureLoader()

 const basetexture = textureloader.load ('/Wood_Gate_Fortified_001_SD/base.jpg')
 const alpaTexture = textureloader.load ('/Wood_Gate_Fortified_001_SD/alpa.jpg')
 const heightTexture = textureloader.load ('/Wood_Gate_Fortified_001_SD/height.png')
 const metalTexture = textureloader.load ('/Wood_Gate_Fortified_001_SD/metal.jpg')
 const normalTexture = textureloader.load ('/Wood_Gate_Fortified_001_SD/normal.jpg')
 const roughTexture = textureloader.load ('/Wood_Gate_Fortified_001_SD/rough.jpg')
 const matcapTexture = textureloader.load ('/matcaps/5.png')
 const gradianTexture = textureloader.load ('/gradian/2.png')
 const simpleshadowTexture = textureloader.load('/shadows/2.PNG')
 //function on textures
 /** 
 basetexture.rotation= Math.PI/4
 basetexture.center.x=0.5
 basetexture.center.y =0.5
*/
 gradianTexture.minFilter= THREE.NearestFilter
 gradianTexture.magFilter= THREE.NearestFilter
 gradianTexture.generateMipmaps = false
 
/** 
const environmentMapTexture = cubeTextureLoader.load([
    '/environmentMaps/1/px.jpg',
    '/environmentMaps/1/nx.jpg',
    '/environmentMaps/1/py.jpg',
    '/environmentMaps/1/ny.jpg',
    '/environmentMaps/1/pz.jpg',
    '/environmentMaps/1/nz.jpg' 
])
*/

/**
 * fonts
*/
const textgroup = new THREE.Group()
scene.add(textgroup)

const fontLoader = new THREE.FontLoader()

fontLoader.load(
    '/font/helvetiker_regular.typeface.json',
    (font) =>
    {
       const textGeometry = new THREE.TextBufferGeometry(
           'OG',
           {
               font: font,
               size: 0.5,
               height:0.5,
               curveSegments:6,
               bevelEnabled:true,
               bevelThickness:0.025,
               bevelSize:0.02,
               bevelOffset: 0,
               bevelSegments:4
            }
       )
       //textGeometry.computeBoundingBox()
       //textGeometry.translate(
           //-(textGeometry.boundingBox.max.x - 0.02) * 0.5,
           //-(textGeometry.boundingBox.max.y - 0.02) * 0.5,
           //-(textGeometry.boundingBox.max.z - 0.025) * 0.5
       //) 
       textGeometry.center()
       
       const textmaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
       //textmaterial.flatShading =true
       const text = new THREE.Mesh(textGeometry,material)
       text.castShadow =true
       textgroup.add(text)
       
    }
)



const parameters = {
    color: 0xffffff, 
    spin : () =>
    {
       gsap.to(cube.rotation,{ duration:3, y:cube.rotation.y + 4})
    }
}
gui 
   .addColor(parameters,'color')
   .onChange(() =>
   { 
      material1.color.set(parameters.color)
   })
   
gui
    .add(parameters,'spin')



//cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove',(event) =>
{
    cursor.x =event.clientX / sizes.width - 0.5
    cursor.y =(event.clientY / sizes.height - 0.5) * -1
    
})
/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight


window.addEventListener('resize', () =>
{
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})


/**
 * Environnements
 */


 //VECTOR PRACTICES
 /** 
const geometry = new THREE.Geometry()
for(let i=0; i<50;i++)
{
    for(let j=0; j<3;j++)
    {
        geometry.vertices.push(new THREE.Vector3(
            (Math.random()-0.5)*5,
            (Math.random()-0.5)*5,
            (Math.random()-0.5)*5
        ))
    }
    const verticesIndex = i*3
    geometry.faces.push(new THREE.Face3(
        verticesIndex,
        verticesIndex + 1,
        verticesIndex + 2
    ))
}
const material1 = new THREE.MeshBasicMaterial( { color: parameters.color ,wireframe:true })
const mesh = new THREE.Mesh(geometry,material1)
scene.add( mesh )


gui
 .add(mesh , 'visible')
 .name('mesh')
*/

// FOR FLOAT Buffer geometry
/** 
const geometry =new THREE.BufferGeometry()
const count = 50
const positionArray =new Float32Array(count*3*3)

for (let i=0;i< count*3*3;i++)
{
    positionArray[i] = Math.random(100) 
}
const positionAttributes = new THREE.BufferAttribute(positionArray,3)
geometry.setAttribute('position', positionAttributes)
const material = new THREE.MeshBasicMaterial( { color: 'red',wireframe:true })
const mesh = new THREE.Mesh(geometry,material)
scene.add( mesh )
*/

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .01,10000)
//const ar = sizes.width/sizes.height
//const camera = new THREE.OrthographicCamera(-3*ar,3*ar,3,-3,0.3,100)
camera.position.z = 3
//camera.position.y = -3



//camera.position.x = 1.35
//camera.position.y = -1.35
scene.add(camera)


// Test
const group = new THREE.Group()
scene.add(group)


/**
 * Material,object
 */

/** 
const material = new THREE.MeshBasicMaterial({
    map : basetexture,
    //color: 'red',
    //wireframe: true,
})
material.alphaMap=alpaTexture
material.transparent = true
material.side = THREE.DoubleSide
*/
// const material = new THREE.MeshNormalMaterial()
// material.flatShading =true

//const material =new THREE.MeshMatcapMaterial()
//material.flatShading = true
//material.matcap =matcapTexture

//const material = new THREE.MeshLambertMaterial()

//const material = new THREE.MeshPhongMaterial()
//material.shininess= 100
//material.specular =new THREE.Color(0x1188ff)

//const material = new THREE.MeshToonMaterial()
//material.gradientMap = gradianTexture


const material = new THREE.MeshStandardMaterial()
material.metalness =0.4
material.roughness = 0.6
//material.map = basetexture
//material.displacementMap = heightTexture
//material.displacementScale = 0.5
//material.metalnessMap = metalTexture
//material.roughnessMap = roughTexture
//material.alphaMap = alpaTexture
//material.normalMap = normalTexture
//material.transparent =true
const sphereshadowmaterial = new THREE.MeshBasicMaterial({color:0x0})
sphereshadowmaterial.alphaMap = simpleshadowTexture
sphereshadowmaterial.transparent = true



/** 
const material = new THREE.MeshStandardMaterial()
material.metalness =0.8
material.roughness = 0.05
material.envMap = environmentMapTexture
*/

gui.add(material,'metalness').min(0).max(1).step(0.01)
gui.add(material,'roughness').min(0).max(1).step(0.01)
gui.add(material,'displacementScale').min(0).max(1).step(0.01)



//cubes,object

const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1,100,100,100), material)
cube.position.set(0,0,0)
//cube.rotation.reorder('YXZ')
//group.add(cube)
//cube.position.normalize()

const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(.5, 12,24),material)
sphere.position.x = -2
sphere.castShadow =true
group.add(sphere)

//cube1.position.normalize()

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10), material)
plane.position.y= -0.5

plane.rotation.x =- Math.PI/2
plane.receiveShadow =true
group.add(plane)

const sphereshadow = new THREE.Mesh(new THREE.PlaneBufferGeometry(1.5, 1.5), sphereshadowmaterial)
sphereshadow.position.x= sphere.position.x
sphereshadow.position.z= sphere.position.z
sphereshadow.position.y= plane.position.y +0.01


sphereshadow.rotation.x =- Math.PI/2
sphereshadow.receiveShadow =true
group.add(sphereshadow)

const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(0.3, 0.2,16,32), material)
torus.position.x = 2
torus.castShadow = true
//group.add(torus)

/** 
for(let i = 0; i < 200 ; i++)
{ 
    const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(0.3, 0.2,16,32), material)
    torus.position.x = (Math.random()- 0.5) * 20
    torus.position.y = (Math.random()- 0.5) * 20
    torus.position.z = (Math.random()- 0.5) * 20
    
    torus.rotation.x = Math.random()*Math.PI
    torus.rotation.y = Math.random()*Math.PI
    group.add(torus)

}
*/
// debug group
gui.add(group.position,'y',-3,3,0.01)
gui.add(cube.position,'x').min(-3).max(3).step(0.1).name('transport') //another method

gui
 .add(group , 'visible')
//gui
//.add(material , 'wireframe')



/**
 * lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff,0.6)
scene.add(ambientLight)
gui 
   .addColor(parameters,'color')
   .onChange(() =>
   { 
      ambientLight.color.set(parameters.color)
   })
   .name('Light_color') 
   
gui.add(ambientLight,'intensity',0,1,0.1)

//direction light
const directionLight = new THREE.DirectionalLight(0xffa300,0.6)
directionLight.position.set(2,2,2)
scene.add(directionLight)
gui 
   .addColor(parameters,'color')
   .onChange(() =>
   { 
      ambientLight.color.set(parameters.color)
   })
   .name('directionalLight_color') 
   
gui
 .add(directionLight,'intensity',0,1,0.1)
 .name('dLI')  
gui.add(directionLight.position,'x',-3,3,0.01)

directionLight.castShadow =true 

directionLight.shadow.mapSize.width = 1024
directionLight.shadow.mapSize.width = 1024

directionLight.shadow.camera.top = 2
directionLight.shadow.camera.right = 2
directionLight.shadow.camera.bottom = -2
directionLight.shadow.camera.left = -2
directionLight.shadow.camera.near = 1
directionLight.shadow.camera.far = 10

directionLight.shadow.radius =10 //blur

const dLCH = new THREE.CameraHelper(directionLight.shadow.camera)
//scene.add(dLCH) 


//hemispherelight 
const hemispherelight = new THREE.HemisphereLight(0xff0000,0x0000ff,0.3)
//scene.add(hemispherelight)

//point light
const pointLight = new THREE.PointLight('yellow',0.5,10,2)
pointLight.position.x = 0
pointLight.position.y =2
pointLight.position.z = 2
pointLight.castShadow = true

const pLCH = new THREE.CameraHelper(pointLight.shadow.camera)
//scene.add(pLCH)
scene.add(pointLight)

//rectarea light
const rectArealight = new THREE.RectAreaLight(0x4e00ff,2,3,2)
rectArealight.position.set(-2,0,3)
rectArealight.lookAt(new THREE.Vector3())
//scene.add(rectArealight)

//spot light
const spotLight = new THREE.SpotLight(0xffffff,0.5,10,Math.PI*0.1,0.25,1)
spotLight.position.set(-0,2,2)
spotLight.castShadow = true
scene.add(spotLight)
spotLight.target.position.x= 2
spotLight.shadow.camera.fov =20
spotLight.shadow.camera.near =1
spotLight.shadow.camera.far =6

scene.add(spotLight.target)
const sLCH = new THREE.CameraHelper(spotLight.shadow.camera)
//scene.add(sLCH)


//light helper
//const dLH = new THREE.DirectionalLightHelper(directionLight,0.2)
//scene.add(dLH)
//const sLH = new THREE.SpotLightHelper(spotLight,0.2)
//scene.add(sLH)



// Axis Helper
//const axesHelper = new THREE.AxesHelper(5)
//scene.add(axesHelper)


//canvas
const canvas = document.querySelector('.webgl')

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas 
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio),2)
renderer.setSize(sizes.width, sizes.height)
//for shadows
renderer.shadowMap.enabled= true
//renderer.shadowMap.type = THREE.PCFSoftShadowMap

// controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping =true

// fullscreen


const clock = new THREE.Clock()
//gsap.to(cube.position,{duration:1,delay: 1,x:2})
//gsap.to(cube.position,{duration:1,delay: 2,x:-2})

/**
 * Loop
 */
const loop = () =>
{

    const elapsedTime = clock.getElapsedTime()
    // Update
    //cube.rotation.y =-0.1 * elapsedTime 
    //cube.rotation.x =-0.1 * elapsedTime 
    //cube1.rotation.y = elapsedTime 
    // cube1.position.y = Math.cos(elapsedTime)
    sphere.position.x = Math.sin(elapsedTime)*2
    sphere.position.z = Math.cos(elapsedTime)*2
    sphere.position.y = Math.abs(Math.sin(elapsedTime*2))
    sphere.rotation.y =0.1 *  elapsedTime 
    sphere.rotation.z =0.1 *  elapsedTime 

    sphereshadow.position.x = Math.sin(elapsedTime)*2
    sphereshadow.position.z = Math.cos(elapsedTime)*2
    sphereshadow.material.opacity = (1- sphere.position.y)*0.6
    
    //roup.position.z = Math.sin(-elapsedTime) 
    torus.rotation.x =0.2 *  elapsedTime 
    torus.rotation.y =0.2 *  elapsedTime 
    //cube2.position.y = Math.cos(-elapsedTime) 
    textgroup.rotation.x =0.1 *  elapsedTime 
    textgroup.rotation.y =0.1 *  elapsedTime 
    //plane.rotation.z=0.1 *  elapsedTime
    //plane.rotation.x=0.1 *  elapsedTime
    //camera.position.x = Math.sin(cursor.x*6)*3
    //camera.position.z = Math.cos(cursor.x*6)*3
    //camera.position.y = cursor.y *10

    //camera.lookAt(sphere.position)
    
    // update controls
    controls.update()
    
    // Render
    renderer.render(scene, camera)

    // Keep looping
    window.requestAnimationFrame(loop)
    
}
loop()


