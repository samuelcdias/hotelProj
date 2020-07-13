const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    dt_entrada_reserva: {
        type: Date,
        required: true
    },
    dt_saida_reserva: {
        type: Date,
        required: true
    },
    hora_entrada: {
        type: Date
    },
    hora_saida: {
        type: Date
    },
    is_reserva: {
        type: Boolean,
        default: true
    },
    obs: {
        type: String
    },
    tipo_temporada: {
        type: mongoose.ObjectId,
        ref: 'TipoTemporada',
        required: true
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