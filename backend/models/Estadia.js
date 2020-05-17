const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    hora_entrada: {
        type: Date,
        required: true
    },
    hora_saida: {
        type: Date
    },
    reserva: {
        type: mongoose.ObjectId,
        ref: 'Reserva', // Nome do model referenciado
        required: true
    },
    quarto: {
        type: mongoose.ObjectId,
        ref: 'Quarto',
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
module.exports = mongoose.model('Estadia', esquema, 'estadias')