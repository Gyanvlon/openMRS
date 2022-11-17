import React, { memo, useState } from "react";
import { QrReader } from 'react-qr-reader';

function QRCodeScanner(props) {
  const [data, setData] = useState('No result');
  const delay = 500;

  const previewStyle = {
    height: 240,
    width: 320
  };
  const handleScan = (result) => {
    if (result) {
      setData(result);
      
    }
  };

  const handleError = (error) => {
   alert('please scan valid qr');
  };

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            props.generateQRCodeResponse(JSON.parse(result?.text));
          }

          if (!!error) {
            console.info(error);
          }
        }}
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
    </>
  );
}

export default memo(QRCodeScanner);

