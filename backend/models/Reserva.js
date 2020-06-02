const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    dt_entrada_Reserva: {
        type: Date,
        required: true
    },
    dt_saida_Reserva: {
        type: Date,
        required: true
    },
    hora_entrada: {
        type: Date,
        required: true
    },
    hora_saida: {
        type: Date
    },
    isReserva: {
        type: Boolean,
        default: true
    },
    obs: {
        type: String
    },
    tipoTemporada: {
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