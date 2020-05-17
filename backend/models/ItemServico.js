const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    dataHora: {
        type: Date,
        required: true,
    },
    quarto: {
        type: mongoose.ObjectId,
        ref: 'Quarto',
        required: true
    },
    servico: {
        type: mongoose.ObjectId,
        ref: 'Quarto',
        required: true
    },

})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('ItemServico', esquema, 'itemsServico')