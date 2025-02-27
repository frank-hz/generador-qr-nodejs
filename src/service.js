const QRCode = require("qrcode");

exports.formatearData = (data) => {
    return  `${data.content}`;
}

exports.generadorQR = async (qrCodeText) => {
    const options = {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        margin: 1
    };
    const qrBuffer = await QRCode.toBuffer(qrCodeText, options);
    return qrBuffer;
}