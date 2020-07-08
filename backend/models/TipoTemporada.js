const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    data_inicio: {
       type: Date,
       required: true
    },
    data_fim: {
        type: Date,
        required: true,
     },
    is_alta_temporada: {
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
module.exports = mongoose.model('TipoTemporada', esquema, 'tipos_temporada')