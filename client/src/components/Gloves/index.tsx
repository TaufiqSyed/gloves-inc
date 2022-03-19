import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../../lib/model'
import { BodyModel, Container, Footer, Header } from './styles'
import { Box, Spinner } from '@chakra-ui/react'

const Gloves: React.FC<{ hexCode: number }> = ({ hexCode }) => {
  const refBody = useRef<HTMLDivElement>(null)
  // const [hexCode, setHexCode] = useState(initialHexCode)
  const [, updateState] = useState()
  const [loading, setLoading] = useState<boolean>(true)
  const [renderer, setRenderer] = useState<any>()
  const [_camera, setCamera] = useState<any>()
  const [target] = useState(new THREE.Vector3(-0.5, 1.2, 0))
  const [initialCameraPosition] = useState(new THREE.Vector3(20, 10, -1000))
  const [scene] = useState(new THREE.Scene())
  const [_controls, setControls] = useState<any>()

  const handleWindowResize = useCallback(() => {
    const { current: container } = refBody
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
  }, [renderer])

  const easeOutCirc = (x: number) => {
    return Math.sqrt(1 - Math.pow(x - 1, 4))
  }

  useEffect(() => {
    const { current: container } = refBody
    if (container && !renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)
      setRenderer(renderer)

      const scale = scH * 0.08 + 4
      const camera = new THREE.OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale / 2,
        0.01,
        50000
      )
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)
      setCamera(camera)

      // const ambientLight = new THREE.AmbientLight(0xcccccc, 1)
      const ambientLight = new THREE.AmbientLight(hexCode, 1)
      ambientLight.name = 'Light'
      scene.add(ambientLight)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target
      setControls(controls)

      loadGLTFModel(scene, '/gloves/scene.gltf', {
        receiveShadow: false,
        castShadow: false,
      }).then(() => {
        animate()
        setLoading(false)
      })

      let req: any = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

          camera.position.y = 10
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }

        renderer.render(scene, camera)
      }

      return () => {
        console.log('unmount')
        scene.remove(scene.getObjectByName('Gloves'))
        cancelAnimationFrame(req)
        renderer.dispose()
      }
    }
  }, [])

  // useEffect(() => {
  //   console.log(scene.children)
  //   scene.remove(scene.getObjectByName('Light'))
  //   const ambientLight = new THREE.AmbientLight(hexCode, 1)
  //   ambientLight.name = 'Light'
  //   scene.add(ambientLight)
  // }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [renderer, handleWindowResize])

  return (
    <Box
      width='900px'
      height='100vh'
      color='#fff'
      textAlign='center'
      backgroundPosition='center'
    >
      <Box
        position='relative'
        inset='0'
        h='100%'
        w='100%'
        top='100px'
        cursor='pointer'
        background-color='transparent'
        ref={refBody}
      >
        {loading && <Spinner />}
      </Box>
    </Box>
  )
}

export default Gloves
