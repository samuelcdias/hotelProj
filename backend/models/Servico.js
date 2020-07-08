const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   numero: {
       type: Number,
       required: true
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
   },
   funcionario: {
      type: mongoose.ObjectId,
      ref: 'Funcionario'
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