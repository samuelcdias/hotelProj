const mongoose = require('mongoose')

const mongooseSeq = require('mongoose-sequence')(mongoose);

const esquema = mongoose.Schema({
    numero:{
        type: Number,
        index: { unique: true }
    },
    data_hora: {
        type: Date,
        required: true,
        default: Date.now()
    },
    servico: {
        type: mongoose.ObjectId,
        ref: 'Servico',
        required: true
    },
    quantidade: {
        type: Number,
        required: true,
        validate: {
            validator: function(val) {
                return val > 0
            },
            message: 'A quantidade deve ser maior do que zero'
        }
    },
    reserva: {
        type: mongoose.ObjectId,
        ref: 'Reserva',
        required: true
    }
})


esquema.plugin(mongooseSeq, {inc_field: 'numero', start_seq: 1});
/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('ItemServico', esquema, 'items_servico')