'use client';
import { CldUploadWidget, CldImage, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import React, { useState } from 'react'

const UploadComponent = () => {
    const [publicId, setPublicId] = useState('');

  return (
    <>
    {publicId && <CldImage src={publicId} width={270} height={180} alt='image' />}
    <CldUploadWidget onSuccess={({ info }) => {
        const Info = info as CloudinaryUploadWidgetInfo;
        setPublicId(Info.public_id)
    }} uploadPreset='ye8hfsnx'>
        {({ open }) => <button className='btn btn-primary' onClick={() => open()}>Upload</button>}
    </CldUploadWidget>
    </>
  )
}

export default UploadComponent