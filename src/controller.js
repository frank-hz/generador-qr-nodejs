const service = require('./service');
exports.generadorQR = async(req, res) => {
    try {
        const { data } = req.body;
        const qrCodeText = service.formatearData(data);
        const qrCodeBuffer = await service.generadorQR(qrCodeText);
        res.setHeader('Content-Disposition', 'attachment; filename=qrcode.png');
        res.type('image/png').send(qrCodeBuffer);

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).send({error: 'Error de procesamiento'});
    }
}