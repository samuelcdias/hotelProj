const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    data: {
       type: Date,
       required: true
    },
    isAltaTemporada: {
        type: boolean,
        required: true,
        default: false
    }
})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Reserva', esquema, 'reservas')