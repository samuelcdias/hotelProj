const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    reserva: {
        type: mongoose.ObjectId,
        ref: 'Reserva', // Nome do model referenciado
        required: true
    },
    cliente: {
        type: mongoose.ObjectId,
        ref: 'Cliente', // Nome do model referenciado
        required: true
    },
    quarto: {
        type: mongoose.ObjectId,
        ref: 'Quarto',
        required: true
    },
    is_responsavel: {
        type: Boolean,
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
module.exports = mongoose.model('Hospede', esquema, 'hospedes')