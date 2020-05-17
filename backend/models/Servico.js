const mongoose = require('mongoose')

const mongooseSeq = require('mongoose-sequence')(mongoose);
esquema.plugin(mongooseSeq, {inc_field: 'num_venda', start_seq: 1});

const esquema = mongoose.Schema({
   numero: {
       type: Number,
       index: { unique: true }
   },
   tipo: {
      type: String,
      required: true
   },
   descricao: {
      type: String,
   },
   preco_custo: {
      type: Number,
      required: true,
      min: 0
   },
   preco_venda: {
      type: Number,
      required: true,
      min: 0
   }
})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Servico', esquema, 'servicos')