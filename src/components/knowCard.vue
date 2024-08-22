<script setup>
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useKnowCardStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const knowCardStore = useKnowCardStore()
const { knowCardList } = storeToRefs(knowCardStore)

let camera, scene, renderer
let controls

const objects = []
const targets = { sphere: [], helix: [] }

function init() {
  let container = document.getElementById('container')
  let cardBox = document.getElementById('card-box')
  let width = parseFloat(window.getComputedStyle(container).width)
  let height = parseFloat(window.getComputedStyle(container).height)

  camera = new THREE.PerspectiveCamera(40, width / height, 1, 10000)
  camera.position.z = 4000

  scene = new THREE.Scene()

  // create tip
  const tip = document.createElement('p')
  tip.innerHTML = '按下shift点击 可以单独查看~'
  tip.classList.add('tip')
  cardBox.appendChild(tip)

  // table

  for (let i = 0; i < knowCardList.value.length; i += 5) {
    const element = document.createElement('div')
    element.style.width = '250px'
    // element.style.height = '320px'
    element.style.padding = '30px'
    element.style.boxShadow = '0px 0px 12px rgba(0, 255, 255, 0.5)'
    element.style.border = '1px solid rgba(127, 255, 255, 0.25)'
    element.style.fontFamily = 'Helvetica, sans-serif'
    element.style.textAlign = 'center'
    element.style.lineHeight = 'normal'
    element.style.userSelect = 'auto'
    element.style.display = 'flex'
    element.style.flexDirection = 'column'
    element.style.justifyContent = 'space-evenly'
    element.style.alignItems = 'center'
    element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')'
    element.style.cursor = 'pointer'

    element.addEventListener('mouseover', () => {
      element.style.boxShadow = '0px 0px 12px rgba(0, 255, 255, 0.75)'
      element.style.border = '1px solid rgba(127, 255, 255, 0.75)'
    })

    element.addEventListener('mouseout', () => {
      element.style.boxShadow = '0px 0px 12px rgba(0, 255, 255, 0.5)'
      element.style.border = '1px solid rgba(127, 255, 255, 0.25)'
    })

    const name = document.createElement('div')
    name.style.fontSize = '60px'
    name.style.fontWeight = 'bold'
    name.style.color = 'rgba(255, 255, 255, 0.75)'
    name.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.95)'
    name.textContent = knowCardList.value[i]
    element.appendChild(name)

    const time = document.createElement('div')
    time.style.userSelect = 'none'
    time.style.width = '100%'
    time.style.fontSize = '20px'
    time.style.color = 'rgba(127, 255, 255, 0.75)'
    time.innerHTML = knowCardList.value[i + 2] + '<br>' + knowCardList.value[i + 3]
    element.appendChild(time)

    const achievement = document.createElement('div')
    achievement.style.textIndent = '1em'
    achievement.style.fontSize = '20px'
    achievement.style.color = 'rgba(127, 255, 255, 0.75)'
    achievement.innerHTML = knowCardList.value[i + 1]
    element.appendChild(achievement)

    const objectCSS = new CSS3DObject(element)
    objectCSS.position.x = Math.random() * 4000 - 2000
    objectCSS.position.y = Math.random() * 4000 - 2000
    objectCSS.position.z = Math.random() * 4000 - 2000

    scene.add(objectCSS)

    objects.push(objectCSS)

    // click
    element.style.userSelect = 'auto'
    element.addEventListener('pointerdown', (e) => {
      if (!e.shiftKey) return
      // 响应点击
      console.log('111')
    })
  }

  // sphere

  const vector = new THREE.Vector3()

  for (let i = 0, l = objects.length; i < l; i++) {
    const phi = Math.acos(-1 + (2 * i) / l)
    const theta = Math.sqrt(l * Math.PI) * phi

    const object = new THREE.Object3D()

    object.position.setFromSphericalCoords(800, phi, theta)

    vector.copy(object.position).multiplyScalar(2)

    object.lookAt(vector)

    targets.sphere.push(object)
  }

  // helix

  for (let i = 0, l = objects.length; i < l; i++) {
    const theta = i * 0.175 + Math.PI
    const y = -(i * 15) + 450

    const object = new THREE.Object3D()

    object.position.setFromCylindricalCoords(2000, theta, y)

    vector.x = object.position.x * 2
    vector.y = object.position.y
    vector.z = object.position.z * 2

    object.lookAt(vector)

    targets.helix.push(object)
  }

  //

  renderer = new CSS3DRenderer()

  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  //

  controls = new TrackballControls(camera, renderer.domElement)
  controls.rotateSpeed = 5
  controls.minDistance = 700
  controls.maxDistance = 4000
  controls.addEventListener('change', render)

  const buttonSphere = document.getElementById('sphere')
  buttonSphere.addEventListener('click', function () {
    transform(targets.sphere, 2000)
  })

  const buttonHelix = document.getElementById('helix')
  buttonHelix.addEventListener('click', function () {
    transform(targets.helix, 2000)
  })

  transform(targets.sphere, 2000)

  //

  window.addEventListener('resize', onWindowResize)
}

function transform(targets, duration) {
  TWEEN.removeAll()

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i]
    const target = targets[i]

    new TWEEN.Tween(object.position)
      .to(
        { x: target.position.x, y: target.position.y, z: target.position.z },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()

    new TWEEN.Tween(object.rotation)
      .to(
        { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start()
}

function onWindowResize() {
  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(cwidth, height)

  render()
}

function animate() {
  requestAnimationFrame(animate)

  TWEEN.update()

  controls.update()
}

function render() {
  renderer.render(scene, camera)
}

onMounted(() => {
  init()
  animate()
})

onBeforeUnmount(() => {
  init()
  animate()
})

const menuList = ref([
  { uuid: 0, id: 'sphere', class: 'sphere', name: '球状状态' },
  { uuid: 1, id: 'helix', class: 'helix', name: '螺旋状态' }
])

const fade = ref(false)
const toUserCenter = () => {
  fade.value = true
  setTimeout(() => {
    router.push('/usercenter')
  }, 500)
}
</script>
<template>
  <transition name="slide-down" mode="out-in">
    <div class="box" v-if="!fade">
      <div class="card">
        <div id="card-box" class="card-box">
          <div
            id="container"
            class="container"
            style="width: 100%; height: 100%; position: relative"
          ></div>
          <div id="menu" class="menu">
            <ul :id="item.id" :class="item.class" v-for="item in menuList" :key="item.uuid">
              <li>
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>
          <div class="footer">
            <img src="../assets/icons/arrow-up.svg" alt="" @click="toUserCenter()" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@import url('../styles/components/knowCard.scss');
</style>
