import { Component, PropsWithChildren, useState } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

function Index(props) {
  const [boxOneClass, setBoxOneClass] = useState('box-one')
  const [boxTwoClass, setBoxTwoClass] = useState('box-two-hide')
  const [boxTwoTopClass, setBoxTwoTopClass] = useState('')
  const [boxTwoBottomClass, setBoxTwoBottomClass] = useState('')

  let touchYStart = null
  let touchYEnd = null
  let touchXStart = null
  let touchXEnd = null
  let timer = 0
  let interval


  const touchStart = (e) => {
    // console.log('touched')
    // console.log(e)
    interval = setInterval(() => { timer++ }, 100)
    touchYStart = e.changedTouches[0].clientY
    touchXStart = e.changedTouches[0].clientX
  }
  const touchEnd = (e) => {
    // console.log(e)
    // console.log('touchend')
    touchYEnd = e.changedTouches[0].clientY
    touchXEnd = e.changedTouches[0].clientX
    if (touchYStart !== null && touchYEnd !== null && touchXStart !== null && touchXEnd !== null) {
      let calTouchY = touchYEnd - touchYStart
      let calTouchX = touchXEnd - touchXStart
      if (timer < 20) {
        let calAbsY = Math.abs(calTouchY)
        let calAbsX = Math.abs(calTouchX)
        if (calAbsY > calAbsX * 2 && calTouchY < 0) {
          console.log('swipe up')
          setBoxOneClass('box-one-ani')
          setTimeout(()=>{
            setBoxOneClass('box-one-hide')
            setBoxTwoTopClass('box-two-ani-top')
            setBoxTwoBottomClass('box-two-ani-bottom')
            setBoxTwoClass('box-two-ani')
          },1000)
        }
      }
    }
    clearInterval(interval)
    timer = 0
  }
  const touchMove = (e) => {
    // console.log(e)
  }


  return (
    <View className='box-body'>
      <View className={boxOneClass} onTouchStart={e => touchStart(e)} onTouchMove={e => touchMove(e)} onTouchEnd={e => touchEnd(e)} >
        <Text>你好</Text>
      </View>
      <View className={boxTwoClass+' '+boxTwoTopClass} onTouchStart={e => touchStart(e)} onTouchMove={e => touchMove(e)} onTouchEnd={e => touchEnd(e)} >
        <Text>头部</Text>
      </View>
      <View className={boxTwoClass+' '+boxTwoBottomClass} onTouchStart={e => touchStart(e)} onTouchMove={e => touchMove(e)} onTouchEnd={e => touchEnd(e)} >
        <Text>底部</Text>
      </View>
    </View>
  )
}

export default Index