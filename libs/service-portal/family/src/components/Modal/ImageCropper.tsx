import React, { FC, useReducer, useRef, useState, useCallback } from 'react'
import {
  Button,
  Box,
  ContentBlock,
  Typography,
  Stack,
  Icon,
  GridContainer,
  GridRow,
  GridColumn,
  InputFileUpload,
  fileToObject,
  UploadFile,
  Inline,
} from '@island.is/island-ui/core'

import Cropper from 'react-easy-crop'
import getCroppedImg from './CropImage'

interface ImageCropProps {
  imageSrc?: string
}

const ImageCropper: FC<ImageCropProps> = ({ imageSrc = null }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const cropperRef = useRef<HTMLImageElement>(null)

  const dogImg =
    'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        dogImg,
        croppedAreaPixels,
        rotation,
      )
      console.log('donee', { croppedImage })
      console.log('tyyyype', typeof croppedImage)
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const handleChange = (event: React.ChangeEvent<any>) => {
    console.log(typeof event)
    setZoom(event.target.value)
  }

  console.log('myndin', imageSrc)

  if (imageSrc) {
    return (
      <Box display={'flex'} flexDirection="column">
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: '400px',
            height: '400px',
          }}
        >
          <Cropper
            // image="https://upload.wikimedia.org/wikipedia/commons/f/fe/Michelle_Borromeo_Actor_Headshots_30.jpg"
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape={'round'}
            // cropSize={{ height: 200, width: 200 }}
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            disableAutomaticStylesInjection={false}
            onZoomChange={setZoom}
          />
        </Box>
        <Box display={'inlineFlex'} width={'full'}>
          <input
            id="zoomInput"
            type="range"
            min="1"
            max="3"
            value={zoom}
            onChange={handleChange}
            step="0.1"
          />
          <Button
            onClick={() => {
              setRotation(rotation - 90)
            }}
          />
          <Button
            onClick={() => {
              setRotation(rotation + 90)
            }}
          />
          <Button
            onClick={() => {
              console.log('crop')
            }}
          />
        </Box>
      </Box>
    )
  }
  return null
}

export default ImageCropper
